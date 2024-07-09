import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Border } from "../../../styles/styles";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    approve: boolean;
    handleApprove: () => void;
}

const ApproveModal = ({ isOpen, onClose, type, approve, handleApprove }: Props) => {

    if (approve) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay backdropFilter={'blur(5px)'} />
                <ModalContent>
                    {type === 'dentist' && (
                        <ModalHeader fontSize='xl'>Approve Dentist Account</ModalHeader>
                    )}
                    {type === 'staff' && (
                        <ModalHeader fontSize='xl'>Approve Staff Account</ModalHeader>
                    )}
                    {type === 'clinic' && (
                        <ModalHeader fontSize='xl'>Approve Clinic Partner Registration</ModalHeader>
                    )}
                    {type === 'blog' && (
                        <ModalHeader fontSize='xl'>Approve Blog</ModalHeader>
                    )}
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                        {(type === 'dentist' || type === 'staff') && (
                            <Text fontSize='lg'>Are you sure you want to approve this account?</Text>
                        )}
                        {type === 'clinic' && (
                            <Text fontSize='lg'>Are you sure you want to approve this registration?</Text>
                        )}
                        {type === 'blog' && (
                            <Text fontSize='lg'>Are you sure you want to approve this blog?</Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={handleApprove}>
                            Approve
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
                    {type === 'dentist' && (
                        <ModalHeader fontSize='xl'>Denied Dentist Account</ModalHeader>
                    )}
                    {type === 'staff' && (
                        <ModalHeader fontSize='xl'>Denied Staff Account</ModalHeader>
                    )}
                    {type === 'clinic' && (
                        <ModalHeader fontSize='xl'>Denied Clinic Partner Registration</ModalHeader>
                    )}
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                        {(type === 'dentist' || type === 'staff') && (
                            <Text fontSize='lg'>Are you sure you want to denied this account?</Text>
                        )}
                        {type === 'clinic' && (
                            <Text fontSize='lg'>Are you sure you want to denied this registration?</Text>
                        )}
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

export default ApproveModal;