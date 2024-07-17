import { Button, FormControl, FormLabel, HStack, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Stack, useToast } from "@chakra-ui/react";
import { Border } from "../../../styles/styles";
import { FormEvent, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

const RecoverModal = ({ isOpen, onClose, email }: Props) => {
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [showPass, setShowPass] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleRecover = async (e: FormEvent) => {
        e.preventDefault();
        const api = new ApiClient<any>('/auth/verify-reset-password');
        const data = {
            email,
            verificationCode,
            newPassword
        };

        try {
            const response = await api.postUnauthen(data);
            console.log(response);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                onClose();
                navigate('/login');
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        }
    };

    console.log(verificationCode);


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                <ModalHeader fontSize='xl'>Recover Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                    <Stack gap={6}>
                        <FormControl id="verificationCode">
                            <FormLabel pl={1}>Verification Code</FormLabel>
                            <HStack w={'full'} justify={'space-evenly'}>
                                <PinInput size={'lg'} value={verificationCode} onChange={setVerificationCode}>
                                    <PinInputField borderColor={'black'} _hover={{ borderColor: 'gray' }} />
                                    <PinInputField borderColor={'black'} _hover={{ borderColor: 'gray' }} />
                                    <PinInputField borderColor={'black'} _hover={{ borderColor: 'gray' }} />
                                    <PinInputField borderColor={'black'} _hover={{ borderColor: 'gray' }} />
                                    <PinInputField borderColor={'black'} _hover={{ borderColor: 'gray' }} />
                                    <PinInputField borderColor={'black'} _hover={{ borderColor: 'gray' }} />
                                </PinInput>
                            </HStack>
                        </FormControl>
                        <FormControl id="newPassword">
                            <FormLabel pl={1}>New Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPass ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    borderColor={'gainsboro'}
                                />
                                <InputRightElement width='3.5rem' cursor='pointer' onClick={() => setShowPass(!showPass)}>
                                    {!showPass ? <FaEye /> : <FaEyeSlash />}
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={handleRecover}>
                        Confirm
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default RecoverModal;