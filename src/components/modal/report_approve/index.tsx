import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Border } from "../../../styles/styles";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    approve: boolean;
    handleApprove: () => void;
}

const ReportApproveModal = ({ isOpen, onClose, approve, handleApprove }: Props) => {

    if (approve) {
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
                        <Button colorScheme='blue' mr={3} onClick={handleApprove}>
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
                        <Button colorScheme='red' mr={3} onClick={handleApprove}>
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