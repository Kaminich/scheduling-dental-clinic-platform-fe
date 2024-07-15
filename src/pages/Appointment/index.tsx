import { Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, HStack, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { Color, Shadow } from "../../styles/styles"
import { useEffect, useState } from "react";
import { FaEye, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { changeTabTitle } from "../../utils/changeTabTitle";
import FeedbackFormModal from "../../components/modal/feedback_form";
import AppointmentDetailModal from "../../components/modal/appointment_detail";
import useCustomerAppointment from "../../hooks/useCustomerAppointment";
import AppointmentResponse, { initialAppointmentResponse } from "../../types/AppointmentResponse";
import { formatDateMonth } from "../../utils/formatDateMonth";
import Loading from "../../components/loading";
import AppointmentUpdateModal from "../../components/modal/appointment_update";
import AppointmentCancelModal from "../../components/modal/appointment_cancel";

const AppointmentPage = () => {
    const [id, setId] = useState<number>(0);
    const { data, isLoading, refetch } = useCustomerAppointment();
    const [appointments, setAppointments] = useState<AppointmentResponse>(initialAppointmentResponse);
    const { isOpen: isOpenDetail, onOpen: onOpenDetail, onClose: onCloseDetail } = useDisclosure();
    const { isOpen: isOpenCancel, onOpen: onOpenCancel, onClose: onCloseCancel } = useDisclosure();
    const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
    const { isOpen: isOpenFeedback, onOpen: onOpenFeedback, onClose: onCloseFeedback } = useDisclosure();

    useEffect(() => {
        changeTabTitle('Appointment');
    }, []);

    useEffect(() => {
        if (data) {
            setAppointments(data);
        }
    }, [data]);

    console.log(data);

    return (
        <Stack w={'6xl'} mx={'auto'} mb={10}>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Current Appointment</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Appointment History</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {!isLoading ? (
                            <>
                                {appointments["Current Appointment"].length !== 0 ? (
                                    <Stack gap={10}>
                                        {appointments["Current Appointment"].map((appointment) => (
                                            <Stack gap={10}>
                                                <Text textAlign={'center'} bg={Color.headingGradientLg}>{formatDateMonth(appointment.createdDate)}</Text>
                                                <Card shadow={Shadow.cardShadow} w={'5xl'} m={'auto'}>
                                                    <CardHeader mb={-5}>
                                                        <HStack gap={0} justify={'flex-end'}>
                                                            <Button
                                                                borderRadius={'full'}
                                                                px={3}
                                                                colorScheme="blue"
                                                                variant={'ghost'}
                                                                onClick={() => {
                                                                    setId(appointment.appointmentId);
                                                                    onOpenUpdate();
                                                                }}
                                                            >
                                                                <Tooltip label={'Update appointment'}>
                                                                    <span>
                                                                        <FaPenToSquare />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                            <Button
                                                                borderRadius={'full'}
                                                                px={3}
                                                                colorScheme="red"
                                                                variant={'ghost'}
                                                                onClick={() => {
                                                                    setId(appointment.appointmentId);
                                                                    onOpenCancel();
                                                                }}
                                                            >
                                                                <Tooltip label={'Cancel appointment'}>
                                                                    <span>
                                                                        <FaTrashCan />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                        </HStack>
                                                    </CardHeader>
                                                    <CardBody pb={10}>
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
                                                                                value={appointment.dob}
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
                                                    </CardBody>
                                                </Card>
                                            </Stack>
                                        ))}
                                    </Stack>
                                ) : (
                                    <HStack minH={'calc(100vh - 475px)'} justify={'center'}>
                                        <Text>No appointment</Text>
                                    </HStack>
                                )}
                            </>
                        ) : (
                            <Stack minH={'calc(100vh - 475px)'} align={'center'}>
                                <Loading />
                            </Stack>
                        )}
                    </TabPanel>
                    <TabPanel>
                        <Stack gap={8}>
                            {!isLoading ? (
                                <>
                                    {appointments["Appointment History"].length !== 0 ? (
                                        <>
                                            {appointments["Appointment History"].map((appointment) => (
                                                <Card>
                                                    <CardBody>
                                                        <Stack gap={0}>
                                                            <Text>Appointment ID: {appointment.appointmentId}</Text>
                                                            <Text fontSize={16}>Appointment Date: {appointment.createdDate}</Text>
                                                        </Stack>
                                                        <HStack justify={'flex-end'} gap={5}>
                                                            <Button colorScheme="green" gap={2} onClick={() => {
                                                                setId(appointment.appointmentId);
                                                                onOpenDetail();
                                                            }}>
                                                                <FaEye /> Appointment Detail
                                                            </Button>
                                                            <Button colorScheme="blue" gap={2} onClick={() => {
                                                                setId(appointment.appointmentId);
                                                                onOpenFeedback();
                                                            }}>
                                                                Give Rating and Feedback
                                                            </Button>
                                                        </HStack>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </>
                                    ) : (
                                        <HStack minH={'calc(100vh - 475px)'} justify={'center'}>
                                            <Text>No appointment</Text>
                                        </HStack>
                                    )}
                                </>
                            ) : (
                                <Stack minH={'calc(100vh - 475px)'} align={'center'}>
                                    <Loading />
                                </Stack>
                            )}
                        </Stack>
                        <AppointmentDetailModal
                            isOpen={isOpenDetail}
                            onClose={onCloseDetail}
                            id={id}
                        />
                        <AppointmentUpdateModal
                            isOpen={isOpenUpdate}
                            onClose={onCloseUpdate}
                            id={id}
                        />
                        <AppointmentCancelModal
                            isOpen={isOpenCancel}
                            onClose={onCloseCancel}
                            id={id}
                            refetch={refetch}
                        />
                        <FeedbackFormModal
                            isOpen={isOpenFeedback}
                            onClose={onCloseFeedback}
                            branchclinicId={id}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    )
}

export default AppointmentPage