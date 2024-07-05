import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Border } from "../../../styles/styles";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    handleDeactivate: () => void;
}

const DeleteModal = ({ isOpen, onClose, type, handleDeactivate }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                {type === 'dentist' && (
                    <ModalHeader fontSize='xl'>Deactivate Dentist Account</ModalHeader>
                )}
                {type === 'staff' && (
                    <ModalHeader fontSize='xl'>Deactivate Staff Account</ModalHeader>
                )}
                {type === 'branch' && (
                    <ModalHeader fontSize='xl'>Deactivate Clinic Branch</ModalHeader>
                )}
                <ModalCloseButton />
                <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                    {(type === 'dentist' || type === 'staff') && (
                        <Text fontSize='lg'>Are you sure you want to deactivate this account?</Text>
                    )}
                    {type === 'branch' && (
                        <Text fontSize='lg'>Are you sure you want to deactivate this branch?</Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={handleDeactivate}>
                        Deactivate
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default DeleteModal;