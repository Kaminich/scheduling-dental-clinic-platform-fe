import { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, useToast } from '@chakra-ui/react';
import { ReportReason } from '../../../types/type.enum';
import ApiClient from '../../../services/apiClient';
import { ApiResponse } from '../../../types/ApiResponse';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    feedbackId: number;
    reportedCustomer: string;
}

const ReportFeedbackModal = ({ isOpen, onClose, feedbackId, reportedCustomer }: Props) => {
    const [selectedReasons, setSelectedReasons] = useState<Set<ReportReason>>(new Set());
    const toast = useToast();

    const toggleReason = (reason: ReportReason) => {
        setSelectedReasons(prev => {
            const newSet = new Set(prev);
            if (newSet.has(reason)) {
                newSet.delete(reason);
            } else {
                newSet.add(reason);
            }
            return newSet;
        });
    };

    const handleReport = async () => {
        const data = {
            feedbackId: feedbackId,
            reportReason: Array.from(selectedReasons),
            reportedCustomer
        }

        const api = new ApiClient<any>('/report')

        try {
            const response: ApiResponse<{}> = await api.create(data);
            if (response.success) {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
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
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Report Feedback</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        {Object.values(ReportReason).map(reason => (
                            <Button
                                key={reason}
                                onClick={() => toggleReason(reason)}
                                bg={selectedReasons.has(reason) ? 'blue.500' : 'gray.200'}
                                color={selectedReasons.has(reason) ? 'white' : 'black'}
                                _hover={{
                                    bg: selectedReasons.has(reason) ? 'blue.600' : 'gray.300'
                                }}
                            >
                                {reason}
                            </Button>
                        ))}
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="red"
                        mr={3}
                        isDisabled={selectedReasons.size === 0}
                        onClick={handleReport}>
                        Report
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReportFeedbackModal;
