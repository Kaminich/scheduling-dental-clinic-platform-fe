import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, CardFooter, Heading, HStack, Image, Link, Stack, Tag, TagLabel, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { FaArrowRight, FaPenToSquare } from "react-icons/fa6";
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
import { formatDate } from "../../utils/formatDate";
import { formatDateTime } from "../../utils/formatDateTime";
import LoadingModal from "../../components/modal/loading";
import Loading from "../../components/loading";
import { Status } from "../../types/type.enum";

const DentalClinicSettingsPage = () => {
    const navigate = useNavigate();
    const { data: userData } = useUserProfile();
    const { data: clinicData, isLoading, refetch } = useClinicDetail({ clinicId: userData?.clinicId });
    const [clinic, setClinic] = useState<ClinicDetailResponse>(initialClinicDetailResponse);
    const { isOpen: isOpenDeactivate, onClose: onCloseDeactivate, onOpen: onOpenDeactivate } = useDisclosure();
    const { isOpen: isOpenActivate, onClose: onCloseActivate, onOpen: onOpenActivate } = useDisclosure();
    const { isOpen: isOpenLoading, onClose: onCloseLoading, onOpen: onOpenLoading } = useDisclosure();
    const toast = useToast();
    const [id, setId] = useState<number>(0);

    const handleActivate = async () => {
        onCloseActivate();
        onOpenLoading();
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
            onCloseLoading();
        }
    }

    const handleDeactivate = async () => {
        onCloseDeactivate();
        onOpenLoading();
        try {
            const api = new ApiClient<any>(`/clinics`);
            const response = await api.delete(id);

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
            onCloseLoading();
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

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <Stack gap={6} w={'full'}>
                {clinic.status === Status.APPROVED && (
                    <Alert status='info' alignItems={'flex-start'} borderRadius={5}>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Note!</AlertTitle>
                            <AlertDescription>
                                <HStack>
                                    <Text fontSize={16}>Please update all required informations of</Text>
                                    <Text fontSize={16} fontWeight={600}>{clinic.clinicName}</Text>
                                    <Text fontSize={16}>to visible on our platform.</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize={16}>In order to do it, click on</Text>
                                    <HStack>
                                        <Text fontSize={16} fontWeight={600}>More Detail</Text>
                                        <FaArrowRight />
                                    </HStack>
                                    <Text fontSize={16}>&#8594;</Text>
                                    <HStack>
                                        <FaPenToSquare />
                                        <Text fontSize={16} fontWeight={600}>Edit</Text>
                                    </HStack>
                                    <Text fontSize={16}>&#8594;</Text>
                                    <Text fontSize={16} fontWeight={600}>Update all required informations</Text>
                                    <Text fontSize={16}>&#8594;</Text>
                                    <Text fontSize={16} fontWeight={600}>Save</Text>
                                    <Text fontSize={16}>.</Text>
                                </HStack>
                                <HStack>
                                    <Text fontSize={16}>After saving,</Text>
                                    <Text fontSize={16} fontWeight={600}>{clinic.clinicName}</Text>
                                    <Text fontSize={16}>status will change from</Text>
                                    <Tag colorScheme="cyan">
                                        <TagLabel>APPROVED</TagLabel>
                                    </Tag>
                                    <Text fontSize={16}>to</Text>
                                    <Tag colorScheme="green">
                                        <TagLabel>ACTIVE</TagLabel>
                                    </Tag>
                                    <Text fontSize={16}>and it will be visible on our platform.</Text>
                                </HStack>
                            </AlertDescription>
                        </Box>
                    </Alert>
                )}
                <Card shadow={Shadow.cardShadow} bg={Color.blue_100}>
                    {!isLoading ? (
                        <>
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
                                        <Text>Created Date: {formatDate(clinic.createdDate)}</Text>
                                        <Text>Modified Date: {formatDateTime(clinic.modifiedDate)}</Text>
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
                                        {clinic.status === 'APPROVED' && (
                                            <HStack>
                                                <Text>Status:</Text>
                                                <Tag colorScheme="cyan">
                                                    <TagLabel>APPROVED</TagLabel>
                                                </Tag>
                                            </HStack>
                                        )}
                                    </Stack>
                                </HStack>
                            </CardBody>
                            <CardFooter>
                                <HStack justify={'flex-end'} w={'full'}>
                                    <Button
                                        gap={2}
                                        onClick={() => navigate('dental-detail')}
                                    >
                                        More Detail <FaArrowRight />
                                    </Button>
                                </HStack>
                            </CardFooter>
                        </>
                    ) : (
                        <CardBody>
                            <Loading />
                        </CardBody>
                    )}
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
            <LoadingModal
                isOpen={isOpenLoading}
                onClose={onCloseLoading}
            />
        </Stack>
    )
}

export default DentalClinicSettingsPage