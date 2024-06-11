import { Button, Card, CardBody, FormControl, FormLabel, HStack, Input, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from "@chakra-ui/react"
import { Color, Shadow } from "../../styles/styles"
import { useEffect, useState } from "react";
import AppointmentModal, { today } from "../../components/modal/appointment";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import FeedbackModal from "../../components/modal/feedback";
import { changeTitle } from "../../utils/changeTabTitle";

const Appointment = () => {
    const [fullname, setFullname] = useState<string>('');
    const [age, setAge] = useState<number | string>('');
    const [phone, setPhone] = useState<number | string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [service, setService] = useState<string>('');
    const [date, setDate] = useState<Date | string>('');
    const [dentist, setDentist] = useState<string>('');
    const [isPersonal, setIsPersonal] = useState<boolean>(true);
    const [time, setTime] = useState<string>('');

    const { isOpen: isOpenAppointment, onOpen: onOpenAppointment, onClose: onCloseAppointment } = useDisclosure();
    const { isOpen: isOpenFeedback, onOpen: onOpenFeedback, onClose: onCloseFeedback } = useDisclosure();

    useEffect(() => {
        changeTitle('Appointment');
    }, []);

    return (
        <Stack w={'6xl'} m={'auto'} mb={10}>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Current Appointment</Tab>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Appointment History</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Stack gap={10}>
                            <Stack gap={10}>
                                <Text textAlign={'center'} bg={Color.headingGradientLg}>May 31, 2024</Text>
                                <Card shadow={Shadow.cardShadow} w={'xl'} m={'auto'}>
                                    <CardBody>
                                        <HStack justify={'space-between'}>
                                            <Text>Appointment ID: </Text>
                                            <HStack gap={3}>
                                                <Button borderRadius={'full'} px={3} colorScheme="red" variant={'outline'}>
                                                    <FaTrashCan />
                                                </Button>
                                                <Button borderRadius={'full'} px={3} colorScheme="cyan" variant={'outline'}>
                                                    <FaPenToSquare />
                                                </Button>
                                            </HStack>
                                        </HStack>
                                        <FormControl id="fullname" flex={2.5}>
                                            <FormLabel ml={1}>Full Name</FormLabel>
                                            <Input
                                                type="text"
                                                value={isPersonal ? 'fullname' : fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                                readOnly={isPersonal}
                                                placeholder={'Enter full name'}
                                            />
                                        </FormControl>
                                        <HStack>
                                            <FormControl id="gender" flex={1}>
                                                <FormLabel ml={1}>Gender</FormLabel>
                                                {isPersonal ? (
                                                    <Input value={'Male'} readOnly />
                                                ) : (
                                                    <Select
                                                        name="gender"
                                                        onChange={(e) => setGender(e.target.value)}
                                                        placeholder={'Select gender'}
                                                    >
                                                        <option value="1">
                                                            Male
                                                        </option>
                                                        <option value="2">
                                                            Female
                                                        </option>
                                                    </Select>
                                                )}
                                            </FormControl>
                                            <FormControl id="age" flex={0.6}>
                                                <FormLabel ml={1}>Age</FormLabel>
                                                <Input
                                                    type="number"
                                                    value={isPersonal ? 10 : age}
                                                    onChange={(e) => setAge(e.target.value)}
                                                    readOnly={isPersonal}
                                                    textAlign={'center'}
                                                />
                                            </FormControl>
                                            <FormControl id="phone" flex={1.5}>
                                                <FormLabel ml={1} pl={1}>Phone number</FormLabel>
                                                <Input
                                                    type="tel"
                                                    value={isPersonal ? '0912345678' : phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                    readOnly={isPersonal}
                                                    placeholder="Enter phone number"
                                                />
                                            </FormControl>
                                        </HStack>
                                        <FormControl id="email" flex={2}>
                                            <FormLabel ml={1}>Email</FormLabel>
                                            <Input
                                                type="email"
                                                value={isPersonal ? 'email' : email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                readOnly={isPersonal}
                                                placeholder="Enter email"
                                            />
                                        </FormControl>
                                        <FormControl id="address" flex={2}>
                                            <FormLabel ml={1}>Address</FormLabel>
                                            <Input
                                                type="text"
                                                value={isPersonal ? 'address' : address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                readOnly={isPersonal}
                                                placeholder="Enter Address"
                                            />
                                        </FormControl>
                                        <FormControl id="dental" flex={1.5}>
                                            <FormLabel ml={1}>Dental</FormLabel>
                                            <Input
                                                type="text"
                                                value={'dentalData.name'}
                                                readOnly
                                            />
                                        </FormControl>
                                        <FormControl id="location" flex={2}>
                                            <FormLabel ml={1}>Location</FormLabel>
                                            {/* {locationData === '' ? (
                                    <Select
                                        name="location"
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder={'Select location'}
                                    >
                                        <option value="1">
                                            HCM
                                        </option>
                                        <option value="2">
                                            HN
                                        </option>
                                    </Select>
                                ) : ( */}
                                            <Input value={'locationData.name'} readOnly />
                                            {/* )} */}
                                        </FormControl>
                                        <HStack>
                                            <FormControl id="date" flex={1}>
                                                <FormLabel ml={1}>Date</FormLabel>
                                                <Input
                                                    type="date"
                                                    defaultValue={today}
                                                    min={today}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    readOnly
                                                />
                                            </FormControl>
                                            <FormControl id="time" flex={2.5}>
                                                <FormLabel ml={1}>Time</FormLabel>
                                                {/* <Select
                                                name="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                placeholder={'Select time'}
                                            >
                                                <option value="1" style={{ padding: '10px' }}>
                                                    Morning
                                                </option>
                                                <option value="2">
                                                    Afternoon
                                                </option>
                                            </Select> */}
                                                <Input value={'locationData.name'} readOnly />
                                            </FormControl>
                                            <FormControl id="service" flex={2.5}>
                                                <FormLabel ml={1}>Service</FormLabel>
                                                {/* <Select
                                                name="service"
                                                onChange={(e) => setService(e.target.value)}
                                                placeholder={'Select service'}
                                            >
                                                <option value="1">
                                                    Service 1
                                                </option>
                                                <option value="2">
                                                    Service 2
                                                </option>
                                            </Select> */}
                                                <Input value={'service 1'} readOnly />
                                            </FormControl>
                                        </HStack>
                                        <FormControl id="dentist">
                                            <FormLabel ml={1}>Dentist</FormLabel>
                                            {/* {(location && locationData && service && date && time) ? (
                                    <Tooltip label={'You must select location to choose'}>
                                        <Select
                                            name="dentist"
                                            onChange={(e) => setDentist(e.target.value)}
                                            placeholder={'Select dentist'}
                                            disabled
                                        >
                                            <option value="1">
                                                Dentist 1
                                            </option>
                                            <option value="2">
                                                Dentist 2
                                            </option>
                                        </Select>
                                    </Tooltip>
                                ) : ( */}
                                            <>
                                                {/* {dentistData === '' ? (
                                            <Select
                                                name="dentist"
                                                placeholder={'Select dentist'}
                                                isReadOnly={dentistData !== '' ? true : false}
                                            >
                                                <option value="1">
                                                    Dentist 1
                                                </option>
                                                <option value="2">
                                                    Dentist 2
                                                </option>
                                            </Select>
                                        ) : ( */}
                                                <Input value={'dentistData.name'} readOnly />
                                                {/* )} */}
                                            </>
                                            {/* )} */}
                                        </FormControl>
                                    </CardBody>
                                </Card>
                            </Stack>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Stack gap={8}>
                            <Card>
                                <CardBody>
                                    <Stack gap={0}>
                                        <Text>Appointment ID: </Text>
                                        <Text fontSize={16}>Appointment Date: </Text>
                                    </Stack>
                                    <HStack justify={'flex-end'} gap={5}>
                                        <Button onClick={onOpenAppointment}>
                                            Appointment Detail
                                        </Button>
                                        <Button onClick={onOpenFeedback}>
                                            Give Rating and Feedback
                                        </Button>
                                    </HStack>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Stack gap={0}>
                                        <Text>Appointment ID: </Text>
                                        <Text fontSize={16}>Appointment Date: </Text>
                                    </Stack>
                                    <HStack justify={'flex-end'} gap={5}>
                                        <Button onClick={onOpenAppointment}>
                                            Appointment Detail
                                        </Button>
                                        <Button onClick={onOpenFeedback}>
                                            Give Rating and Feedback
                                        </Button>
                                    </HStack>
                                </CardBody>
                            </Card>
                        </Stack>
                        <AppointmentModal
                            isOpen={isOpenAppointment}
                            onClose={onCloseAppointment}
                            dentalData={''}
                            dentistData={''}
                            locationData={''}
                        />
                        <FeedbackModal
                            isOpen={isOpenFeedback}
                            onClose={onCloseFeedback}
                            type="review"
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    )
}

export default Appointment