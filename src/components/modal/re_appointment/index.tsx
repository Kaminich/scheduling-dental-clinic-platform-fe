import { Button, FormControl, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Tooltip, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Loading from "../../loading";
import useAppointmentDetail from "../../../hooks/useAppoinmentDetail";
import AppointmentViewDetailsResponse, { initialAppointmentViewDetailsResponse } from "../../../types/AppointmentViewDetailsResponse";
import ApiClient from "../../../services/apiClient";
import WorkingHoursDetailsResponse, { initialWorkingHoursDetailsResponse } from "../../../types/WorkingHoursDetailsResponse";
import { today } from "../appointment";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    followUpDate: string
}

const ReAppointmentModal = ({ isOpen, onClose, id, followUpDate }: Props) => {
    const [date, setDate] = useState<string>('');
    const [slotId, setSlotId] = useState<number>(0);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [slot, setSlot] = useState<WorkingHoursDetailsResponse>(initialWorkingHoursDetailsResponse);
    const { data: appointmentData, refetch } = useAppointmentDetail({ appointmentId: id });
    const [appointment, setAppointment] = useState<AppointmentViewDetailsResponse>(initialAppointmentViewDetailsResponse);

    const getAvailableSlot = async () => {
        const api = new ApiClient<any>('/slot/available-by-date-updating');
        try {
            const response = await api.getAuthen({
                params: {
                    appointmentId: id,
                    clinicBranchId: appointment.clinicBranch.branchId,
                    date
                }
            });
            if (response.success) {
                setSlot(response.data);
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateAppointment = async () => {
        setIsLoading(true);
        const api = new ApiClient<any>('/appointment');
        const data = {
            customerName: appointment.customerName,
            customerAddress: appointment.customerAddress,
            customerPhone: appointment.customerPhone,
            customerGender: appointment.customerGender,
            customerDob: appointment.dob,
            customerEmail: appointment.customerEmail,
            appointmentDate: date,
            slotId,
            dentistId: appointment.dentist.dentistId,
            serviceId: appointment.service.id,
        }

        try {
            const response = await api.create(data);
            console.log(response);
            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                })
                refetch && refetch();
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
            onClose();
        }
    }

    useEffect(() => {
        if (appointmentData) {
            setAppointment(appointmentData);
        }
    }, [appointmentData])

    useEffect(() => {
        if (id && date) {
            getAvailableSlot();
        }
    }, [id, date])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size={'5xl'}
            closeOnEsc={isLoading ? false : true}
            closeOnOverlayClick={isLoading ? false : true}
        >
            <ModalOverlay />
            {!isLoading ? (
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Re-Appointment</ModalHeader>
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
                                            <Input value={appointment.customerGender} readOnly />
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
                                            <Input
                                                type="date"
                                                min={followUpDate > today ? followUpDate : today}
                                                value={date}
                                                onChange={(e) => {
                                                    setDate(e.target.value)
                                                    setSlotId(0);
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl id="slot" flex={1}>
                                            <FormLabel ml={1}>Slot</FormLabel>
                                            {date === '' ? (
                                                <Tooltip label={'Select date to choose'}>
                                                    <Select
                                                        placeholder={'Select slot'}
                                                        borderColor={'gray.400'}
                                                        disabled
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Select
                                                    name="slot"
                                                    value={slotId}
                                                    onChange={(e) => setSlotId(parseInt(e.target.value))}
                                                    placeholder={'Select slot'}
                                                >
                                                    {slot.slots.map((slot) => (
                                                        <option key={slot.slotId} value={slot.slotId}>
                                                            {slot.startTime} - {slot.endTime}
                                                        </option>
                                                    ))}
                                                </Select>
                                            )}
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="dentist" flex={1.5}>
                                        <FormLabel ml={1}>Dentist</FormLabel>
                                        <Input
                                            value={appointment.dentist.dentistName}
                                            readOnly
                                        />
                                    </FormControl>
                                </Stack>
                            </HStack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleUpdateAppointment}>Confirm</Button>
                        <Button colorScheme='gray' mr={3} onClick={onClose}>Close</Button>
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

export default ReAppointmentModal