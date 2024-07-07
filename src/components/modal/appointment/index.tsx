import { Button, FormControl, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Text, Tooltip, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import useUserProfile from "../../../hooks/useUserProfile";
import Customer, { CustomerInit } from "../../../types/Customer";
import ApiClient from "../../../services/apiClient";
import DentistDetailResponse from "../../../types/DentistDetailResponse";
import useServiceByClinicId from "../../../hooks/useServiceByClinicId";
import ServiceViewListResponse from "../../../types/ServiceViewListResponse";
import Loading from "../../loading";
import WorkingHoursDetailsResponse, { initialWorkingHoursDetailsResponse } from "../../../types/WorkingHoursDetailsResponse";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    clinicName?: string;
    dentistData?: DentistDetailResponse;
}

export const today = new Date().toISOString().split('T')[0];

const AppointmentModal = ({ isOpen, onClose, clinicName, dentistData }: Props) => {
    const [fullname, setFullname] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [phone, setPhone] = useState<number | string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [clinicBranchId, setClinicBranchId] = useState<number>(0);
    const [serviceId, setServiceId] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [dentistId, setDentistId] = useState<number>(0);
    const [value, setValue] = useState<string>('personal')
    const [slotId, setSlotId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<Customer>(CustomerInit);
    const toast = useToast();
    const { data } = useUserProfile();
    const { data: serviceData } = useServiceByClinicId({ clinicId: dentistData?.clinicId || 0 });
    const [services, setServices] = useState<ServiceViewListResponse[]>([]);
    const [slot, setSlot] = useState<WorkingHoursDetailsResponse>(initialWorkingHoursDetailsResponse);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const getAvailableSlot = async () => {
        const api = new ApiClient<any>('/slot/available-by-date');
        try {
            const response = await api.getUnauthen({
                params: {
                    branchId: clinicBranchId,
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

    const handleMakeAppointment = async () => {
        setIsLoading(true);
        const api = new ApiClient<any>('/appointment');
        const data = {
            customerName: fullname,
            customerAddress: address,
            customerPhone: phone,
            customerDob: dob,
            customerEmail: email,
            appointmentDate: date,
            slotId,
            clinicBranchId: dentistData?.branchId || clinicBranchId,
            dentistId: dentistData?.id || dentistId,
            serviceId,
            customerId: 0
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
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data])

    useEffect(() => {
        if (serviceData) {
            setServices(serviceData);
        }
    }, [serviceData]);

    useEffect(() => {
        if (clinicBranchId && date) {
            getAvailableSlot();
        }
    }, [clinicBranchId, date]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size={isAuthenticated ? '5xl' : 'lg'}
            closeOnEsc={isLoading ? false : true}
            closeOnOverlayClick={isLoading ? false : true}
        >
            <ModalOverlay />
            {!isLoading ? (
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
                                                    value={dentistData?.clinicName}
                                                    readOnly
                                                />
                                            </FormControl>
                                        </HStack>
                                        <FormControl id="branch" flex={2}>
                                            <FormLabel ml={1}>Branch</FormLabel>
                                            {dentistData === undefined ? (
                                                <Select
                                                    name="branch"
                                                    value={clinicBranchId}
                                                    onChange={(e) => setClinicBranchId(parseInt(e.target.value))}
                                                    placeholder={'Select branch'}
                                                >
                                                    <option value={1}>
                                                        HCM
                                                    </option>
                                                    <option value="2">
                                                        HN
                                                    </option>
                                                </Select>
                                            ) : (
                                                <Input value={`${dentistData.branchName} (${dentistData.city})`} readOnly />
                                            )}
                                        </FormControl>
                                        <FormControl id="service" flex={1}>
                                            <FormLabel ml={1}>Service</FormLabel>
                                            <Select
                                                name="service"
                                                value={serviceId}
                                                onChange={(e) => setServiceId(parseInt(e.target.value))}
                                                placeholder={'Select service'}
                                            >
                                                {services.map((service) => (
                                                    <option key={service.id} value={service.id}>
                                                        {service.serviceName}
                                                    </option>
                                                ))}
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
                                            <FormControl id="slot" flex={1}>
                                                <FormLabel ml={1}>Slot</FormLabel>
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
                                            </FormControl>
                                        </HStack>
                                        <FormControl id="dentist" flex={1.5}>
                                            <FormLabel ml={1}>Dentist</FormLabel>
                                            {dentistData === undefined ? (
                                                <>
                                                    {(clinicBranchId === 0 || serviceId === 0 || date === '') ? (
                                                        <Tooltip label={'Fill all fields above to choose'}>
                                                            <Select
                                                                placeholder={'Select dentist'}
                                                                borderColor={'gray.400'}
                                                                disabled
                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <Select
                                                            name="dentist"
                                                            placeholder={'Select dentist'}
                                                            value={dentistId}
                                                            onChange={(e) => setDentistId(parseInt(e.target.value))}
                                                        >
                                                            <option value="1">
                                                                Dentist 1
                                                            </option>
                                                            <option value="2">
                                                                Dentist 2
                                                            </option>
                                                        </Select>
                                                    )}
                                                </>
                                            ) : (
                                                <Input value={dentistData.fullName} readOnly />
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
                            onClick={handleMakeAppointment}
                        >
                            Continue
                        </Button>
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

export default AppointmentModal