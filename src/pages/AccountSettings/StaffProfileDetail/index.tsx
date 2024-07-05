import { Button, FormControl, FormLabel, HStack, Image, Input, Stack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import StaffDetailResponse, { initialStaffDetailResponse } from "../../../types/StaffDetailResponse";
import ApiClient from "../../../services/apiClient";
import { ApiResponse } from "../../../types/ApiResponse";
import { formatDate } from "../../../utils/formatDate";
import { FaPenToSquare } from "react-icons/fa6";

const StaffProfileDetailPage = () => {
    const [staff, setStaff] = useState<StaffDetailResponse>(initialStaffDetailResponse);
    const param = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();

    const getStaffDetailById = async (id: number) => {
        try {
            const api = new ApiClient<ApiResponse<StaffDetailResponse>>('/staff');
            const response = await api.getDetail(id);
            console.log(response);
            if (response.success) {
                setStaff(response.data);
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
        }
    }

    useEffect(() => {
        changeTabTitle(staff.fullName);
    }, [staff.fullName]);

    useEffect(() => {
        if (param.id) {
            getStaffDetailById(parseInt(param.id));
        }
    }, [param.id]);

    return (
        <Stack w={'2xl'} m={'auto'}>
            <HStack pos={'fixed'} top={128} right={20} mt={-4}>
                <Button leftIcon={<FaPenToSquare />} colorScheme="blue" onClick={() => navigate('update')}>Edit</Button>
            </HStack>
            <Stack gap={2} minW={'lg'}>
                <HStack w={'full'} justify={'center'} align={'flex-end'}>
                    <Image
                        border='1px solid gainsboro'
                        borderRadius='full'
                        boxSize={'9rem'}
                        src={
                            staff.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
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
                            value={staff.fullName}
                            readOnly
                        />
                    </FormControl>
                    <FormControl id="gender" flex={1} isRequired>
                        <FormLabel pl={1}>Gender</FormLabel>
                        <Input
                            value={staff.gender}
                            readOnly
                        />
                    </FormControl>
                </HStack>
                <HStack>
                    <FormControl id="dob" flex={1} isRequired>
                        <FormLabel pl={1}>Date of Birth</FormLabel>
                        <Input
                            value={formatDate(staff.dob)}
                            readOnly
                        />
                    </FormControl>
                    <FormControl id="phone" flex={1.5} isRequired>
                        <FormLabel pl={1}>Phone Number</FormLabel>
                        <Input
                            value={staff.phone}
                            readOnly
                        />
                    </FormControl>
                </HStack>
                <FormControl id="email" flex={1.7} isRequired>
                    <FormLabel pl={1}>Email</FormLabel>
                    <Input
                        value={staff.email}
                        readOnly
                    />
                </FormControl>
                <FormControl id="address" flex={2} isRequired>
                    <FormLabel pl={1}>Address</FormLabel>
                    <Input
                        value={staff.address}
                        readOnly
                    />
                </FormControl>
                <FormControl id="branch" flex={1} isRequired>
                    <FormLabel pl={1}>Branch</FormLabel>
                    <Input
                        value={`${staff.clinicBranchName} (${staff.clinicBranchCity})`}
                        readOnly
                    />
                </FormControl>
            </Stack>
        </Stack>
    )
}

export default StaffProfileDetailPage