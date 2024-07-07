import { Modal, ModalBody, ModalContent, ModalOverlay, Stack, } from "@chakra-ui/react";
import Loading from "../../loading";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const LoadingModal = ({ isOpen, onClose }: Props) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            isCentered
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                <ModalBody p={6}>
                    <Stack h={170}>
                        <Loading />
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal >
    )
}

export default LoadingModal;