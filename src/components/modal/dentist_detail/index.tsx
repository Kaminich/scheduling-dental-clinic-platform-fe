import { Button, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { Border } from "../../../styles/styles";
import DentistDetailResponse, { initialDentistDetailResponse } from "../../../types/DentistDetailResponse";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const DentistDetailModal = ({ isOpen, onClose, id }: Props) => {
    const [dentist, setDentist] = useState<DentistDetailResponse>(initialDentistDetailResponse);

    const handleShowInfo = async (id: number) => {
        try {
            const api = new ApiClient<any>('/dentists');
            const response = await api.getDetail(id);
            if (response.success) {
                setDentist(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id !== 0) {
            handleShowInfo(id);
        }
    }, [id]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                <ModalHeader fontSize='xl'>Dentist Detail</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={6} borderY={Border.tableBorder}>
                    <HStack align={'flex-start'}>
                        <Stack flex={1}>
                            <Heading fontSize='xl'>Dentist Information</Heading>
                            <Stack>
                                <HStack>
                                    <Text>Full Name:</Text>
                                    <Text>{dentist.fullName}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Gender:</Text>
                                    <Text>{dentist.gender}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Date of Birth:</Text>
                                    <Text>{dentist.dob}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Phone Number:</Text>
                                    <Text>{dentist.phone}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Email:</Text>
                                    <Text>{dentist.email}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Address:</Text>
                                    <Text>{dentist.address}</Text>
                                </HStack>
                            </Stack>
                        </Stack>
                        <Stack flex={1}>
                            <Heading fontSize={'xl'}>Medical Information</Heading>
                            <Stack>
                                <HStack>
                                    <Text>Description:</Text>
                                    <Text>{dentist.description}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Branch:</Text>
                                    <Text>{dentist.branchName}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Specialty:</Text>
                                    <Text>{dentist.specialty}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Experience:</Text>
                                    <Text>{dentist.experience}</Text>
                                </HStack>
                            </Stack>
                        </Stack>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default DentistDetailModal;