import { Box, Button, Card, CardBody, CardFooter, Flex, HStack, Image, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import AppointmentModal from "../../components/modal/appointment"
import { Color, Shadow } from "../../styles/styles";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useDentists from "../../hooks/useDentists";
import ApiClient from "../../services/apiClient";
import DentistCarousel from "../../components/carousel/dentist";
import DentistDetailResponse, { initialDentistDetailResponse } from "../../types/DentistDetailResponse";
import DentistListResponse from "../../types/DentistListResponse";
import { FaCalendarDays } from "react-icons/fa6";

const DentistDetailPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { role } = useAuth();
    const { name } = useParams<{ name: string }>();
    const decodedName = name ? name.replace(/-/g, ' ') : '';
    const [id, setId] = useState<number>(0);
    const [dentists, setDentists] = useState<DentistListResponse[]>([]);
    const [dentist, setDentist] = useState<DentistDetailResponse>(initialDentistDetailResponse);
    const { data } = useDentists();
    const api = new ApiClient<any>('/dentists');
    const toast = useToast();

    const getDentistDetail = async () => {
        try {
            const response = await api.getDetail(id);
            console.log(response);

            if (response.success) {
                setDentist(response.data);
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

    const getDentistsByBranchId = async () => {
        try {
            const response = await api.getUnauthen({
                params: {
                    branchId: dentist.branchId
                }
            })
            if (response.success) {
                setDentists(response.data.content)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        changeTabTitle(decodedName);
    }, []);

    useEffect(() => {
        if (data?.content) {
            const foundDentist = data.content.find((dentist: DentistDetailResponse) => dentist.fullName === decodedName);
            if (foundDentist) {
                setId(foundDentist.dentistId);
            }
        }
    }, [data?.content, name]);

    useEffect(() => {
        if (id) {
            getDentistDetail();
        }
    }, [id]);

    useEffect(() => {
        if (dentist.branchId) {
            getDentistsByBranchId();
        }
    }, [dentist.branchId]);

    return (
        <Stack w={"6xl"} mx={'auto'} my={6} gap={6}>
            <Text
                maxW={'sm'}
                fontSize={20}
                pl={4}
                py={1}
                mb={4}
                fontWeight={500}
                borderRadius={'full'}
                bgGradient={Color.headingGradientMd}
            >
                {dentist.fullName}
            </Text>
            <Flex my={2} align={'center'}>
                <Flex flex={1} justify={'center'}>
                    <Image
                        alt={"Dentist avatar"}
                        h={'50vh'}
                        borderRadius={10}
                        p={0}
                        src={
                            dentist.avatar || "https://bit.ly/sage-adebayo"
                        }
                    />
                </Flex>
                <Card flex={1.5} shadow={Shadow.cardShadow}>
                    <CardBody>
                        <Flex gap={10}>
                            <Stack gap={4} flex={1}>
                                <Text fontWeight={'bold'} textAlign={'center'}>Basic Information </Text>
                                <HStack align={'flex-start'} gap={6}>
                                    <Stack flex={1}>
                                        <Flex gap={2}>
                                            <Text fontWeight={'bold'}>Job: </Text>
                                            <Text>{dentist.specialty}</Text>
                                        </Flex>
                                        <Box gap={2}>
                                            <Text fontWeight={'bold'}>Experience: </Text>
                                            <Text>{dentist.experience}</Text>
                                        </Box>
                                        <Box gap={2}>
                                            <Text fontWeight={'bold'}>Clinic: </Text>
                                            <Text>{dentist.clinicName}</Text>
                                        </Box>
                                        <Box gap={2}>
                                            <Text fontWeight={'bold'}>Branch: </Text>
                                            <Text>{dentist.branchName} ({dentist.city})</Text>
                                        </Box>
                                    </Stack>
                                    <Box gap={2} flex={1}>
                                        <Text fontWeight={'bold'}>Description: </Text>
                                        <Text>{dentist.description}</Text>
                                    </Box>
                                </HStack>
                            </Stack>
                        </Flex>
                    </CardBody>
                    {(role !== 'Staff' && role !== 'Dentist') && (
                        <CardFooter>
                            <Button colorScheme={'green'} onClick={onOpen} gap={2}>
                                <FaCalendarDays /> Make Appointment
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </Flex>
            <Stack mt={12} mb={4}>
                <Text
                    maxW={'xl'}
                    fontSize={20}
                    pl={4}
                    py={1}
                    mb={4}
                    fontWeight={500}
                    borderRadius={'full'}
                    bgGradient={Color.headingGradientMd}
                >
                    Medical Team from {dentist.branchName} ({dentist.city})
                </Text>
                <DentistCarousel dentistList={dentists} />
            </Stack>
            <AppointmentModal
                dentistData={dentist}
                isOpen={isOpen}
                onClose={onClose}
            />
        </Stack>
    )
}

export default DentistDetailPage