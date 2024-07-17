import { useState, FormEvent, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    useToast,
    useDisclosure,
    HStack,
    Image,
} from '@chakra-ui/react';
import { changeTabTitle } from '../../../utils/changeTabTitle';
import axios from 'axios';
import ApiClient from '../../../services/apiClient';
import LoadingModal from '../../../components/modal/loading';
import { Border } from '../../../styles/styles';
import { FaCamera } from 'react-icons/fa6';
import { useParams } from 'react-router';
import useBlogDetail from '../../../hooks/useBlogDetail';
import BlogDetailResponse, { initialBlogDetailResponse } from '../../../types/BlogDetailResponse';

const UpdateBlogPage = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [imageData, setImageData] = useState<File | null>(null);
    const [summary, setSummary] = useState<string>('');
    const [blog, setBlog] = useState<BlogDetailResponse>(initialBlogDetailResponse);
    const { blogId } = useParams<{ blogId: string }>();
    const { data } = useBlogDetail({ blogId: parseInt(blogId || '0') });
    const { isOpen: isOpenLoading, onClose: onCloseLoading, onOpen: onOpenLoading } = useDisclosure();
    const toast = useToast();

    const areAllFieldsFilled = () => {
        return (
            content !== '' &&
            title !== '' &&
            summary !== '' &&
            image !== ''
        );
    };

    const handleReset = () => {
        setTitle(blog.title);
        setContent(blog.content);
        setSummary(blog.summary);
        setImage(blog.thumbnail);
        setImageData(null);
    }

    const handleImageChange = (e: any) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = URL.createObjectURL(selectedFile);
                setImage(imageUrl);
            };
            reader.readAsDataURL(selectedFile);
            setImageData(selectedFile);
        }
    }

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        const api = new ApiClient<any>('/blog');
        onOpenLoading();
        let imageUrl: string = '';

        if (imageData) {
            const formDataImage = new FormData();
            formDataImage.append("file", imageData);
            formDataImage.append("upload_preset", "z5r1wkcn");

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dy1t2fqsc/image/upload`,
                    formDataImage
                );
                imageUrl = response.data.secure_url;
            } catch (error) {
                console.error(error);
            }
        }

        const data = {
            id: blog.id,
            content,
            title,
            thumbnail: imageUrl,
            summary
        };

        try {
            const response = await api.update(data);

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
        changeTabTitle('Update Blog');
    }, []);

    useEffect(() => {
        if (data) {
            setBlog(data);
        }
    }, [data]);

    useEffect(() => {
        handleReset();
    }, [blog])

    return (
        <Box p={8} w="4xl" mx="auto">
            <Stack spacing={4}>
                <FormControl id="title" isRequired>
                    <FormLabel pl={1}>Title</FormLabel>
                    <Input
                        type='text'
                        placeholder="Enter the blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormControl>
                <Stack w={'full'} pos={'relative'}>
                    <Image
                        alt={"Slider Image"}
                        h={'50vh'}
                        borderRadius={10}
                        p={0}
                        src={
                            image || "https://benhviencuadong.vn/wp-content/uploads/2022/08/kham-nha-khoa-3.jpg"
                        }
                    />
                    <FormLabel
                        htmlFor="img"
                        cursor='pointer'
                        fontSize='md'
                        pos={'absolute'}
                        right={3}
                        bottom={3}
                        display={'flex'}
                        gap={3}
                        alignItems={'center'}
                        py={2}
                        px={4}
                        borderRadius={8}
                        bg={'gainsboro'}
                        _hover={{ bg: 'gray.300' }}
                    >
                        <FaCamera /> Update Image
                    </FormLabel>
                    <Input
                        type="file"
                        id="img"
                        accept="image/*"
                        onChange={handleImageChange}
                        display='none'
                    />
                </Stack>
                <FormControl id="summary" isRequired>
                    <FormLabel pl={1}>Summary</FormLabel>
                    <Textarea
                        placeholder="Enter the blog summary"
                        value={content}
                        focusBorderColor='#E2E8F0'
                        resize={'none'}
                        maxH={32}
                        minH={32}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl id="content" isRequired>
                    <FormLabel pl={1}>Content</FormLabel>
                    <Textarea
                        value={content}
                        placeholder="Enter the blog content"
                        focusBorderColor='#E2E8F0'
                        resize={'none'}
                        maxH={32}
                        minH={32}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </FormControl>
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
                        Update
                    </Button>
                </HStack>
                <LoadingModal
                    isOpen={isOpenLoading}
                    onClose={onCloseLoading}
                />
            </Stack>
        </Box>
    );
};

export default UpdateBlogPage;
