import { Box, Button, Card, CardBody, CardFooter, Flex, HStack, Image, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import AppointmentModal from "../../components/modal/appointment"
import { Color, Shadow } from "../../styles/styles";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useDentists from "../../hooks/useDentists";
import Dentist from "../../types/Dentist";
import ApiClient from "../../services/apiClient";
import DentistCarousel from "../../components/carousel/dentist";
import DentistDetailResponse, { initialDentistDetailResponse } from "../../types/DentistDetailResponse";

const DentistDetailPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { role } = useAuth();

    const { name } = useParams<{ name: string }>();
    const decodedName = name ? name.replace(/-/g, ' ') : '';
    const [id, setId] = useState<number>(0);
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

    useEffect(() => {
        changeTabTitle(decodedName);
    }, []);

    useEffect(() => {
        if (data?.content) {
            const foundDentist = data.content.find((dentist: Dentist) => dentist.fullName === decodedName);
            if (foundDentist) {
                setId(foundDentist.dentistId);
            }
        }
    }, [data?.content]);

    useEffect(() => {
        if (id) {
            getDentistDetail();
        }
    }, [id]);

    return (
        <>
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
                                "https://bit.ly/sage-adebayo"
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
                                                <Text>{dentist.branchName}</Text>
                                            </Box>
                                            <Box gap={2}>
                                                <Text fontWeight={'bold'}>Branch: </Text>
                                                <Text>{dentist.address}</Text>
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
                                <Button colorScheme="green" onClick={onOpen}>Make Appointment</Button>
                            </CardFooter>
                        )}
                    </Card>
                </Flex>
                <Stack mt={12} mb={4}>
                    <Text
                        maxW={'lg'}
                        fontSize={20}
                        pl={4}
                        py={1}
                        mb={4}
                        fontWeight={500}
                        borderRadius={'full'}
                        bgGradient={Color.headingGradientMd}
                    >
                        Medical Team from {dentist.branchName} Branch
                    </Text>
                    <DentistCarousel branchId={dentist.id} />
                </Stack>
            </Stack>
            <AppointmentModal
                dentalData={''}
                dentistData={''}
                isOpen={isOpen}
                locationData={''}
                onClose={onClose}
            />
        </>
    )
}

export default DentistDetailPage