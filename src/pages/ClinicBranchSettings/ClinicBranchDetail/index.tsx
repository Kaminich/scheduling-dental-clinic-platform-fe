import { Button, FormControl, FormLabel, HStack, Input, Stack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { useNavigate, useParams } from "react-router";
import { ApiResponse } from "../../../types/ApiResponse";
import BranchDetailResponse, { initialBranchDetailResponse } from "../../../types/BranchDetailResponse";
import { FaPenToSquare } from "react-icons/fa6";
import Loading from "../../../components/loading";

const ClinicBranchDetailPage = () => {
    const [branch, setBranch] = useState<BranchDetailResponse>(initialBranchDetailResponse);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();
    const param = useParams<{ id: string }>();
    const navigate = useNavigate();

    const getBranchDetailById = async (id: number) => {
        setIsLoading(true);
        try {
            const api = new ApiClient<ApiResponse<BranchDetailResponse>>('/branch');
            const response = await api.getDetail(id);
            console.log(response);
            if (response.success) {
                setBranch(response.data);
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
        changeTabTitle(branch.branchName);
    }, [branch.branchName]);

    useEffect(() => {
        if (param.id) {
            getBranchDetailById(parseInt(param.id));
        }
    }, [param.id])

    return (
        <>
            {!isLoading ? (
                <Stack w={'2xl'} m={'auto'}>
                    <HStack pos={'fixed'} top={128} right={20} mt={-4}>
                        <Button leftIcon={<FaPenToSquare />} colorScheme="blue" onClick={() => navigate('update')}>Edit</Button>
                    </HStack>
                    <Stack gap={2} minW={'lg'} mb={10}>
                        <FormControl id="branchName" flex={2}>
                            <FormLabel pl={1}>Branch Name</FormLabel>
                            <Input
                                value={branch.branchName}
                                readOnly
                            />
                        </FormControl>
                        <FormControl id="address" flex={2}>
                            <FormLabel pl={1}>Address</FormLabel>
                            <Input
                                value={branch.address}
                                readOnly
                            />
                        </FormControl>
                        <HStack>
                            <FormControl id="city" flex={1}>
                                <FormLabel pl={1}>City</FormLabel>
                                <Input
                                    value={branch.city}
                                    readOnly
                                />
                            </FormControl>
                            <FormControl id="phone" flex={1.5}>
                                <FormLabel pl={1}>Phone Number</FormLabel>
                                <Input
                                    value={branch.phone}
                                    readOnly
                                />
                            </FormControl>
                        </HStack>
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

export default ClinicBranchDetailPage