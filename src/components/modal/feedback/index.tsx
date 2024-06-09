import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"
import RatingAndFeedback from "../../rating_feedback";
import FeedbackForm from "../../rating_feedback/components/feedback_form";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: string;
}

const FeedbackModal = ({ isOpen, onClose, type }: Props) => {
    const [modalType, setModalType] = useState<string>(type);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Rating and Feedback</ModalHeader>
                <ModalCloseButton borderRadius={'full'} />
                <ModalBody maxH={'lg'} overflowY={'auto'}>
                    {modalType === 'review' ? (
                        <>
                            <FeedbackForm type="review" />
                        </>
                    ) : (
                        <>
                            <RatingAndFeedback isModal={true} />
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' variant='outline' mr={3} onClick={() => {
                        onClose();
                        setModalType(type);
                    }}>
                        Close
                    </Button>
                    {modalType === 'review' ? (
                        <>
                            <Button colorScheme="blue" display={isAuthenticated ? 'block' : 'none'}>Post</Button>
                        </>
                    ) : (
                        <>
                            <Button colorScheme="blue" onClick={() => setModalType('review')}>Review dental</Button>
                        </>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default FeedbackModal