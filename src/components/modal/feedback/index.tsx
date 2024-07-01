import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import RatingAndFeedback from "../../rating_feedback";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const FeedbackModal = ({ isOpen, onClose }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Rating and Feedback</ModalHeader>
                <ModalCloseButton borderRadius={'full'} />
                <ModalBody maxH={'lg'} overflowY={'auto'}>
                    <RatingAndFeedback isModal={true} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' variant='outline' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default FeedbackModal