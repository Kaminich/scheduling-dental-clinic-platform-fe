import { Button, Heading, HStack, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { useNavigate, useParams } from "react-router";
import BlogDetailResponse, { initialBlogDetailResponse } from "../../types/BlogDetailResponse";
import ApiClient from "../../services/apiClient";
import { FaPenToSquare } from "react-icons/fa6";
import useActiveBlogs from "../../hooks/useActiveBlogs";
import BlogsItem from "../../components/blogs_item";
import Loading from "../../components/loading";
import { formatDate } from "../../utils/formatDate";

const BlogDetailPage = () => {
    const { role } = useAuth();
    const { name } = useParams<{ name: string }>();
    const { blogId } = useParams<{ blogId: string }>();
    const decodedName = name ? name.replace(/-/g, ' ') : '';
    const [id, setId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [blog, setBlog] = useState<BlogDetailResponse>(initialBlogDetailResponse);
    const { data } = useActiveBlogs();
    const navigate = useNavigate();

    const getBlogDetail = async () => {
        setIsLoading(true);
        const api = new ApiClient<any>('/blog');
        try {
            const response = await api.getDetailUnauthen(parseInt(blogId || '0') || id);

            if (response.success) {
                setBlog(response.data);
            }
        } catch (error: unknown) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (data) {
            const foundBlog = data.content.find((blog: BlogDetailResponse) => blog.title === decodedName);
            if (foundBlog) {
                setId(foundBlog.id);
            }
        }
    }, [data, name]);

    useEffect(() => {
        if (id || parseInt(blogId || '0')) {
            getBlogDetail();
        }
    }, [id, blogId]);

    useEffect(() => {
        if (decodedName) {
            changeTabTitle(decodedName);
        }
    }, [decodedName]);

    console.log(blog.content);


    return (
        <>
            {!isLoading ? (
                <Stack w={'6xl'} m={'auto'} gap={10} mb={8}>
                    {role === 'Staff' && (
                        <HStack pos={'fixed'} top={128} right={20} mt={-4}>
                            <Button leftIcon={<FaPenToSquare />} colorScheme="blue" onClick={() => navigate('update')}>Edit</Button>
                        </HStack>
                    )}
                    <Stack>
                        <Heading fontWeight={600}>{blog.title}</Heading>
                        <Text fontSize={16}>By {blog.publisherName}</Text>
                        <Text fontSize={16}>{blog.publishDate ? formatDate(blog.publishDate) : '-'}</Text>
                    </Stack>
                    <Image
                        src={blog.thumbnail || 'https://i.pinimg.com/736x/08/1a/ed/081aed2e7ddc029f940021ddb22145fc.jpg'}
                        alt={blog.title}
                        borderRadius='lg'
                        h={'50vh'}
                        w={'full'}
                    />
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    {role !== 'Staff' && role !== 'Admin' && role !== 'Owner' && (
                        <Stack>
                            <Heading
                                textAlign={'center'}
                                mb={6}
                            >
                                Highlight Blogs
                            </Heading>
                            <SimpleGrid columns={3}>
                                {data?.content.map((blog: BlogDetailResponse) => (
                                    <BlogsItem key={blog.id} blog={blog} />
                                ))}
                            </SimpleGrid>
                        </Stack>
                    )}
                </Stack>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default BlogDetailPage