import { FormControl, FormLabel, HStack, Image, Input, Stack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import ApiClient from "../../../services/apiClient";
import { ApiResponse } from "../../../types/ApiResponse";
import { formatDate } from "../../../utils/formatDate";
import Loading from "../../../components/loading";
import { useAuth } from "../../../hooks/useAuth";
import NotFoundPage from "../../NotFound";
import { initialOwnerViewResponse, OwnerViewResponse } from "../../../types/OwnerViewResponse";

const OwnerProfileDetailPage = () => {
    const [owner, setOwner] = useState<OwnerViewResponse>(initialOwnerViewResponse);
    const param = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { role } = useAuth();

    if (role !== 'Admin' && role !== 'Owner') {
        return <NotFoundPage />
    }

    const getOwnerDetailById = async (id: number) => {
        setIsLoading(true);
        try {
            const api = new ApiClient<ApiResponse<OwnerViewResponse>>('/owners');
            const response = await api.getDetail(id);
            if (response.success) {
                setOwner(response.data);
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
        changeTabTitle(owner.fullName);
    }, [owner.fullName]);

    useEffect(() => {
        if (param.id) {
            getOwnerDetailById(parseInt(param.id));
        }
    }, [param.id]);

    return (
        <>
            {!isLoading ? (
                <Stack w={'2xl'} m={'auto'}>
                    <Stack gap={2} minW={'lg'}>
                        <HStack w={'full'} justify={'center'} align={'flex-end'}>
                            <Image
                                border='1px solid gainsboro'
                                borderRadius='full'
                                boxSize={'9rem'}
                                src={
                                    owner.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                }
                                alt='avatar'
                                bgColor='white'
                                objectFit={'cover'}
                            />
                        </HStack>
                        <HStack>
                            <FormControl id="fullName" flex={2} isRequired>
                                <FormLabel pl={1}>Full Name</FormLabel>
                                <Input
                                    value={owner.fullName}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="gender" flex={1} isRequired>
                                <FormLabel pl={1}>Gender</FormLabel>
                                <Input
                                    value={owner.gender}
                                    readOnly
                                />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl id="dob" flex={1} isRequired>
                                <FormLabel pl={1}>Date of Birth</FormLabel>
                                <Input
                                    value={formatDate(owner.dob)}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="phone" flex={1.5} isRequired>
                                <FormLabel pl={1}>Phone Number</FormLabel>
                                <Input
                                    value={owner.phone}
                                    readOnly
                                />
                            </FormControl>
                        </HStack>
                        <FormControl id="email" flex={1.7} isRequired>
                            <FormLabel pl={1}>Email</FormLabel>
                            <Input
                                value={owner.email}
                                readOnly
                            />
                        </FormControl>
                        <FormControl id="address" flex={2} isRequired>
                            <FormLabel pl={1}>Address</FormLabel>
                            <Input
                                value={owner.address}
                                readOnly
                            />
                        </FormControl>
                        <FormControl id="clinic" flex={2} isRequired>
                            <FormLabel pl={1}>Dental Clinic</FormLabel>
                            <Input
                                value={owner.address}
                                readOnly
                            />
                        </FormControl>
                    </Stack>
                </Stack>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default OwnerProfileDetailPage