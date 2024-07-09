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
import ClinicListResponse from "../../types/ClinicListResponse";
import ClinicDetailResponse, { initialClinicDetailResponse } from "../../types/ClinicDetailResponse";
import useActiveClinics from "../../hooks/useActiveClinics";

const DentalDetailPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { name } = useParams<{ name: string }>();
    const decodedName = name ? name.replace(/-/g, ' ') : '';
    const [id, setId] = useState<number>(0);
    const [dentals, setDentals] = useState<ClinicListResponse[]>([]);
    const [clinic, setClinic] = useState<ClinicDetailResponse>(initialClinicDetailResponse);
    const { data } = useActiveClinics();
    const api = new ApiClient<any>('/clinics');
    const { role } = useAuth();
    const toast = useToast();

    const getDentalDetail = async () => {
        try {
            const response = await api.getDetail(id);
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
        }
    }

    useEffect(() => {
        changeTabTitle(decodedName);
    }, []);

    useEffect(() => {
        if (data?.content) {
            const foundDental = data.content.find((clinic: ClinicDetailResponse) => clinic.clinicName === decodedName);
            if (foundDental) {
                setId(foundDental.clinicId);
            }
        }
    }, [data?.content, name]);

    useEffect(() => {
        if (id) {
            getDentalDetail();
        }
    }, [id]);

    return (
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
                        src={clinic.clinicImage}
                        w={36}
                        h={36}
                        bg={'white'}
                        shadow={'lg'}
                    />
                    <Heading fontSize={27}>{clinic.clinicName}</Heading>
                </Flex>
                {(role !== 'Staff' && role !== 'Dentist') && (
                    <Flex justify={'center'} gap={4} mt={8}>
                        <Button colorScheme={'blue'} variant={'outline'}>Chat with Dental</Button>
                        <Button colorScheme={'green'} onClick={onOpen}>Make Appointment</Button>
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
                        <RatingAndFeedback isModal={false} clinicId={id} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {/* <AppointmentModal
                dentalData={''}
                dentistData={''}
                isOpen={isOpen}
                locationData={''}
                onClose={onClose}
            /> */}
        </Stack>
    )
}

export default DentalDetailPage