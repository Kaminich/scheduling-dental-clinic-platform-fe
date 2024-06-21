import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../services/apiClient";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    type: string;
}

const DentalModal = ({ isOpen, onClose, id, type }: Props) => {
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (type === 'approve') {
            const api = new ApiClient<any>(`/clinics/approval`);
            const data = {
                id,
                isApproved: true,
            }
            const response = await api.create(data);
            console.log(response);

            toast({
                title: "Success",
                description: "You have approved this clinic registration successfully",
                status: "success",
                duration: 2500,
                isClosable: true,
            });
            onClose();
        } else {
            const api = new ApiClient<any>(`/clinics/approval`);
            const data = {
                id,
                isApproved: false,
            }
            const response = await api.create(data);
            console.log(response);
            toast({
                title: "Success",
                description: "You have decline this clinic registration successfully",
                status: "success",
                duration: 2500,
                isClosable: true,
            });
            onClose();
        }
    }

    if (type === 'approve') {
        return (
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay backdropFilter={'blur(5px)'} />
                < ModalContent >
                    <ModalHeader fontSize='xl'>Approve Clinic Partner Registration</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY='1px solid gainsboro'>
                        <Text fontSize='lg'>Are you sure you want to approve this clinic</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClick}>
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
                < ModalContent >
                    <ModalHeader fontSize='xl'>Decline Clinic Partner Registration</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY='1px solid gainsboro'>
                        <Text fontSize='lg'>Are you sure you want to decline this clinic</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleClick}>
                            Decline
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        )
    }
}

export default DentalModal;