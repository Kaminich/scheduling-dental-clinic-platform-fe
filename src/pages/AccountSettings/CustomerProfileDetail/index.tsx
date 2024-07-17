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
import CustomerViewResponse, { initialCustomerViewResponse } from "../../../types/CustomerViewResponse";

const CustomerProfileDetailPage = () => {
    const [customer, setCustomer] = useState<CustomerViewResponse>(initialCustomerViewResponse);
    const param = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { role } = useAuth();

    if (role !== 'Admin' && role !== 'Owner') {
        return <NotFoundPage />
    }

    const getCustomerDetailById = async (id: number) => {
        setIsLoading(true);
        try {
            const api = new ApiClient<ApiResponse<CustomerViewResponse>>('/customers');
            const response = await api.getDetail(id);
            console.log(response);
            if (response.success) {
                setCustomer(response.data);
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
        changeTabTitle(customer.fullName);
    }, [customer.fullName]);

    useEffect(() => {
        if (param.id) {
            getCustomerDetailById(parseInt(param.id));
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
                                    customer.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
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
                                    value={customer.fullName}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="gender" flex={1} isRequired>
                                <FormLabel pl={1}>Gender</FormLabel>
                                <Input
                                    value={customer.gender}
                                    readOnly
                                />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl id="dob" flex={1} isRequired>
                                <FormLabel pl={1}>Date of Birth</FormLabel>
                                <Input
                                    value={formatDate(customer.dob)}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="phone" flex={1.5} isRequired>
                                <FormLabel pl={1}>Phone Number</FormLabel>
                                <Input
                                    value={customer.phone}
                                    readOnly
                                />
                            </FormControl>
                        </HStack>
                        <FormControl id="email" flex={1.7} isRequired>
                            <FormLabel pl={1}>Email</FormLabel>
                            <Input
                                value={customer.email}
                                readOnly
                            />
                        </FormControl>
                        <FormControl id="address" flex={2} isRequired>
                            <FormLabel pl={1}>Address</FormLabel>
                            <Input
                                value={customer.address}
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

export default CustomerProfileDetailPage