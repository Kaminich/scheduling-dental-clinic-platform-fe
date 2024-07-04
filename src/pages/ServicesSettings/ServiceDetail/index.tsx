import { Button, FormControl, FormLabel, HStack, Input, InputGroup, InputRightAddon, Stack, Textarea, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import ApiClient from "../../../services/apiClient";
import { ApiResponse } from "../../../types/ApiResponse";
import { FaPenToSquare } from "react-icons/fa6";
import ServiceViewDetailsResponse, { initialServiceViewDetailsResponse } from "../../../types/ServiceViewDetailResponse";

const ServiceDetailPage = () => {
    const [service, setService] = useState<ServiceViewDetailsResponse>(initialServiceViewDetailsResponse);
    const param = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();

    const getServiceDetailById = async (id: number) => {
        try {
            const api = new ApiClient<ApiResponse<ServiceViewDetailsResponse>>('/service');
            const response = await api.getDetail(id);
            console.log(response);
            if (response.success) {
                setService(response.data);
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
        changeTabTitle(service.serviceName);
    }, [service.serviceName]);

    useEffect(() => {
        if (param.id) {
            getServiceDetailById(parseInt(param.id));
        }
    }, [param.id]);

    return (
        <Stack w={'2xl'} m={'auto'}>
            <HStack pos={'fixed'} top={128} right={20} mt={-4}>
                <Button leftIcon={<FaPenToSquare />} colorScheme="blue" onClick={() => navigate('update')}>Edit</Button>
            </HStack>
            <Stack gap={2} minW={'lg'}>
                <FormControl id="serviceName" isRequired>
                    <FormLabel pl={1}>Service Name</FormLabel>
                    <Input
                        value={service.serviceName}
                        readOnly
                    />
                </FormControl>
                <FormControl id="description" isRequired>
                    <FormLabel pl={1}>Description</FormLabel>
                    <Textarea
                        value={service.description}
                        focusBorderColor='#E2E8F0'
                        resize={'none'}
                        maxH={32}
                        minH={32}
                        readOnly
                    />
                </FormControl>
                <FormControl id="category" isRequired>
                    <FormLabel pl={1}>Category</FormLabel>
                    <Input
                        value={service.categoryName}
                        readOnly
                    />
                </FormControl>
                <HStack>
                    <FormControl id="unit" flex={1} isRequired>
                        <FormLabel pl={1}>Unit</FormLabel>
                        <Input
                            value={service.unitOfPrice}
                            readOnly
                        />
                    </FormControl>
                    <FormControl id="minimumPrice" flex={1} isRequired>
                        <FormLabel pl={1}>Minimum Price</FormLabel>
                        <InputGroup>
                            <Input
                                value={service.minimumPrice}
                                readOnly
                            />
                            <InputRightAddon>VND</InputRightAddon>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="maximumPrice" flex={1} isRequired>
                        <FormLabel pl={1}>Maximum Price</FormLabel>
                        <InputGroup>
                            <Input
                                value={service.maximumPrice}
                                readOnly
                            />
                            <InputRightAddon>VND</InputRightAddon>
                        </InputGroup>
                    </FormControl>
                </HStack>
                <HStack>
                    <FormControl id="duration" flex={1} isRequired>
                        <FormLabel pl={1}>Duration</FormLabel>
                        <InputGroup>
                            <Input
                                value={service.duration}
                                readOnly
                            />
                            <InputRightAddon px={2}>Minute(s)</InputRightAddon>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="serviceType" flex={2} isRequired>
                        <FormLabel pl={1}>Service Type</FormLabel>
                        <Input
                            value={service.serviceType}
                            readOnly
                        />
                    </FormControl>
                </HStack>
            </Stack>
        </Stack>
    )
}

export default ServiceDetailPage