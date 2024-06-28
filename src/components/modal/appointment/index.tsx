import { Box, Button, Checkbox, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, Tooltip } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import useUserProfile from "../../../hooks/useUserProfile";
import Customer, { CustomerInit } from "../../../types/Customer";
import { formatDobToAge } from "../../../utils/formatDobToAge";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    dentalData: any;
    dentistData: any;
    locationData: any;
}

export const today = new Date().toISOString().split('T')[0];

const AppointmentModal = ({ isOpen, onClose, dentalData, dentistData, locationData }: Props) => {
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
    const [userData, setUserData] = useState<Customer>(CustomerInit);

    const { data } = useUserProfile();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Make Appointment</ModalHeader>
                <ModalCloseButton borderRadius={'full'} />
                <ModalBody maxH={'xl'} overflowY={'auto'} mx={5}>
                    {isAuthenticated ? (
                        <Stack gap={2}>
                            <Box maxW={'24px'}>
                                <Checkbox
                                    defaultChecked
                                    ml={1}
                                    onChange={() => setIsPersonal(!isPersonal)}
                                >
                                    Personal
                                </Checkbox>
                            </Box>
                            <HStack>
                                <FormControl id="fullname" flex={2.5}>
                                    <FormLabel ml={1}>Full Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={isPersonal ? userData.fullName : fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        readOnly={isPersonal}
                                        placeholder={'Enter full name'}
                                    />
                                </FormControl>
                                <FormControl id="age" flex={0.6}>
                                    <FormLabel ml={1}>Age</FormLabel>
                                    <Input
                                        type="number"
                                        value={isPersonal ? formatDobToAge(userData.dob) : age}
                                        onChange={(e) => setAge(e.target.value)}
                                        readOnly={isPersonal}
                                        textAlign={'center'}
                                    />
                                </FormControl>
                                <FormControl id="gender" flex={1.5}>
                                    <FormLabel ml={1}>Gender</FormLabel>
                                    {isPersonal ? (
                                        <Input value={userData.gender} readOnly />
                                    ) : (
                                        <Select
                                            name="gender"
                                            onChange={(e) => setGender(e.target.value)}
                                            placeholder={'Select gender'}
                                        >
                                            <option value="Male">
                                                Male
                                            </option>
                                            <option value="Female">
                                                Female
                                            </option>
                                            <option value="Other">
                                                Other
                                            </option>
                                        </Select>
                                    )}

                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl id="email" flex={2}>
                                    <FormLabel ml={1}>Email</FormLabel>
                                    <Input
                                        type="email"
                                        value={isPersonal ? userData.email : email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        readOnly={isPersonal}
                                        placeholder="Enter email"
                                    />
                                </FormControl>
                                <FormControl id="phone" flex={1.2}>
                                    <FormLabel ml={1} pl={1}>Phone number</FormLabel>
                                    <Input
                                        type="tel"
                                        value={isPersonal ? userData.phone : phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        readOnly={isPersonal}
                                        placeholder="Enter phone number"
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl id="address" flex={2}>
                                <FormLabel ml={1}>Address</FormLabel>
                                <Input
                                    type="text"
                                    value={isPersonal ? userData.address : address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    readOnly={isPersonal}
                                    placeholder="Enter Address"
                                />
                            </FormControl>
                            <HStack>
                                <FormControl id="dental" flex={1.5}>
                                    <FormLabel ml={1}>Dental</FormLabel>
                                    <Input
                                        type="text"
                                        value={dentalData.name}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl id="date" flex={1}>
                                    <FormLabel ml={1}>Date</FormLabel>
                                    <Input
                                        type="date"
                                        min={today}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl id="location" flex={2}>
                                    <FormLabel ml={1}>Location</FormLabel>
                                    {locationData === '' ? (
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
                                    ) : (
                                        <Input value={locationData.name} readOnly />
                                    )}
                                </FormControl>
                                <FormControl id="service" flex={1}>
                                    <FormLabel ml={1}>Service</FormLabel>
                                    <Select
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
                                    </Select>
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl id="time" flex={1}>
                                    <FormLabel ml={1}>Time</FormLabel>
                                    <Select
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
                                    </Select>
                                </FormControl>
                                <FormControl id="dentist" flex={1.5}>
                                    <FormLabel ml={1}>Dentist</FormLabel>
                                    {((location === '' || service === '' || date === '') && locationData === '') ? (
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
                                    ) : (
                                        <>
                                            {dentistData === '' ? (
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
                                            ) : (
                                                <Input value={dentistData.name} readOnly />
                                            )}
                                        </>
                                    )}
                                </FormControl>
                            </HStack>
                        </Stack>
                    ) : (
                        <Stack
                            flex="1"
                            overflowY="auto"
                            px={4}
                            pt={6}
                            h={'xs'}
                            justify={'center'}
                        >
                            <Stack mx={5} align={'center'} gap={4}>
                                <Text>You must login to make appointment</Text>
                                <Button
                                    maxW={24}
                                    p={5}
                                    borderRadius={8}
                                    colorScheme="twitter"
                                    fontSize={16}
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </Stack>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                    <Button
                        colorScheme="blue"
                        variant='outline'
                        display={isAuthenticated ? 'block' : 'none'}
                    >
                        Continue
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default AppointmentModal