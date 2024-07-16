import { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, HStack, Tabs, TabList, Tab, TabPanels, TabPanel, Stack, Select, Button, useDisclosure, useToast, Divider } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { changeTabTitle } from '../../utils/changeTabTitle';
import ApiClient from '../../services/apiClient';
import { formatDate } from '../../utils/formatDate';
import AppointmentDentistViewListResponse from '../../types/AppointmentDentistViewListResponse';
import { FaCheckToSlot, FaPenToSquare } from 'react-icons/fa6';
import { AppointmentStatus } from '../../types/type.enum';
import CreateTreatmentOutcomeModal from '../../components/modal/treatment_outcome_create';
import UpdateTreatmentOutcomeModal from '../../components/modal/treatment_outcome_update';
import Loading from '../../components/loading';
import CompleteModal from '../../components/modal/complete';
import LoadingModal from '../../components/modal/loading';

const ViewSchedulePage = () => {
    const [weeks, setWeeks] = useState<{ startDate: string, endDate: string }[]>([]);
    const [selectedWeek, setSelectedWeek] = useState<{ startDate: string, endDate: string }>({
        startDate: '',
        endDate: ''
    });
    const [appointments, setAppointments] = useState<AppointmentDentistViewListResponse[]>([]);
    const [id, setId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpen: isOpenCreate, onClose: onCloseCreate, onOpen: onOpenCreate } = useDisclosure();
    const { isOpen: isOpenUpdate, onClose: onCloseUpdate, onOpen: onOpenUpdate } = useDisclosure();
    const { isOpen: isOpenComplete, onClose: onCloseComplete, onOpen: onOpenComplete } = useDisclosure();
    const { isOpen: isOpenLoading, onClose: onCloseLoading, onOpen: onOpenLoading } = useDisclosure();
    const toast = useToast();

    const getSchedule = async (startDate: string, endDate: string) => {
        setIsLoading(true);
        const api = new ApiClient<any>('/appointment/dentist');
        try {
            const response = await api.getAuthen({
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            });
            if (response.success) {
                setAppointments(response.data);
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
        }
    }

    const getCurrentWeek = () => {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
        };
    }

    const generateWeeks = (): void => {
        const weeks: { startDate: string; endDate: string }[] = [];
        const currentYear = new Date().getFullYear();
        let startDate = new Date(currentYear, 0, 1);

        while (startDate.getDay() !== 1) {
            startDate.setDate(startDate.getDate() + 1);
        }

        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        while (startDate.getFullYear() === currentYear) {
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);

            weeks.push({
                startDate: formatDate(startDate),
                endDate: formatDate(endDate)
            });

            startDate.setDate(startDate.getDate() + 7);
        }
        setWeeks(weeks);
    };

    const handleComplete = async () => {
        onCloseComplete();
        onOpenLoading();
        const api = new ApiClient<any>('/appointment/complete');
        try {
            const response = await api.createWithId(id);
            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                })
                getSchedule(selectedWeek.startDate, selectedWeek.endDate);
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
            onCloseLoading();
        }
    }

    useEffect(() => {
        changeTabTitle('View Schedule');
        generateWeeks();
        const currentWeek = getCurrentWeek();
        setSelectedWeek(currentWeek);
        getSchedule(currentWeek.startDate, currentWeek.endDate);
    }, []);

    useEffect(() => {
        if (selectedWeek.startDate && selectedWeek.endDate) {
            getSchedule(selectedWeek.startDate, selectedWeek.endDate);
        }
    }, [selectedWeek]);

    return (
        <Stack w={'7xl'} mx={'auto'}>
            <Heading mb={5}>Schedule</Heading>
            <Tabs variant='soft-rounded' colorScheme='green' w={'full'}>
                <HStack ml={4} gap={16}>
                    <Select
                        flex={1}
                        name='week'
                        placeholder="Select week"
                        value={`${selectedWeek.startDate}|${selectedWeek.endDate}`}
                        onChange={(e) => {
                            const [startDate, endDate] = e.target.value.split('|');
                            setSelectedWeek({ startDate, endDate });
                        }}
                        textAlign={'center'}
                    >
                        {weeks.map((week, index) => (
                            <option key={index} value={`${week.startDate}|${week.endDate}`}>
                                {formatDate(week.startDate)} - {formatDate(week.endDate)}
                            </option>
                        ))}
                    </Select>
                    <TabList flex={3}>
                        <Tab>Monday</Tab>
                        <Tab>Tuesday</Tab>
                        <Tab>Wednesday</Tab>
                        <Tab>Thursday</Tab>
                        <Tab>Friday</Tab>
                        <Tab>Saturday</Tab>
                        <Tab>Sunday</Tab>
                    </TabList>
                </HStack>
                <Divider mt={8} mb={5} />
                {!isLoading ? (
                    <TabPanels mb={10}>
                        {appointments.map((appointment, index) => (
                            <TabPanel key={index}>
                                {appointment.appointments.length !== 0 ? (
                                    <SimpleGrid columns={3} spacing={5}>
                                        {appointment.appointments.map((a) => (
                                            <Box
                                                key={a.appointmentId}
                                                p={5}
                                                shadow="md"
                                                borderWidth="1px"
                                                borderRadius="md"
                                            >
                                                <HStack justify="space-between" mb={3}>
                                                    <Text fontWeight="bold">{`${a.slot.startTime} - ${a.slot.endTime}`}</Text>
                                                    <CalendarIcon />
                                                </HStack>
                                                <Stack align="start">
                                                    <Text>Patient: {a.customerName}</Text>
                                                    <Text>Service: {a.service}</Text>
                                                </Stack>
                                                {a.appointmentStatus === AppointmentStatus.PENDING && (
                                                    <Button
                                                        colorScheme='green'
                                                        gap={2}
                                                        mt={5}
                                                        w={'full'}
                                                        onClick={() => {
                                                            setId(a.appointmentId);
                                                            onOpenComplete();
                                                        }}
                                                    >
                                                        <FaCheckToSlot /> Treatment done
                                                    </Button>
                                                )}
                                                {a.appointmentStatus === AppointmentStatus.DONE && (
                                                    <>
                                                        {a.treatmentOutcomeId ? (
                                                            <Button
                                                                colorScheme='yellow'
                                                                gap={2}
                                                                mt={5}
                                                                w={'full'}
                                                                onClick={() => {
                                                                    setId(a.appointmentId);
                                                                    onOpenUpdate();
                                                                }}
                                                            >
                                                                <FaPenToSquare /> Update treatment outcome
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                colorScheme='blue'
                                                                gap={2}
                                                                mt={5}
                                                                w={'full'}
                                                                onClick={() => {
                                                                    setId(a.appointmentId);
                                                                    onOpenCreate();
                                                                }}
                                                            >
                                                                <FaCheckToSlot /> Create treatment outcome
                                                            </Button>
                                                        )}
                                                    </>
                                                )}
                                            </Box>
                                        ))}
                                    </SimpleGrid>
                                ) : (
                                    <Stack align={'center'} w={'full'} h={'calc(100vh - 570px)'} justify={'center'}>
                                        <Text>No Appointment</Text>
                                    </Stack>
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                ) : (
                    <Stack align={'center'} w={'full'} h={'calc(100vh - 570px)'} justify={'center'}>
                        <Loading />
                    </Stack>
                )}
            </Tabs>
            {isOpenCreate && (
                <CreateTreatmentOutcomeModal
                    isOpen={isOpenCreate}
                    onClose={onCloseCreate}
                    id={id}
                />
            )}
            {isOpenUpdate && (
                <UpdateTreatmentOutcomeModal
                    isOpen={isOpenUpdate}
                    onClose={onCloseUpdate}
                    id={id}
                />
            )}
            <CompleteModal
                isOpen={isOpenComplete}
                onClose={onCloseComplete}
                handleComplete={handleComplete}
            />
            <LoadingModal
                isOpen={isOpenLoading}
                onClose={onCloseLoading}
            />
        </Stack>
    );
}

export default ViewSchedulePage;
