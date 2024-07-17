import { SimpleGrid, Stack, Text } from "@chakra-ui/react"
import BlogsItem from "../../components/blogs_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useActiveBlogs from "../../hooks/useActiveBlogs";
import BlogDetailResponse from "../../types/BlogDetailResponse";
import Loading from "../../components/loading";

const BlogPage = () => {
    const { data, isLoading } = useActiveBlogs();
    const [blogs, setBlogs] = useState<BlogDetailResponse[]>([]);

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
                        <SimpleGrid columns={3} spacingX={7} spacingY={8} w={'6xl'} m={'auto'} my={10}>
                            {blogs.map((blog) => (
                                <BlogsItem key={blog.id} blog={blog} />
                            ))}
                        </SimpleGrid>
                    ) : (
                        <Stack m={'auto'}>
                            <Text>No blog available</Text>
                        </Stack>
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