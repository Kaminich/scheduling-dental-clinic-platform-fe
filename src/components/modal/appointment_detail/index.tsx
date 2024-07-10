import { Button, FormControl, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Loading from "../../loading";
import useAppointmentDetail from "../../../hooks/useAppoinmentDetail";
import AppointmentViewDetailsResponse, { initialAppointmentViewDetailsResponse } from "../../../types/AppointmentViewDetailsResponse";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const AppointmentDetailModal = ({ isOpen, onClose, id }: Props) => {
    const { data: appointmentData, isLoading } = useAppointmentDetail({ appointmentId: id });
    const [appointment, setAppointment] = useState<AppointmentViewDetailsResponse>(initialAppointmentViewDetailsResponse);

    useEffect(() => {
        if (appointmentData) {
            setAppointment(appointmentData);
        }
    }, [appointmentData])

    console.log(appointmentData);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'5xl'}>
            <ModalOverlay />
            {!isLoading ? (
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Appointment Detail</ModalHeader>
                    <ModalCloseButton borderRadius={'full'} />
                    <ModalBody maxH={'xl'} overflowY={'auto'} mx={5}>
                        <Stack gap={4}>
                            <HStack gap={10} align={'flex-start'}>
                                <Stack flex={1} gap={2}>
                                    <Heading fontSize={24} mb={3}>Personal Information</Heading>
                                    <HStack>
                                        <FormControl id="fullname" flex={2}>
                                            <FormLabel ml={1}>Full Name</FormLabel>
                                            <Input value={appointment.customerName} readOnly />
                                        </FormControl>
                                        <FormControl id="gender" flex={1}>
                                            <FormLabel ml={1}>Gender</FormLabel>
                                            <Input value={appointment.customerName} readOnly />
                                        </FormControl>
                                    </HStack>
                                    <HStack>
                                        <FormControl id="dob" flex={1}>
                                            <FormLabel ml={1}>Date of Birth</FormLabel>
                                            <Input
                                                value={appointment.customerAge}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormControl id="phone" flex={1.2}>
                                            <FormLabel ml={1} pl={1}>Phone number</FormLabel>
                                            <Input
                                                value={appointment.customerPhone}
                                                readOnly
                                            />
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="email" flex={2}>
                                        <FormLabel ml={1}>Email</FormLabel>
                                        <Input
                                            value={appointment.customerEmail}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl id="address" flex={2}>
                                        <FormLabel ml={1}>Address</FormLabel>
                                        <Input
                                            value={appointment.customerAddress}
                                            readOnly
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack flex={1} gap={2}>
                                    <Heading fontSize={24} mb={3}>Appointment Detail</Heading>
                                    <HStack>
                                        <FormControl id="dental" flex={1.5}>
                                            <FormLabel ml={1}>Dental</FormLabel>
                                            <Input
                                                type="text"
                                                value={appointment.clinicBranch.clinicName}
                                                readOnly
                                            />
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="branch" flex={2}>
                                        <FormLabel ml={1}>Branch</FormLabel>
                                        <Input
                                            value={`${appointment.clinicBranch.branchName} (${appointment.clinicBranch.city})`}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl id="service" flex={1}>
                                        <FormLabel ml={1}>Service</FormLabel>
                                        <Input
                                            value={appointment.service.serviceName}
                                            readOnly
                                        />
                                    </FormControl>
                                    <HStack>
                                        <FormControl id="date" flex={1}>
                                            <FormLabel ml={1}>Date</FormLabel>
                                            <Input value={appointment.appointmentDate} readOnly />
                                        </FormControl>
                                        <FormControl id="slot" flex={1}>
                                            <FormLabel ml={1}>Slot</FormLabel>
                                            <Input
                                                value={`${appointment.slot.startTime} - ${appointment.slot.endTime}`}
                                                readOnly
                                            />
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="dentist" flex={1.5}>
                                        <FormLabel ml={1}>Dentist</FormLabel>
                                        <Input value={appointment.dentist.dentistName} readOnly />
                                    </FormControl>
                                </Stack>
                            </HStack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            ) : (
                <ModalContent>
                    <ModalBody p={6}>
                        <Stack h={170}>
                            <Loading />
                        </Stack>
                    </ModalBody>
                </ModalContent>
            )}
        </Modal >
    )
}

export default AppointmentDetailModal