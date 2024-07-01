import { Button, FormControl, FormLabel, HStack, Image, Input, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, UnorderedList, useToast } from "@chakra-ui/react";
import ApiClient from "../../../services/apiClient";
import { Border } from "../../../styles/styles";
import { ChangeEvent, useState } from "react";
import { FaPen } from "react-icons/fa6";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number | null;
    type: string;
}

const CategoryModal = ({ isOpen, onClose, id, type }: Props) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const toast = useToast();
    const [categoryImage, setCategoryImage] = useState<string>('');
    const [categoryImageData, setCategoryImageData] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        console.log(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = URL.createObjectURL(selectedFile);
                setCategoryImage(imageUrl);
            };
            reader.readAsDataURL(selectedFile);
            setCategoryImageData(selectedFile);
        }
    }

    const handleClick = async () => {
        if (type === 'update' && id !== null) {
            try {
                const api = new ApiClient<any>(`/category`);
                const response = await api.update(id);
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
                    onClose();
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
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
                onClose();
            }
        } else if (type === 'detail' && id !== null) {
            const api = new ApiClient<any>(`/category`);
            try {
                const response = await api.getDetail(id);
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
                    onClose();
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
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
                onClose();
            }
        } else if (type === 'create') {
            const api = new ApiClient<any>(`/category`);
            try {
                const response = await api.create(id);
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
                    onClose();
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    onClose();
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
                onClose();
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
            <ModalOverlay backdropFilter={'blur(5px)'} />
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
                    {(type === 'create' || type === 'update') && (
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
                                            categoryImage || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
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
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="Enter category name"
                                    required
                                />
                            </FormControl>
                        </Stack>

                    )}
                    {type === 'detail' && (
                        <Stack>
                            <HStack gap={4}>
                                <Text>Category Name: </Text>
                                <Text>Category Name</Text>
                            </HStack>
                            <Text>Category Services:</Text>
                            <UnorderedList pl={4}>
                                <ListItem>list 1</ListItem>
                                <ListItem>list 1</ListItem>
                                <ListItem>list 1</ListItem>
                                <ListItem>list 1</ListItem>
                            </UnorderedList>
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
                                categoryName === '' ||
                                categoryImage === '' ||
                                categoryImageData === null
                            }
                        >
                            {type === 'create' ? 'Create' : 'Save'}
                        </Button>
                    )}
                    <Button onClick={onClose}>{type === 'detail' ? 'Close' : 'Cancel'}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default CategoryModal;