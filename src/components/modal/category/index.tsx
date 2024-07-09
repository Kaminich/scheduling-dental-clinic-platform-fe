import { Button, FormControl, FormLabel, HStack, Image, Input, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, UnorderedList, useToast } from "@chakra-ui/react";
import ApiClient from "../../../services/apiClient";
import { Border } from "../../../styles/styles";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import CategoryViewResponse, { initialCategoryViewResponse } from "../../../types/CategoryViewResponse";
import axios from "axios";
import Loading from "../../loading";
import { QueryObserverResult } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id?: number;
    type: string;
    refetch: () => Promise<QueryObserverResult<any, Error>>;
}

const CategoryModal = ({ isOpen, onClose, id, type, refetch }: Props) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryImage, setCategoryImage] = useState<string>('');
    const [categoryNameUpdate, setCategoryNameUpdate] = useState<string>('');
    const [categoryImageUpdate, setCategoryImageUpdate] = useState<string>('');
    const [categoryImageData, setCategoryImageData] = useState<File | null>(null);
    const [category, setCategory] = useState<CategoryViewResponse>(initialCategoryViewResponse);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useToast();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        console.log(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = URL.createObjectURL(selectedFile);
                if (type === 'create') {
                    setCategoryImage(imageUrl);
                } else {
                    setCategoryImageUpdate(imageUrl);
                }
            };
            reader.readAsDataURL(selectedFile);
            setCategoryImageData(selectedFile);
        }
    }

    const getCategoryDetail = async (id: number) => {
        const api = new ApiClient<any>(`/category`);
        try {
            const response = await api.getDetail(id);
            if (response.success) {
                setCategory(response.data)
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
        }
    }

    const getUpdateInfo = () => {
        setCategoryNameUpdate(category.categoryName);
        setCategoryImageUpdate(category.categoryImage);
    }

    const handleClick = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        let imageUrl: string = '';

        if (categoryImageData) {
            const formDataImage = new FormData();
            formDataImage.append("file", categoryImageData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                imageUrl = response.data.secure_url;
                console.log("Cloudinary image URL:", imageUrl);
            } catch (error) {
                console.error(error);
            }
        }

        if (type === 'update' && id !== undefined) {
            const data = {
                categoryId: id,
                categoryName: categoryNameUpdate,
                categoryImage: imageUrl === '' ? categoryImageUpdate : imageUrl,
                categoryStatus: category.status
            }
            try {
                const api = new ApiClient<any>(`/category`);
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
                onClose();
                setIsLoading(false);
            }
        } else if (type === 'create') {
            if (imageUrl === '') {
                toast({
                    title: "Error",
                    description: "Failed to upload images or files",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                return;
            }
            const api = new ApiClient<any>(`/category`);
            const data = {
                categoryName,
                categoryImage: imageUrl,
            }
            try {
                const response = await api.create(data);
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
                onClose();
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        if (id) {
            getCategoryDetail(id);
        }
    }, [id])

    useEffect(() => {
        getUpdateInfo();
    }, [category])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={isLoading ? 'md' : 'xl'}
            isCentered
            closeOnEsc={isLoading ? false : true}
            closeOnOverlayClick={isLoading ? false : true}
        >
            <ModalOverlay backdropFilter={'blur(5px)'} />
            {!isLoading ? (
                <ModalContent>
                    {type === 'create' && (
                        <ModalHeader fontSize='xl'>Create Category</ModalHeader>
                    )}
                    {type === 'update' && (
                        <ModalHeader fontSize='xl'>Update Category</ModalHeader>
                    )}
                    {type === 'detail' && (
                        <ModalHeader fontSize='xl'>Category Detail</ModalHeader>
                    )}
                    <ModalCloseButton />
                    <ModalBody pt={6} pb='4rem' borderY={Border.tableBorder}>
                        {(type === 'create') && (
                            <Stack gap={4}>
                                <FormControl id="categoryimage" isRequired>
                                    <FormLabel pl={1}>Category Image</FormLabel>
                                    <HStack w={'full'} justify={'center'} align={'flex-end'} ml={4}>
                                        <Image
                                            border='1px solid gainsboro'
                                            borderRadius={5}
                                            h={32}
                                            w={72}
                                            src={categoryImage || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'}
                                            alt='logo'
                                            bgColor='white'
                                        />
                                        <FormLabel
                                            htmlFor="logo"
                                            cursor='pointer'
                                            fontSize='md'
                                            requiredIndicator
                                        >
                                            <FaPen />
                                        </FormLabel>
                                        <Input
                                            type="file"
                                            id="logo"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            display='none'
                                        />
                                    </HStack>
                                </FormControl>
                                <FormControl id="categoryName" flex={2} isRequired>
                                    <FormLabel pl={1}>Category Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="Enter category name"
                                        required
                                    />
                                </FormControl>
                            </Stack>
                        )}
                        {type === 'update' && (
                            <Stack gap={4}>
                                <FormControl id="categoryimage" isRequired>
                                    <FormLabel pl={1}>Category Image</FormLabel>
                                    <HStack w={'full'} justify={'center'} align={'flex-end'} ml={4}>
                                        <Image
                                            border='1px solid gainsboro'
                                            borderRadius={5}
                                            h={32}
                                            w={72}
                                            src={
                                                categoryImageUpdate || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                            }
                                            alt='logo'
                                            bgColor='white'
                                        />
                                        <FormLabel
                                            htmlFor="logo"
                                            cursor='pointer'
                                            fontSize='md'
                                            requiredIndicator
                                        >
                                            <FaPen />
                                        </FormLabel>
                                        <Input
                                            type="file"
                                            id="logo"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            display='none'
                                        />
                                    </HStack>
                                </FormControl>
                                <FormControl id="categoryName" flex={2} isRequired>
                                    <FormLabel pl={1}>Category Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={categoryNameUpdate}
                                        onChange={(e) => setCategoryNameUpdate(e.target.value)}
                                        placeholder="Enter category name"
                                        required
                                    />
                                </FormControl>
                            </Stack>
                        )}

                        {type === 'detail' && (
                            <Stack gap={4}>
                                <>
                                    <Text>Category Image: </Text>
                                    <Image
                                        border='1px solid gainsboro'
                                        borderRadius={5}
                                        h={32}
                                        w={72}
                                        m={'auto'}
                                        src={
                                            category.categoryImage || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                        }
                                        alt='logo'
                                        bgColor='white'
                                    />
                                </>
                                <HStack gap={4}>
                                    <Text>Category Name: </Text>
                                    <Text>{category.categoryName}</Text>
                                </HStack>
                                <>
                                    <Text>Category Services:</Text>
                                    <UnorderedList pl={4}>
                                        {category.services.map((service) => (
                                            <ListItem>{service.serviceName}</ListItem>
                                        ))}
                                    </UnorderedList>
                                </>
                            </Stack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {type !== 'detail' && (
                            <Button
                                colorScheme='blue'
                                mr={3}
                                onClick={handleClick}
                                isDisabled={
                                    type === 'create' ?
                                        categoryName === '' ||
                                        categoryImage === ''
                                        :
                                        categoryNameUpdate === '' ||
                                        categoryImageUpdate === ''
                                }
                            >
                                {type === 'create' ? 'Create' : 'Save'}
                            </Button>
                        )}
                        <Button onClick={onClose}>{type === 'detail' ? 'Close' : 'Cancel'}</Button>
                    </ModalFooter>
                </ModalContent>
            ) : (
                <ModalContent>
                    <ModalBody p={6}>
                        <Stack h={170}>
                            <Loading />
                        </Stack>
                    </ModalBody>
                </ModalContent>
            )}
        </Modal >
    )
}

export default CategoryModal;