import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    useToast,
} from '@chakra-ui/react';
import { changeTabTitle } from '../../../utils/changeTabTitle';

const CreateBlogPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.[0] || null);

    const validateForm = () => {
        if (!title || !content || !image) {
            toast({
                title: "Validation Error",
                description: "All fields are required.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // Simulate an API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log({ title, content, image });
            toast({
                title: "Blog created.",
                description: "Your blog post has been successfully created.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Unable to create blog post.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        changeTabTitle('Create Blog');
    }, []);

    return (
        <Box p={8} maxWidth="600px" mx="auto">
            <Stack spacing={4}>
                <FormControl isInvalid={!title}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id="title"
                        placeholder="Enter the blog title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </FormControl>
                <FormControl isInvalid={!content}>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <Textarea
                        id="content"
                        placeholder="Enter the blog content"
                        value={content}
                        onChange={handleContentChange}
                    />
                </FormControl>
                <FormControl isInvalid={!image}>
                    <FormLabel htmlFor="image">Image</FormLabel>
                    <Input
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                    />
                </FormControl>
                <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                    Create Blog
                </Button>
            </Stack>
        </Box>
    );
};

export default CreateBlogPage;
