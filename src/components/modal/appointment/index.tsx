import { Button, FormControl, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Text, Tooltip } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import useUserProfile from "../../../hooks/useUserProfile";
import Customer, { CustomerInit } from "../../../types/Customer";

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
    const [dob, setDob] = useState<string>('');
    const [phone, setPhone] = useState<number | string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [branchId, setBranchId] = useState<number>(0);
    const [service, setService] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [dentist, setDentist] = useState<string>('');
    const [value, setValue] = useState<string>('personal')
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
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={isAuthenticated ? '5xl' : 'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={'center'}>Make Appointment</ModalHeader>
                <ModalCloseButton borderRadius={'full'} />
                <ModalBody maxH={'xl'} overflowY={'auto'} mx={5}>
                    {isAuthenticated ? (
                        <Stack gap={4}>
                            <HStack>
                                <Text fontWeight={600}>For whom: </Text>
                                <RadioGroup onChange={setValue} value={value} defaultValue="personal">
                                    <HStack gap={4}>
                                        <Radio value='personal'>Personal</Radio>
                                        <Radio value='other'>Other</Radio>
                                    </HStack>
                                </RadioGroup>
                            </HStack>
                            <HStack gap={10} align={'flex-start'}>
                                <Stack flex={1} gap={2}>
                                    <Heading fontSize={24} mb={3}>Personal Information</Heading>
                                    <HStack>
                                        <FormControl id="fullname" flex={2}>
                                            <FormLabel ml={1}>Full Name</FormLabel>
                                            <Input
                                                type="text"
                                                value={value === 'personal' ? userData.fullName : fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                                readOnly={value === 'personal'}
                                                placeholder={'Enter full name'}
                                            />
                                        </FormControl>

                                        <FormControl id="gender" flex={1}>
                                            <FormLabel ml={1}>Gender</FormLabel>
                                            {value === 'personal' ? (
                                                <Input value={userData.gender} readOnly />
                                            ) : (
                                                <Select
                                                    name="gender"
                                                    value={gender}
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
                                        <FormControl id="dob" flex={1}>
                                            <FormLabel ml={1}>Date of Birth</FormLabel>
                                            <Input
                                                type="date"
                                                value={value === 'personal' ? userData.dob : dob}
                                                max={today}
                                                onChange={(e) => setDob(e.target.value)}
                                                readOnly={value === 'personal'}
                                            />
                                        </FormControl>
                                        <FormControl id="phone" flex={1.2}>
                                            <FormLabel ml={1} pl={1}>Phone number</FormLabel>
                                            <Input
                                                type="tel"
                                                value={value === 'personal' ? userData.phone : phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                readOnly={value === 'personal'}
                                                placeholder="Enter phone number"
                                            />
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="email" flex={2}>
                                        <FormLabel ml={1}>Email</FormLabel>
                                        <Input
                                            type="email"
                                            value={value === 'personal' ? userData.email : email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            readOnly={value === 'personal'}
                                            placeholder="Enter email"
                                        />
                                    </FormControl>
                                    <FormControl id="address" flex={2}>
                                        <FormLabel ml={1}>Address</FormLabel>
                                        <Input
                                            type="text"
                                            value={value === 'personal' ? userData.address : address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            readOnly={value === 'personal'}
                                            placeholder="Enter Address"
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
                                                value={dentalData.name}
                                                readOnly
                                            />
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="branch" flex={2}>
                                        <FormLabel ml={1}>Branch</FormLabel>
                                        {locationData === '' ? (
                                            <Select
                                                name="branch"
                                                value={branchId}
                                                onChange={(e) => setBranchId(parseInt(e.target.value))}
                                                placeholder={'Select branch'}
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
                                    <HStack>
                                        <FormControl id="date" flex={1}>
                                            <FormLabel ml={1}>Date</FormLabel>
                                            <Input
                                                type="date"
                                                min={today}
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </FormControl>
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
                                    </HStack>
                                    <FormControl id="dentist" flex={1.5}>
                                        <FormLabel ml={1}>Dentist</FormLabel>
                                        {((branchId === 0 || service === '' || date === '') && locationData === '') ? (
                                            <Tooltip label={'Fill all fields above to choose'}>
                                                <Select
                                                    placeholder={'Select dentist'}
                                                    borderColor={'gray.400'}
                                                    disabled
                                                />
                                            </Tooltip>
                                        ) : (
                                            <>
                                                {dentistData === '' ? (
                                                    <Select
                                                        name="dentist"
                                                        placeholder={'Select dentist'}
                                                        value={dentist}
                                                        onChange={(e) => setDentist(e.target.value)}
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
                                </Stack>
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