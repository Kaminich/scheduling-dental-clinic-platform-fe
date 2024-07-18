import { SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react"
import BlogsItem from "../../components/blogs_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useActiveBlogs from "../../hooks/useActiveBlogs";
import BlogDetailResponse from "../../types/BlogDetailResponse";
import Loading from "../../components/loading";
import { useSearchParams } from "react-router-dom";
import ApiClient from "../../services/apiClient";

const BlogPage = () => {
    const { data, isLoading } = useActiveBlogs();
    const [blogs, setBlogs] = useState<BlogDetailResponse[]>([]);

    const [searchParams] = useSearchParams();
    const toast = useToast();
    const category = searchParams.get('category');
    const keyword = searchParams.get('keyword');

    const handleSearch = async () => {
        const api = new ApiClient<any>('/clinics/search');
        try {
            const response = await api.getUnauthen({
                params: {
                    filter: category,
                    searchValue: keyword
                }
            })
            if (response.success) {
                setBlogs(response.data['Searched Blog'])
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
            console.error(error);
        }
    }

    useEffect(() => {
        if (category && keyword) {
            handleSearch();
        }
    }, [category, keyword]);

    useEffect(() => {
        changeTabTitle('Blog');
    }, []);

    useEffect(() => {
        if (data) {
            setBlogs(data?.content);
        }
    }, [data]);

    return (
        <>
            {!isLoading ? (
                <>
                    {blogs.length !== 0 ? (
                        <>
                            {keyword && (
                                <Stack mx={'auto'} w={'6xl'} mt={5} mb={-5}>
                                    <Text>Result for: {keyword}</Text>
                                </Stack>
                            )}
                            <SimpleGrid columns={3} spacingX={7} spacingY={8} w={'6xl'} m={'auto'} my={10}>
                                {blogs.map((blog) => (
                                    <BlogsItem key={blog.id} blog={blog} />
                                ))}
                            </SimpleGrid>
                        </>
                    ) : (
                        <>
                            {keyword && (
                                <Stack mx={'auto'} w={'6xl'} mt={5} mb={-5}>
                                    <Text>Result for: {keyword}</Text>
                                </Stack>
                            )}
                            <Stack m={'auto'}>
                                <Text>No blog available</Text>
                            </Stack>
                        </>
                    )}
                </>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default BlogPage