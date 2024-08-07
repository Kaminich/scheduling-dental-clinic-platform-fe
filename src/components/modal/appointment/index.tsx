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
import useBranchByClinicId from "../../../hooks/useBranchByClinicId";
import BranchSummaryResponse from "../../../types/BranchSummaryResponse";
import DentistViewListResponse from "../../../types/DentistViewListResponse";
import { Status } from "../../../types/type.enum";
import { trimAll } from "../../../utils/trimAll";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    clinicId?: number;
    clinicName?: string;
    dentistData?: DentistDetailResponse;
}

export const today = new Date().toISOString().split('T')[0];

const AppointmentModal = ({ isOpen, onClose, clinicId, clinicName, dentistData }: Props) => {
    const [fullname, setFullname] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [clinicBranchId, setClinicBranchId] = useState<number>(0);
    const [serviceId, setServiceId] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [dentistId, setDentistId] = useState<number>(0);
    const [value, setValue] = useState<string>('personal');
    const [slotId, setSlotId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<Customer>(CustomerInit);
    const toast = useToast();
    const { data } = useUserProfile();
    const { data: serviceData } = useServiceByClinicId({ clinicId: dentistData?.clinicId || (clinicId || 0) });
    const { data: branchData } = useBranchByClinicId({ clinicId: dentistData?.clinicId || (clinicId || 0) });
    const [services, setServices] = useState<ServiceViewListResponse[]>([]);
    const [branches, setBranches] = useState<BranchSummaryResponse[]>([]);
    const [dentists, setDentists] = useState<DentistViewListResponse[]>([]);
    const [slot, setSlot] = useState<WorkingHoursDetailsResponse>(initialWorkingHoursDetailsResponse);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const getAvailableSlot = async () => {
        const api = new ApiClient<any>('/slot/available-by-date');
        try {
            const response = await api.getAuthen({
                params: {
                    clinicBranchId: dentistData ? dentistData?.branchId : clinicBranchId,
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

    const getAvailableDentist = async () => {
        const api = new ApiClient<any>('/dentists/available');
        try {
            const response = await api.getUnauthen({
                params: {
                    branchId: clinicBranchId,
                    date,
                    slotId
                }
            });
            if (response.success) {
                setDentists(response.data);
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
            customerName: value === 'personal' ? userData.fullName : trimAll(fullname),
            customerAddress: value === 'personal' ? userData.address : trimAll(address),
            customerPhone: value === 'personal' ? userData.phone : phone.trim(),
            customerDob: value === 'personal' ? userData.dob : dob,
            customerGender: value === 'personal' ? userData.gender : gender,
            customerEmail: value === 'personal' ? userData.email : email.trim(),
            appointmentDate: date,
            slotId,
            clinicBranchId: dentistData?.branchId || clinicBranchId,
            dentistId: dentistData?.id || dentistId,
            serviceId,
            customerId: 0
        }

        try {
            const response = await api.create(data);
            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                })
                setSlotId(0);
                setClinicBranchId(0);
                setDentistId(0);
                setServiceId(0);
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
        if (branchData) {
            setBranches(branchData);
        }
    }, [branchData]);

    useEffect(() => {
        if ((clinicBranchId || dentistData?.branchId) && date) {
            getAvailableSlot();
        }
    }, [clinicBranchId, date]);

    useEffect(() => {
        if (clinicBranchId && slotId) {
            getAvailableDentist();
        }
    }, [clinicBranchId, slotId])

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
                                                    value={dentistData?.clinicName || clinicName}
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
                                                    {branches
                                                        .filter((branch) => branch.status === Status.ACTIVE)
                                                        .map((branch) => (
                                                            <option key={branch.branchId} value={branch.branchId}>
                                                                {branch.branchName} ({branch.city})
                                                            </option>
                                                        ))}
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
                                                {services
                                                    .filter((service) => service.status === true)
                                                    .map((service) => (
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
                                                    onChange={(e) => {
                                                        setDate(e.target.value)
                                                        setSlotId(0);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormControl id="slot" flex={1}>
                                                <FormLabel ml={1}>Slot</FormLabel>
                                                {((!clinicBranchId || date === '') && dentistData === undefined) || (dentistData && date === '') ? (
                                                    <Tooltip label={'Select date and clinic branch to choose'}>
                                                        <Select
                                                            placeholder={'Select slot'}
                                                            borderColor={'gray.400'}
                                                            disabled
                                                        />
                                                    </Tooltip>
                                                ) : (
                                                    <>
                                                        {slot.slots.length !== 0 ? (
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
                                                        ) : (
                                                            <Select
                                                                name="slot"
                                                                placeholder={'Select slot'}
                                                            >
                                                                <option disabled>
                                                                    No slot available
                                                                </option>
                                                            </Select>
                                                        )}
                                                    </>
                                                )}
                                            </FormControl>
                                        </HStack>
                                        <FormControl id="dentist" flex={1.5}>
                                            <FormLabel ml={1}>Dentist</FormLabel>
                                            {dentistData === undefined ? (
                                                <>
                                                    {(clinicBranchId === 0 || serviceId === 0 || date === '' || slotId === 0) ? (
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
                                                            {dentists
                                                                .map((dentist) => (
                                                                    <option key={dentist.dentistId} value={dentist.dentistId}>
                                                                        {dentist.dentistName}
                                                                    </option>
                                                                ))}
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