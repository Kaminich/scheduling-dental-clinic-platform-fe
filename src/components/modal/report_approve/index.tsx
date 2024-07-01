import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import ApiClient from "../../../services/apiClient";
import { Border } from "../../../styles/styles";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    type: string;
}

const ReportApproveModal = ({ isOpen, onClose, id, type }: Props) => {
    const toast = useToast();

    const handleClick = async () => {
        if (type === 'approve') {
            const api = new ApiClient<any>(`/report/approve`);
            try {
                const response = await api.createWithId(id);
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

        } else {
            const api = new ApiClient<any>(`/report/decline`);

            try {
                const response = await api.createWithId(id);
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

    if (type === 'approve') {
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay backdropFilter={'blur(5px)'} />
                <ModalContent>
                    <ModalHeader fontSize='xl'>Approve Report</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                        <Text fontSize='lg'>Are you sure you want to approve this report?</Text>
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
                    <ModalHeader fontSize='xl'>Denied Report</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                        <Text fontSize='lg'>Are you sure you want to denied this report?</Text>
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

export default ReportApproveModal;