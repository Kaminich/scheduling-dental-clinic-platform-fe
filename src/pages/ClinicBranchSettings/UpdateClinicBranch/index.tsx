import { Button, FormControl, FormLabel, HStack, Input, Select, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { Border } from "../../../styles/styles";
import { useNavigate, useParams } from "react-router";
import { ApiResponse } from "../../../types/ApiResponse";
import BranchDetailResponse, { initialBranchDetailResponse } from "../../../types/BranchDetailResponse";
import Loading from "../../../components/loading";
import LoadingModal from "../../../components/modal/loading";

const UpdateClinicBranchPage = () => {
    const [branchName, setBranchName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [branch, setBranch] = useState<BranchDetailResponse>(initialBranchDetailResponse);
    const toast = useToast();
    const param = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpen, onClose, onOpen } = useDisclosure();

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

    const api = new ApiClient<any>('/branch');

    const areAllFieldsFilled = () => {
        return (
            branchName !== '' &&
            city !== '' &&
            phone !== '' &&
            address !== ''
        );
    };

    const handleReset = () => {
        setBranchName(branch.branchName);
        setCity(branch.city);
        setPhone(branch.phone);
        setAddress(branch.address);
    }

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        onOpen();
        const data = {
            id: branch.branchId,
            branchName,
            city,
            phone,
            address,
        };

        try {
            const response = await api.update(data);
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
            onClose();
        }
    };

    useEffect(() => {
        changeTabTitle('Update Clinic Branch');
    }, []);

    useEffect(() => {
        if (param.id) {
            getBranchDetailById(parseInt(param.id));
        }
    }, [param.id])

    useEffect(() => {
        handleReset();
    }, [branch])

    return (
        <>
            {!isLoading ? (
                <Stack w={'2xl'} m={'auto'}>
                    <Stack gap={2} minW={'lg'} mb={10}>
                        <FormControl id="branchName" flex={2} isRequired>
                            <FormLabel pl={1}>Branch Name</FormLabel>
                            <Input
                                type="text"
                                value={branchName}
                                onChange={(e) => setBranchName(e.target.value)}
                                placeholder="Enter branch name"
                                required
                            />
                        </FormControl>
                        <FormControl id="address" flex={2} isRequired>
                            <FormLabel pl={1}>Address</FormLabel>
                            <Input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address"
                                required
                            />
                        </FormControl>
                        <HStack>
                            <FormControl id="city" flex={1} isRequired>
                                <FormLabel pl={1}>City</FormLabel>
                                <Select
                                    name="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder={'Select city'}
                                >
                                    <option value="Male">
                                        Male
                                    </option>
                                    <option value="Female">
                                        Female
                                    </option>
                                    <option value="Other">
                                        Other
                                    </option>
                                </Select>
                            </FormControl>
                            <FormControl id="phone" flex={1.5} isRequired>
                                <FormLabel pl={1}>Phone Number</FormLabel>
                                <Input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </FormControl>
                        </HStack>
                    </Stack>
                    <HStack
                        pos={'fixed'}
                        w={'99%'}
                        bg={"blue.200"}
                        left={2}
                        right={2}
                        bottom={2}
                        justify={'flex-end'}
                        gap={4}
                    >
                        <Button
                            bg={'white'}
                            border={Border.tableBorder}
                            variant={"solid"}
                            fontSize={15}
                            fontWeight={400}
                            px={2}
                            my={1}
                            h={6}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button
                            colorScheme={"blue"}
                            variant={"solid"}
                            fontSize={15}
                            fontWeight={400}
                            px={2}
                            mr={6}
                            my={1}
                            h={6}
                            onClick={handleUpdate}
                            isDisabled={!areAllFieldsFilled()}
                        >
                            Save
                        </Button>
                    </HStack>
                    <LoadingModal
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

export default UpdateClinicBranchPage