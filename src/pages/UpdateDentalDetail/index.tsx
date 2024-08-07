import { Button, Checkbox, FormControl, FormLabel, HStack, Image, Input, Select, Stack, Table, Tbody, Td, Textarea, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../services/apiClient";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { FaCamera, FaPen } from "react-icons/fa6";
import axios from "axios";
import { Border } from "../../styles/styles";
import useUserProfile from "../../hooks/useUserProfile";
import LoadingModal from "../../components/modal/loading";
import { DayInWeek, VietnamCities } from "../../types/type.enum";
import useWorkingHoursByClinicId from "../../hooks/useWorkingHoursByClinicId";
import WorkingHoursResponse from "../../types/WorkingHoursResponse";
import ClinicDetailResponse, { initialClinicDetailResponse } from "../../types/ClinicDetailResponse";
import useClinicDetail from "../../hooks/useClinicDetail";
import Loading from "../../components/loading";

const UpdateDentalDetailPage = () => {
    const [clinicName, setClinicName] = useState<string>('');
    const [phone, setPhone] = useState<string | number>('');
    const [email, setEmail] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [websiteUrl, setWebsiteUrl] = useState<string>('');
    const [logo, setLogo] = useState<string>('');
    const [logoData, setLogoData] = useState<File | null>(null);
    const [clinicImage, setClinicImage] = useState<string>('');
    const [clinicImageData, setClinicImageData] = useState<File | null>(null);
    const [startTimeMonday, setStartTimeMonday] = useState<string>('');
    const [endTimeMonday, setEndTimeMonday] = useState<string>('');
    const [isWorkingMonday, setIsWorkingMonday] = useState<boolean>(true);
    const [startTimeTuesday, setStartTimeTuesday] = useState<string>('');
    const [endTimeTuesday, setEndTimeTuesday] = useState<string>('');
    const [isWorkingTuesday, setIsWorkingTuesday] = useState<boolean>(true);
    const [startTimeWednesday, setStartTimeWednesday] = useState<string>('');
    const [endTimeWednesday, setEndTimeWednesday] = useState<string>('');
    const [isWorkingWednesday, setIsWorkingWednesday] = useState<boolean>(true);
    const [startTimeThursday, setStartTimeThursday] = useState<string>('');
    const [endTimeThursday, setEndTimeThursday] = useState<string>('');
    const [isWorkingThursday, setIsWorkingThursday] = useState<boolean>(true);
    const [startTimeFriday, setStartTimeFriday] = useState<string>('');
    const [endTimeFriday, setEndTimeFriday] = useState<string>('');
    const [isWorkingFriday, setIsWorkingFriday] = useState<boolean>(true);
    const [startTimeSaturday, setStartTimeSaturday] = useState<string>('');
    const [endTimeSaturday, setEndTimeSaturday] = useState<string>('');
    const [isWorkingSaturday, setIsWorkingSaturday] = useState<boolean>(true);
    const [startTimeSunday, setStartTimeSunday] = useState<string>('');
    const [endTimeSunday, setEndTimeSunday] = useState<string>('');
    const [isWorkingSunday, setIsWorkingSunday] = useState<boolean>(true);

    const navigate = useNavigate();
    const toast = useToast();
    const [workingHours, setWorkingHours] = useState<WorkingHoursResponse[]>([]);
    const { data: userData } = useUserProfile();
    const { data: workingHoursData } = useWorkingHoursByClinicId({ clinicId: userData?.clinicId });
    const { data: clinicData, isLoading } = useClinicDetail({ clinicId: userData?.clinicId });
    const [clinic, setClinic] = useState<ClinicDetailResponse>(initialClinicDetailResponse);
    const { isOpen: isOpenLoading, onClose: onCloseLoading, onOpen: onOpenLoading } = useDisclosure();

    const api = new ApiClient<any>('/clinics');

    const handleReset = () => {
        setClinicName(clinic.clinicName);
        setPhone(clinic.phone);
        setCity(clinic.city)
        setEmail(clinic.email);
        setAddress(clinic.address);
        setDescription(clinic.description);
        setWebsiteUrl(clinic.websiteUrl);
        setLogo(clinic.logo);
        setLogoData(null);
        setClinicImage(clinic.clinicImage);
        setClinicImageData(null);
    }

    const handleLogoChange = (e: any) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = URL.createObjectURL(selectedFile);
                setLogo(imageUrl);
            };
            reader.readAsDataURL(selectedFile);
            setLogoData(selectedFile);
        }
    }

    const handleClinicImageChange = (e: any) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = URL.createObjectURL(selectedFile);
                setClinicImage(imageUrl);
            };
            reader.readAsDataURL(selectedFile);
            setClinicImageData(selectedFile);
        }
    }

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        onOpenLoading();
        let logoUrl: string = '';
        let clinicImageUrl: string = '';

        if (logoData) {
            const formDataImage = new FormData();
            formDataImage.append("file", logoData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                logoUrl = response.data.secure_url;
            } catch (error) {
                console.error(error);
            }
        }

        if (clinicImageData) {
            const formDataImage = new FormData();
            formDataImage.append("file", clinicImageData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                clinicImageUrl = response.data.secure_url;
            } catch (error) {
                console.error(error);
            }
        }

        const data = {
            clinicId: clinic.id,
            clinicName,
            address,
            city,
            phone,
            email,
            description,
            websiteUrl,
            logo: logoUrl === '' ? logo : logoUrl,
            clinicImage: clinicImageUrl === '' ? clinicImage : clinicImageUrl,
            workingHours: [
                {
                    day: DayInWeek.MONDAY,
                    startTime: isWorkingMonday ? startTimeMonday : null,
                    endTime: isWorkingMonday ? endTimeMonday : null,
                    clinicId: clinic.id
                },
                {
                    day: DayInWeek.TUESDAY,
                    startTime: isWorkingTuesday ? startTimeTuesday : null,
                    endTime: isWorkingTuesday ? endTimeTuesday : null,
                    clinicId: clinic.id
                },
                {
                    day: DayInWeek.WEDNESDAY,
                    startTime: isWorkingWednesday ? startTimeWednesday : null,
                    endTime: isWorkingWednesday ? endTimeWednesday : null,
                    clinicId: clinic.id
                },
                {
                    day: DayInWeek.THURSDAY,
                    startTime: isWorkingThursday ? startTimeThursday : null,
                    endTime: isWorkingThursday ? endTimeThursday : null,
                    clinicId: clinic.id
                },
                {
                    day: DayInWeek.FRIDAY,
                    startTime: isWorkingFriday ? startTimeFriday : null,
                    endTime: isWorkingFriday ? endTimeFriday : null,
                    clinicId: clinic.id
                },
                {
                    day: DayInWeek.SATURDAY,
                    startTime: isWorkingSaturday ? startTimeSaturday : null,
                    endTime: isWorkingSaturday ? endTimeSaturday : null,
                    clinicId: clinic.id
                },
                {
                    day: DayInWeek.SUNDAY,
                    startTime: isWorkingSunday ? startTimeSunday : null,
                    endTime: isWorkingSunday ? endTimeSunday : null,
                    clinicId: clinic.id
                },
            ]
        };

        try {
            const response = await api.update(data);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                navigate(-1);
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
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
    };

    const updateWorkingHours = () => {
        workingHours.forEach((wh) => {
            switch (wh.day) {
                case DayInWeek.MONDAY:
                    setStartTimeMonday(wh.startTime);
                    setEndTimeMonday(wh.endTime);
                    setIsWorkingMonday(wh.status);
                    break;
                case DayInWeek.TUESDAY:
                    setStartTimeTuesday(wh.startTime);
                    setEndTimeTuesday(wh.endTime);
                    setIsWorkingTuesday(wh.status);
                    break;
                case DayInWeek.WEDNESDAY:
                    setStartTimeWednesday(wh.startTime);
                    setEndTimeWednesday(wh.endTime);
                    setIsWorkingWednesday(wh.status);
                    break;
                case DayInWeek.THURSDAY:
                    setStartTimeThursday(wh.startTime);
                    setEndTimeThursday(wh.endTime);
                    setIsWorkingThursday(wh.status);
                    break;
                case DayInWeek.FRIDAY:
                    setStartTimeFriday(wh.startTime);
                    setEndTimeFriday(wh.endTime);
                    setIsWorkingFriday(wh.status);
                    break;
                case DayInWeek.SATURDAY:
                    setStartTimeSaturday(wh.startTime);
                    setEndTimeSaturday(wh.endTime);
                    setIsWorkingSaturday(wh.status);
                    break;
                case DayInWeek.SUNDAY:
                    setStartTimeSunday(wh.startTime);
                    setEndTimeSunday(wh.endTime);
                    setIsWorkingSunday(wh.status);
                    break;
            }
        });
    };

    useEffect(() => {
        changeTabTitle('Update Dental Clinic');
    }, []);

    useEffect(() => {
        updateWorkingHours();
    }, [workingHours]);

    useEffect(() => {
        handleReset();
        updateWorkingHours();
    }, [clinic]);

    useEffect(() => {
        if (clinicData) {
            setClinic(clinicData);
        }
    }, [clinicData]);

    useEffect(() => {
        if (workingHoursData) {
            setWorkingHours(workingHoursData);
        }
    }, [workingHoursData]);

    const renderRow = (
        day: DayInWeek,
        startTime: string,
        setStartTime: Dispatch<SetStateAction<string>>,
        endTime: string,
        setEndTime: Dispatch<SetStateAction<string>>,
        isWorking: boolean,
        setIsWorking: Dispatch<SetStateAction<boolean>>
    ) => (
        <Tr key={day}>
            <Th>{day}</Th>
            {isWorking ? (
                <>
                    <Td textAlign={'center'}>
                        <FormControl id={`startTime${day}`} isRequired>
                            <Input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                placeholder="Enter start time"
                                required
                            />
                        </FormControl>
                    </Td>
                    <Td textAlign={'center'}>
                        <FormControl id={`endTime${day}`} isRequired>
                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                placeholder="Enter end time"
                                required
                            />
                        </FormControl>
                    </Td>
                </>
            ) : (
                <Td colSpan={2} textAlign={'center'} py={'26px'}>
                    No Working
                </Td>
            )}
            <Td textAlign={'center'}>
                <Checkbox isChecked={!isWorking} onChange={() => setIsWorking(!isWorking)} />
            </Td>
        </Tr>
    );

    return (
        <>
            {!isLoading ? (
                <Stack w={'7xl'} m={'auto'} mb={10}>
                    <Stack w={'full'} pos={'relative'}>
                        <Image
                            alt={"Slider Image"}
                            h={'50vh'}
                            borderRadius={10}
                            p={0}
                            src={
                                clinicImage || "https://i.pinimg.com/736x/08/1a/ed/081aed2e7ddc029f940021ddb22145fc.jpg"
                            }
                        />
                        <FormLabel
                            htmlFor="img"
                            cursor='pointer'
                            fontSize='md'
                            pos={'absolute'}
                            right={3}
                            bottom={3}
                            display={'flex'}
                            gap={3}
                            alignItems={'center'}
                            py={2}
                            px={4}
                            borderRadius={8}
                            bg={'gainsboro'}
                            _hover={{ bg: 'gray.300' }}
                        >
                            <FaCamera /> Update Clinic Image
                        </FormLabel>
                        <Input
                            type="file"
                            id="img"
                            accept="image/*"
                            onChange={handleClinicImageChange}
                            display='none'
                        />
                    </Stack>
                    <HStack alignItems="center" mt={-12} mx={10} justify={'space-between'}>
                        <HStack align={'flex-end'} gap={5}>
                            <Image
                                border='1px solid gainsboro'
                                borderRadius='full'
                                boxSize={'9rem'}
                                src={
                                    logo || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                }
                                alt='avatar'
                                bgColor='white'
                                objectFit={'cover'}
                                zIndex={2}
                            />
                            <FormLabel
                                htmlFor="avt"
                                cursor='pointer'
                                fontSize='md'
                                ml={-8}
                            >
                                <FaPen />
                            </FormLabel>
                            <Input
                                type="file"
                                id="avt"
                                accept="image/*"
                                onChange={handleLogoChange}
                                display='none'
                            />
                        </HStack>
                    </HStack>
                    <HStack gap={20} align={'flex-start'} my={10}>
                        <Stack gap={3} flex={1}>
                            <FormControl id="clinicName" isRequired>
                                <FormLabel pl={1}>Clinic Name</FormLabel>
                                <Input
                                    type="text"
                                    value={clinicName}
                                    onChange={(e) => setClinicName(e.target.value)}
                                    placeholder="Enter Clinic Name"
                                    required
                                />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel pl={1}>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email"
                                    required
                                />
                            </FormControl>
                            <FormControl id="address" isRequired>
                                <FormLabel pl={1}>Address</FormLabel>
                                <Input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter address"
                                    required
                                />
                            </FormControl>
                            <HStack>
                                <FormControl id="city" flex={1} isRequired>
                                    <FormLabel pl={1}>City</FormLabel>
                                    <Select
                                        name="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder={'Select city'}
                                        required
                                    >
                                        {Object.values(VietnamCities).sort((a, b) => a.localeCompare(b)).map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl id="phone" flex={1} isRequired>
                                    <FormLabel pl={1}>Phone Number</FormLabel>
                                    <Input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl id="websiteUrl">
                                <FormLabel pl={1}>Website Url</FormLabel>
                                <Input
                                    type="url"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                    placeholder="Enter website url"
                                />
                            </FormControl>
                            <FormControl id="description" isRequired>
                                <FormLabel pl={1}>Description</FormLabel>
                                <Textarea
                                    value={description}
                                    placeholder="Enter description"
                                    focusBorderColor='#E2E8F0'
                                    resize={'none'}
                                    maxH={32}
                                    minH={32}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Stack>
                        <Stack gap={3} flex={1}>
                            <FormControl id="workingHour" isRequired>
                                <FormLabel pl={1}>Working Hours</FormLabel>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th w={24}></Th>
                                            <Th textAlign={'center'} w={'264.5px'}>Start Time</Th>
                                            <Th textAlign={'center'} w={'264.5px'}>End Time</Th>
                                            <Th textAlign={'center'} w={'264.5px'}>No Working</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {renderRow(DayInWeek.MONDAY, startTimeMonday, setStartTimeMonday, endTimeMonday, setEndTimeMonday, isWorkingMonday, setIsWorkingMonday)}
                                        {renderRow(DayInWeek.TUESDAY, startTimeTuesday, setStartTimeTuesday, endTimeTuesday, setEndTimeTuesday, isWorkingTuesday, setIsWorkingTuesday)}
                                        {renderRow(DayInWeek.WEDNESDAY, startTimeWednesday, setStartTimeWednesday, endTimeWednesday, setEndTimeWednesday, isWorkingWednesday, setIsWorkingWednesday)}
                                        {renderRow(DayInWeek.THURSDAY, startTimeThursday, setStartTimeThursday, endTimeThursday, setEndTimeThursday, isWorkingThursday, setIsWorkingThursday)}
                                        {renderRow(DayInWeek.FRIDAY, startTimeFriday, setStartTimeFriday, endTimeFriday, setEndTimeFriday, isWorkingFriday, setIsWorkingFriday)}
                                        {renderRow(DayInWeek.SATURDAY, startTimeSaturday, setStartTimeSaturday, endTimeSaturday, setEndTimeSaturday, isWorkingSaturday, setIsWorkingSaturday)}
                                        {renderRow(DayInWeek.SUNDAY, startTimeSunday, setStartTimeSunday, endTimeSunday, setEndTimeSunday, isWorkingSunday, setIsWorkingSunday)}
                                    </Tbody>
                                </Table>
                            </FormControl>
                        </Stack>
                    </HStack>
                    <HStack
                        pos={'fixed'}
                        w={'99%'}
                        bg={"blue.200"}
                        left={2}
                        right={2}
                        bottom={2}
                        justify={'flex-end'}
                        gap={4}
                    >
                        <Button
                            bg={'white'}
                            border={Border.tableBorder}
                            variant={"solid"}
                            fontSize={15}
                            fontWeight={400}
                            px={2}
                            my={1}
                            h={6}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button
                            colorScheme={"blue"}
                            variant={"solid"}
                            fontSize={15}
                            fontWeight={400}
                            px={2}
                            mr={6}
                            my={1}
                            h={6}
                            onClick={handleUpdate}
                            isDisabled={
                                clinicName === '' ||
                                email === '' ||
                                address === '' ||
                                city === '' ||
                                phone === '' ||
                                description === '' ||
                                logo === '' ||
                                clinicImage === '' ||
                                (isWorkingMonday && (startTimeMonday === '' || endTimeMonday === '')) ||
                                (isWorkingTuesday && (startTimeTuesday === '' || endTimeTuesday === '')) ||
                                (isWorkingWednesday && (startTimeWednesday === '' || endTimeWednesday === '')) ||
                                (isWorkingThursday && (startTimeThursday === '' || endTimeThursday === '')) ||
                                (isWorkingFriday && (startTimeFriday === '' || endTimeFriday === '')) ||
                                (isWorkingSaturday && (startTimeSaturday === '' || endTimeSaturday === '')) ||
                                (isWorkingSunday && (startTimeSunday === '' || endTimeSunday === ''))
                            }
                        >
                            Save
                        </Button>
                    </HStack>
                    <LoadingModal
                        isOpen={isOpenLoading}
                        onClose={onCloseLoading}
                    />
                </Stack>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default UpdateDentalDetailPage