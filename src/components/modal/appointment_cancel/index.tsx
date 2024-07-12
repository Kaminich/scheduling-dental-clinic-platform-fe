import { Button, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useToast } from "@chakra-ui/react";
import { Border } from "../../../styles/styles";
import { useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import ApiClient from "../../../services/apiClient";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type?: string;
    id: number;
    refetch: () => Promise<QueryObserverResult<any, Error>>;
}

const AppointmentCancelModal = ({ isOpen, onClose, type, id, refetch }: Props) => {
    const [reason, setReason] = useState<string>('');
    const api = new ApiClient<any>('appointment');
    const toast = useToast();

    const handleCancel = async () => {
        if (type === 'staff') {
            const data = {
                appointmentId: id,
                cancelReason: reason
            }
            try {
                const response = await api.create(data);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    refetch && refetch();
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
            } catch (error: any) {
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
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                <ModalHeader fontSize='xl'>Cancel Appointment</ModalHeader>
                <ModalCloseButton />
                <ModalBody py={6} borderY={Border.tableBorder}>
                    <Text fontSize='lg' mb={5}>Why you want to cancel appointment?</Text>
                    <FormControl id="cancelReason" flex={2} isRequired>
                        <Textarea
                            value={reason}
                            placeholder="Enter reason"
                            focusBorderColor='#E2E8F0'
                            borderColor={'gray.400'}
                            resize={'none'}
                            maxH={32}
                            minH={32}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={handleCancel}>
                        Confirm
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default AppointmentCancelModal;