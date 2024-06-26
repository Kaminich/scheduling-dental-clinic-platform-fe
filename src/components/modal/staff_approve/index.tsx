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

const StaffApproveModal = ({ isOpen, onClose, id, type }: Props) => {
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (type === 'approve') {
            const api = new ApiClient<any>(`/staff/approval`);
            const data = {
                id,
                isApproved: true,
            }
            try {
                const response = await api.createWithIdAndData(id, data);
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

        } else {
            const api = new ApiClient<any>(`/clinics/approval`);
            const data = {
                id,
                isApproved: false,
            }
            try {
                const response = await api.createWithIdAndData(id, data);
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

    if (type === 'approve') {
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay backdropFilter={'blur(5px)'} />
                <ModalContent>
                    <ModalHeader fontSize='xl'>Approve Staff Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                        <Text fontSize='lg'>Are you sure you want to approve this account</Text>
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
    } else {
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay backdropFilter={'blur(5px)'} />
                <ModalContent>
                    <ModalHeader fontSize='xl'>Denied Staff Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                        <Text fontSize='lg'>Are you sure you want to denied this account</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleClick}>
                            Denied
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        )
    }
}

export default StaffApproveModal;