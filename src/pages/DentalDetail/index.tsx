import { Avatar, Button, Divider, Flex, Heading, Image, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useDisclosure, useToast } from "@chakra-ui/react"
import RatingAndFeedback from "../../components/rating_feedback";
import { Color } from "../../styles/styles";
import DentalAbout from "./components/about";
import DentalDentist from "./components/dentist";
import ServicePrice from "./components/service_price";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import ApiClient from "../../services/apiClient";
import ClinicDetailResponse, { initialClinicDetailResponse } from "../../types/ClinicDetailResponse";
import useActiveClinics from "../../hooks/useActiveClinics";
import AppointmentModal from "../../components/modal/appointment";
import { FaCalendarDays } from "react-icons/fa6";
import Loading from "../../components/loading";
import ClinicListResponse from "../../types/ClinicListResponse";

const DentalDetailPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { name } = useParams<{ name: string }>();
    const decodedName = name ? name.replace(/-/g, ' ') : '';
    const [id, setId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [clinic, setClinic] = useState<ClinicDetailResponse>(initialClinicDetailResponse);
    const { data } = useActiveClinics();
    const { role } = useAuth();
    const toast = useToast();

    const getDentalDetail = async () => {
        setIsLoading(true);
        const api = new ApiClient<any>('/clinics');
        try {
            const response = await api.getDetailUnauthen(id);
            console.log(response);

            if (response.success) {
                setClinic(response.data);
            }
        } catch (error: unknown) {
            toast({
                title: "Error",
                description: "An error has occur",
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
        changeTabTitle(decodedName);
    }, []);

    useEffect(() => {
        if (data) {
            const foundDental = data.content.find((clinic: ClinicListResponse) => clinic.clinicName === decodedName);
            if (foundDental) {
                setId(foundDental.clinicId);
            }
        }
    }, [data, name]);

    useEffect(() => {
        if (id) {
            getDentalDetail();
        }
    }, [id]);

    console.log(clinic);


    return (
        <>
            {!isLoading ? (
                <Stack w={"6xl"} m={'auto'}>
                    <Image
                        alt={"Slider Image"}
                        h={'50vh'}
                        borderRadius={10}
                        p={0}
                        src={
                            clinic.clinicImage || "https://benhviencuadong.vn/wp-content/uploads/2022/08/kham-nha-khoa-3.jpg"
                        }
                    />
                    <Flex alignItems="center" mt={-8} mx={10} justify={'space-between'}>
                        <Flex align={'center'} gap={5}>
                            <Avatar
                                name={clinic.clinicName}
                                src={clinic.logo}
                                w={36}
                                h={36}
                                bg={'white'}
                                shadow={'lg'}
                            />
                            <Heading fontSize={27}>{clinic.clinicName}</Heading>
                        </Flex>
                        {(role !== 'Staff' && role !== 'Dentist') && (
                            <Flex justify={'center'} gap={4} mt={8}>
                                {/* <Button colorScheme={'blue'} variant={'outline'}>Chat with Dental</Button> */}
                                <Button colorScheme={'green'} onClick={onOpen} gap={2}>
                                    <FaCalendarDays /> Make Appointment
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                    <Divider my={4} borderColor={'gray'} />
                    <Tabs variant={'unstyled'}>
                        <TabList>
                            <Tab>About</Tab>
                            <Tab>Dentist</Tab>
                            <Tab>Service and Price list</Tab>
                            <Tab>Rating and Feedback</Tab>
                        </TabList>
                        <TabIndicator mt='-1.5px' height='2px' bg={Color.greenBlue} borderRadius='1px' />
                        <TabPanels mt={6}>
                            <TabPanel>
                                <DentalAbout clinic={clinic} />
                            </TabPanel>
                            <TabPanel>
                                <DentalDentist clinicId={id} />
                            </TabPanel>
                            <TabPanel>
                                <ServicePrice clinicId={id} />
                            </TabPanel>
                            <TabPanel>
                                <RatingAndFeedback clinicId={id} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <AppointmentModal
                        clinicId={id}
                        clinicName={clinic.clinicName}
                        isOpen={isOpen}
                        onClose={onClose}
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

export default DentalDetailPage