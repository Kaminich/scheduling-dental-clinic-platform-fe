import { Button, HStack, Heading, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { Border } from "../../../styles/styles";
import ClinicRegisterResponse, { initialClinicRegisterResponse } from "../../../types/ClinicRegisterResponse";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const DentalDetailModal = ({ isOpen, onClose, id }: Props) => {
    const [dentalDetail, setDentalDetail] = useState<ClinicRegisterResponse>(initialClinicRegisterResponse)

    const handleShowInfo = async (id: number) => {
        try {
            const api = new ApiClient<any>('/clinics/pending');
            const response = await api.getDetail(id);
            console.log(response);
            if (response.success) {
                setDentalDetail(response.data);
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
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
            <ModalContent>
                <ModalHeader fontSize='xl'>Dental Clinic Detail</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={6} borderY={Border.tableBorder}>
                    <Stack gap={4}>
                        <Heading fontSize='xl'>Clinic Information</Heading>
                        <Stack>
                            <HStack>
                                <Text>Dental Clinic ID:</Text>
                                <Text>{dentalDetail.clinicId}</Text>
                            </HStack>
                            <HStack>
                                <Text>Dental Clinic Name:</Text>
                                <Text>{dentalDetail.clinicName}</Text>
                            </HStack>
                            <HStack>
                                <Text>Address:</Text>
                                <Text>{dentalDetail.address}</Text>
                            </HStack>
                            <HStack>
                                <Text>City:</Text>
                                <Text>{dentalDetail.city}</Text>
                            </HStack>
                            <HStack>
                                <Text>Phone:</Text>
                                <Text>{dentalDetail.phone}</Text>
                            </HStack>
                            <HStack>
                                <Text>Website Url:</Text>
                                <Text>{dentalDetail.websiteUrl || '-'}</Text>
                            </HStack>
                            <Stack>
                                <Text>Dental Clinic Image:</Text>
                                <Image
                                    border='1px solid gainsboro'
                                    borderRadius={5}
                                    h={32}
                                    w={72}
                                    m={'auto'}
                                    src={
                                        dentalDetail.clinicImage || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                    }
                                    alt='logo'
                                    bgColor='white'
                                />
                            </Stack>
                            <HStack>
                                <Text>Dental Clinic Registration:</Text>
                                <Link href={dentalDetail.clinicRegistration} color={'blue'} isExternal>Click here to view</Link>
                            </HStack>
                        </Stack>
                        <Heading fontSize='xl'>Owner Information</Heading>
                        <Stack>
                            <HStack>
                                <Text>Full Name:</Text>
                                <Text>{dentalDetail.ownerDetail.fullName}</Text>
                            </HStack>
                            <HStack>
                                <Text>Email:</Text>
                                <Text>{dentalDetail.ownerDetail.email}</Text>
                            </HStack>
                            <HStack>
                                <Text>Phone:</Text>
                                <Text>{dentalDetail.ownerDetail.phone}</Text>
                            </HStack>
                        </Stack>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default DentalDetailModal;