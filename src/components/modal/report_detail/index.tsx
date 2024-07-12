import { Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, } from "@chakra-ui/react";
import { Border } from "../../../styles/styles";
import ReportResponse from "../../../types/ReportResponse";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    report: ReportResponse;
}

const ReportDetailModal = ({ isOpen, onClose, report }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                <ModalHeader fontSize='xl'>Report Detail</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={6} borderY={Border.tableBorder}>
                    <Stack>
                        <HStack>
                            <Text>Reported Customer:</Text>
                            <Text>{report.reportedCustomer}</Text>
                        </HStack>
                        <HStack>
                            <Text>Reporter:</Text>
                            <Text>{report.reporter}</Text>
                        </HStack>
                        <HStack>
                            <Text>Reason(s):</Text>
                            {report.reportReason.map((reason) => (
                                <Text>{reason}</Text>
                            ))}
                        </HStack>
                        <HStack>
                            <Text>Comment:</Text>
                            <Text>{report.comment}</Text>
                        </HStack>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default ReportDetailModal;