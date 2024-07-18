import { Button, FormControl, FormLabel, HStack, Heading, Image, Input, Stack, Textarea, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import ApiClient from "../../../services/apiClient";
import { ApiResponse } from "../../../types/ApiResponse";
import DentistDetailResponse, { initialDentistDetailResponse } from "../../../types/DentistDetailResponse";
import { formatDate } from "../../../utils/formatDate";
import { FaPenToSquare } from "react-icons/fa6";
import Loading from "../../../components/loading";
import { useAuth } from "../../../hooks/useAuth";
import NotFoundPage from "../../NotFound";
import { Status } from "../../../types/type.enum";

const DentistProfileDetailPage = () => {
    const [dentist, setDentist] = useState<DentistDetailResponse>(initialDentistDetailResponse);
    const param = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { role } = useAuth();

    if (role !== 'Admin' && role !== 'Owner') {
        return <NotFoundPage />
    }

    const getDentistDetailById = async (id: number) => {
        setIsLoading(true);
        try {
            const api = new ApiClient<ApiResponse<DentistDetailResponse>>('/dentists');
            const response = await api.getDetail(id);
            if (response.success) {
                setDentist(response.data);
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
        } catch (error) {
            navigate('/not-found');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        changeTabTitle(dentist.fullName);
    }, [dentist.fullName]);

    useEffect(() => {
        if (param.id) {
            getDentistDetailById(parseInt(param.id));
        }
    }, [param.id]);

    return (
        <>
            {!isLoading ? (
                <Stack w={'6xl'} m={'auto'}>
                    {(role === 'Owner' && dentist.status !== Status.PENDING) && (
                        <HStack pos={'fixed'} right={20} mt={-4}>
                            <Button leftIcon={<FaPenToSquare />} colorScheme="blue" onClick={() => navigate('update')}>Edit</Button>
                        </HStack>
                    )}
                    <HStack gap={20} align={'flex-start'}>
                        <Stack gap={3} flex={1}>
                            <Heading fontSize={24} fontWeight={600} mb={4}>Personal Information</Heading>
                            <HStack w={'full'} justify={'center'} align={'flex-end'}>
                                <Image
                                    border='1px solid gainsboro'
                                    borderRadius='full'
                                    boxSize={'9rem'}
                                    src={
                                        dentist.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                    }
                                    alt='avatar'
                                    bgColor='white'
                                    objectFit={'cover'}
                                />
                            </HStack>
                            <HStack>
                                <FormControl id="fullName" flex={2}>
                                    <FormLabel pl={1}>Full Name</FormLabel>
                                    <Input
                                        value={dentist.fullName}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl id="gender" flex={1}>
                                    <FormLabel pl={1}>Gender</FormLabel>
                                    <Input
                                        value={dentist.gender}
                                        readOnly
                                    />
                                </FormControl>
                            </HStack>
                            <HStack>
                                <FormControl id="dob" flex={1}>
                                    <FormLabel pl={1}>Date of Birth</FormLabel>
                                    <Input
                                        value={formatDate(dentist.dob)}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl id="phone" flex={1.5}>
                                    <FormLabel pl={1}>Phone Number</FormLabel>
                                    <Input
                                        value={dentist.phone}
                                        readOnly
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl id="email" flex={1.7}>
                                <FormLabel pl={1}>Email</FormLabel>
                                <Input
                                    value={dentist.email}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="address" flex={2}>
                                <FormLabel pl={1}>Address</FormLabel>
                                <Input
                                    value={dentist.address}
                                    readOnly
                                />
                            </FormControl>
                        </Stack>
                        <Stack gap={3} flex={1}>
                            <Heading fontSize={24} fontWeight={600}>Medical Information</Heading>
                            <FormControl id="description">
                                <FormLabel pl={1}>Description</FormLabel>
                                <Textarea
                                    value={dentist.description}
                                    focusBorderColor='#E2E8F0'
                                    resize={'none'}
                                    maxH={32}
                                    minH={32}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="branch">
                                <FormLabel pl={1}>Branch</FormLabel>
                                <Input
                                    value={`${dentist.branchName} (${dentist.city})`}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="specialty">
                                <FormLabel pl={1}>Specialty</FormLabel>
                                <Input
                                    value={dentist.specialty}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="experience">
                                <FormLabel pl={1}>Experience</FormLabel>
                                <Textarea
                                    value={dentist.experience}
                                    focusBorderColor='#E2E8F0'
                                    resize={'none'}
                                    maxH={32}
                                    minH={32}
                                    readOnly
                                />
                            </FormControl>
                        </Stack>
                    </HStack>
                </Stack>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default DentistProfileDetailPage