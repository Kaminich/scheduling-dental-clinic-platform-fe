import { Button, FormControl, FormLabel, HStack, Input, InputGroup, InputRightAddon, Select, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react";
import ApiClient from "../../../services/apiClient";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { Border } from "../../../styles/styles";
import useUserProfile from "../../../hooks/useUserProfile";
import useCategoryByClinicId from "../../../hooks/useCategoryByClinicId";
import CategoryViewListResponse from "../../../types/CategoryViewListResponse";
import LoadingModal from "../../../components/modal/loading";
import { trimAll } from "../../../utils/trimAll";

const CreateServicePage = () => {
    const [serviceName, setServiceName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [unitOfPrice, setUnitOfPrice] = useState<string>('');
    const [serviceType, setServiceType] = useState<string>('');
    const [minimumPrice, setMinimumPrice] = useState<number | string>('');
    const [maximumPrice, setMaximumPrice] = useState<number | string>('');
    const [duration, setDuration] = useState<number | string>('');
    const [categoryId, setCategoryId] = useState<number>(0);
    const [categories, setCategories] = useState<CategoryViewListResponse[]>([]);
    const toast = useToast();
    const { data: userData } = useUserProfile();
    const { data: categoryData } = useCategoryByClinicId({ clinicId: userData?.clinicId });
    const { isOpen: isOpenLoading, onClose: onCloseLoading, onOpen: onOpenLoading } = useDisclosure();

    const api = new ApiClient<any>('/service');

    const areAllFieldsFilled = () => {
        return (
            serviceName.trim() !== '' &&
            description.trim() !== '' &&
            unitOfPrice.trim() !== '' &&
            serviceType.trim() !== '' &&
            minimumPrice !== undefined &&
            maximumPrice !== undefined &&
            duration !== undefined &&
            categoryId !== 0
        );
    };

    const handleReset = () => {
        setServiceName('');
        setDescription('');
        setUnitOfPrice('');
        setMaximumPrice('');
        setDuration('');
        setCategoryId(0);
        setMinimumPrice('');
        setServiceType('');
    }

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        onOpenLoading();
        const data = {
            serviceName: trimAll(serviceName),
            description: description.trim(),
            unitOfPrice: trimAll(unitOfPrice),
            minimumPrice,
            maximumPrice,
            duration,
            serviceType: trimAll(serviceType),
            categoryId
        };

        try {
            const response = await api.create(data);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                handleReset();
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
    };

    useEffect(() => {
        changeTabTitle('Create Service');
    }, []);

    useEffect(() => {
        if (categoryData) {
            setCategories(categoryData);
        }
    }, [categoryData]);

    return (
        <Stack w={'2xl'} m={'auto'}>
            <Stack gap={2} minW={'lg'} mb={10}>
                <FormControl id="serviceName" isRequired>
                    <FormLabel pl={1}>Service Name</FormLabel>
                    <Input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="Enter service name"
                        required
                    />
                </FormControl>
                <FormControl id="description" isRequired>
                    <FormLabel pl={1}>Description</FormLabel>
                    <Textarea
                        value={description}
                        placeholder="Describe dentist description"
                        focusBorderColor='#E2E8F0'
                        resize={'none'}
                        maxH={32}
                        minH={32}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl id="category" isRequired>
                    <FormLabel pl={1}>Category</FormLabel>
                    <Select
                        name="category"
                        value={categoryId}
                        onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        placeholder={'Select category'}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <HStack>
                    <FormControl id="unit" flex={1} isRequired>
                        <FormLabel pl={1}>Unit</FormLabel>
                        <Input
                            type="text"
                            value={unitOfPrice}
                            onChange={(e) => setUnitOfPrice(e.target.value)}
                            placeholder="Enter unit"
                            required
                        />
                    </FormControl>
                    <FormControl id="minimumPrice" flex={1} isRequired>
                        <FormLabel pl={1}>Minimum Price</FormLabel>
                        <InputGroup>
                            <Input
                                type="number"
                                value={minimumPrice}
                                onChange={(e) => setMinimumPrice(parseInt(e.target.value))}
                                placeholder="Enter min price"
                                required
                            />
                            <InputRightAddon>VND</InputRightAddon>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="maximumPrice" flex={1} isRequired>
                        <FormLabel pl={1}>Maximum Price</FormLabel>
                        <InputGroup>
                            <Input
                                type="number"
                                value={maximumPrice}
                                onChange={(e) => setMaximumPrice(parseInt(e.target.value))}
                                placeholder="Enter max price"
                                required
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
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                placeholder="Enter duration"
                                required
                            />
                            <InputRightAddon px={2}>Minute(s)</InputRightAddon>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="serviceType" flex={2} isRequired>
                        <FormLabel pl={1}>Service Type</FormLabel>
                        <Input
                            type="text"
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            placeholder="Enter service type"
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
                    onClick={handleCreate}
                    isDisabled={!areAllFieldsFilled()}
                >
                    Create
                </Button>
            </HStack>
            <LoadingModal
                isOpen={isOpenLoading}
                onClose={onCloseLoading}
            />
        </Stack>
    )
}

export default CreateServicePage