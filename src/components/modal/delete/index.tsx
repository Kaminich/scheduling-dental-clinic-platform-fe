import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
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
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
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
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                onClose();
            }
        } else if (type === 'category') {
            const api = new ApiClient<any>(`/category`);
            try {
                const response = await api.delete(id);
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
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                onClose();
            }
        } else if (type === 'service') {
            const api = new ApiClient<any>(`/service`);
            try {
                const response = await api.delete(id);
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
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                onClose();
            }
        } else if (type === 'branch') {
            const api = new ApiClient<any>(`/branch`);
            try {
                const response = await api.delete(id);
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
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
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
                {type === 'category' && (
                    <ModalHeader fontSize='xl'>Remove Category</ModalHeader>
                )}
                {type === 'service' && (
                    <ModalHeader fontSize='xl'>Remove Service</ModalHeader>
                )}
                {type === 'branch' && (
                    <ModalHeader fontSize='xl'>Remove Clinic Branch</ModalHeader>
                )}
                <ModalCloseButton />
                <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                    {(type === 'dentist' || type === 'staff') && (
                        <Text fontSize='lg'>Are you sure you want to remove this account?</Text>
                    )}
                    {type === 'category' && (
                        <Text fontSize='lg'>Are you sure you want to remove this category?</Text>
                    )}
                    {type === 'service' && (
                        <Text fontSize='lg'>Are you sure you want to remove this service?</Text>
                    )}
                    {type === 'branch' && (
                        <Text fontSize='lg'>Are you sure you want to remove this branch?</Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={handleClick}>
                        Remove
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default DeleteModal;