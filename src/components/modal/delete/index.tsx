import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../services/apiClient";
import { Border } from "../../../styles/styles";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    type: string;
}

const DeleteModal = ({ isOpen, onClose, id, type }: Props) => {
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (type === 'dentist') {
            try {
                const api = new ApiClient<any>(`/dentist`);
                const response = await api.delete(id);
                console.log(response);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        isClosable: true,
                    });
                    onClose();
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        isClosable: true,
                    });
                    onClose();
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error,
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
                onClose();
            }
        } else if (type === 'staff') {
            const api = new ApiClient<any>(`/staff`);
            try {
                const response = await api.delete(id);
                console.log(response);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        isClosable: true,
                    });
                    onClose();
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        isClosable: true,
                    });
                    onClose();
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error,
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
                onClose();
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                {type === 'dentist' && (
                    <ModalHeader fontSize='xl'>Remove Dentist Account</ModalHeader>
                )}
                {type === 'staff' && (
                    <ModalHeader fontSize='xl'>Remove Staff Account</ModalHeader>
                )}
                <ModalCloseButton />
                <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                    {(type === 'dentist' || type === 'staff') && (
                        <Text fontSize='lg'>Are you sure you want to remove this account</Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleClick}>
                        Confirm
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default DeleteModal;