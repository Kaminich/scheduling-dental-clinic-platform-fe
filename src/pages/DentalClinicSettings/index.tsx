import { Button, Card, CardBody, CardFooter, Heading, HStack, Image, Link, Stack, Tag, TagLabel, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";
import { Color, Shadow } from "../../styles/styles";
import { useNavigate } from "react-router";
import useUserProfile from "../../hooks/useUserProfile";
import useClinicDetail from "../../hooks/useClinicDetail";
import { useEffect, useState } from "react";
import ClinicDetailResponse, { initialClinicDetailResponse } from "../../types/ClinicDetailResponse";
import ApiClient from "../../services/apiClient";
import DeleteModal from "../../components/modal/delete";
import ActivateModal from "../../components/modal/activate";
import { changeTabTitle } from "../../utils/changeTabTitle";

const DentalClinicSettings = () => {
    const navigate = useNavigate();
    const { data: userData } = useUserProfile();
    const { data: clinicData, refetch } = useClinicDetail({ clinicId: userData?.clinicId });
    const [clinic, setClinic] = useState<ClinicDetailResponse>(initialClinicDetailResponse);
    const { isOpen: isOpenDeactivate, onClose: onCloseDeactivate, onOpen: onOpenDeactivate } = useDisclosure();
    const { isOpen: isOpenActivate, onClose: onCloseActivate, onOpen: onOpenActivate } = useDisclosure();
    const toast = useToast();
    const [id, setId] = useState<number>(0);

    const handleActivate = async () => {
        try {
            const api = new ApiClient<any>(`/clinics/re-activate`);
            const response = await api.updateWithId(id);
            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                refetch && refetch();
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
            onCloseActivate();
        }
    }

    const handleDeactivate = async () => {
        try {
            const api = new ApiClient<any>(`/clinics`);
            const response = await api.delete(id);
            console.log(response);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                refetch && refetch();
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
            onCloseDeactivate();
        }
    }

    useEffect(() => {
        changeTabTitle('Dental Clinic Settings');
    }, []);

    useEffect(() => {
        if (clinicData) {
            setClinic(clinicData);
        }
    }, [clinicData])

    console.log(clinic);


    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <Stack gap={6} w={'full'} >
                <Card shadow={Shadow.cardShadow} bg={Color.blue_100}>
                    <CardBody>
                        <HStack justify={'flex-end'}>
                            {clinic.status === 'ACTIVE' && (
                                <Button
                                    colorScheme="red"
                                    onClick={() => {
                                        onOpenDeactivate();
                                        setId(clinic.id);
                                    }}
                                >
                                    Deactivate
                                </Button>
                            )}
                            {clinic.status === 'INACTIVE' && (
                                <Button
                                    colorScheme="green"
                                    onClick={() => {
                                        onOpenActivate();
                                        setId(clinic.id);
                                    }}
                                >
                                    Activate
                                </Button>
                            )}
                        </HStack>
                        <Stack w={'full'} align={'center'} gap={4} mb={12}>
                            <Image
                                border='1px solid gainsboro'
                                borderRadius='full'
                                boxSize={'9rem'}
                                src={
                                    clinic.logo || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                }
                                alt='avatar'
                                bgColor='white'
                                objectFit={'cover'}
                            />
                            <Heading fontSize={32} fontWeight={600}>{clinic.clinicName}</Heading>
                        </Stack>
                        <HStack w={'5xl'} m={'auto'} align={'flex-start'}>
                            <Stack flex={1}>
                                <Text>Phone Number: {clinic.phone}</Text>
                                <Text>Email: {clinic.email}</Text>
                                <Text>Address: {clinic.address}</Text>
                                <Text>City: {clinic.city}</Text>
                                <HStack>
                                    <Text>Website Url:</Text>
                                    {clinic.websiteUrl ? (
                                        <Link href={clinic.websiteUrl} isExternal>{clinic.websiteUrl}</Link>
                                    ) : (
                                        <Text>-</Text>
                                    )}
                                </HStack>
                            </Stack>
                            <Stack flex={1}>
                                <Text>Created Date: {clinic.createdDate}</Text>
                                <Text>Modified Date: {clinic.modifiedDate}</Text>
                                {clinic.status === 'ACTIVE' && (
                                    <HStack>
                                        <Text>Status:</Text>
                                        <Tag colorScheme="green">
                                            <TagLabel>ACTIVE</TagLabel>
                                        </Tag>
                                    </HStack>
                                )}
                                {clinic.status === 'INACTIVE' && (
                                    <HStack>
                                        <Text>Status:</Text>
                                        <Tag colorScheme="red">
                                            <TagLabel>INACTIVE</TagLabel>
                                        </Tag>
                                    </HStack>
                                )}
                            </Stack>
                        </HStack>
                    </CardBody>
                    <CardFooter>
                        <HStack justify={'flex-end'} w={'full'}>
                            <Button
                                gap={4}
                                onClick={() => navigate('dental-detail')}
                            >
                                More Detail <FaArrowRight />
                            </Button>
                        </HStack>
                    </CardFooter>
                </Card>
            </Stack>
            <DeleteModal
                isOpen={isOpenDeactivate}
                onClose={onCloseDeactivate}
                type={'clinic'}
                handleDeactivate={handleDeactivate}
            />
            <ActivateModal
                isOpen={isOpenActivate}
                onClose={onCloseActivate}
                type={'clinic'}
                handleActivate={handleActivate}
            />
        </Stack>
    )
}

export default DentalClinicSettings