import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { Border } from "../../../styles/styles";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    handleChangeStatus: () => void;
}

const ChangeStatusModal = ({ isOpen, onClose, type, handleChangeStatus }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                {type === 'category' && (
                    <ModalHeader fontSize='xl'>Change Category Status</ModalHeader>
                )}
                {type === 'service' && (
                    <ModalHeader fontSize='xl'>Change Service Status</ModalHeader>
                )}
                {type === 'branch' && (
                    <ModalHeader fontSize='xl'>Change Clinic Branch Status</ModalHeader>
                )}
                <ModalCloseButton />
                <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                    {type === 'category' && (
                        <Text fontSize='lg'>Are you sure you want to change this category status?</Text>
                    )}
                    {type === 'service' && (
                        <Text fontSize='lg'>Are you sure you want to change this service status?</Text>
                    )}
                    {type === 'branch' && (
                        <Text fontSize='lg'>Are you sure you want to change this clinic branch status?</Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleChangeStatus}>
                        Confirm
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default ChangeStatusModal;