import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Border } from "../../../styles/styles";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    handleActivate: () => void;
}

const ActivateModal = ({ isOpen, onClose, type, handleActivate }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                {type === 'dentist' && (
                    <ModalHeader fontSize='xl'>Activate Dentist Account</ModalHeader>
                )}
                {type === 'staff' && (
                    <ModalHeader fontSize='xl'>Activate Staff Account</ModalHeader>
                )}
                <ModalCloseButton />
                <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                    {(type === 'dentist' || type === 'staff') && (
                        <Text fontSize='lg'>Are you sure you want to activate this account?</Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={handleActivate}>
                        Activate
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default ActivateModal;