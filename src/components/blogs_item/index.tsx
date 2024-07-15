import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { Color } from "../../styles/styles"
import { useNavigate } from "react-router-dom"
import BlogDetailResponse from "../../types/BlogDetailResponse"

interface Prop {
    blog: BlogDetailResponse;
}

const BlogsItem = ({ blog }: Prop) => {
    const navigate = useNavigate();
    const navigateToDetail = (name: string) => {
        const hyphenatedName = name.replace(/ /g, '-');
        navigate(`/blogs/${hyphenatedName}`);
    };

    return (
        <Card maxW={320} bgColor={Color.blue_100} cursor={'pointer'} onClick={() => navigateToDetail(blog.title)}>
            <CardBody>
                <Image
                    src={blog.thumbnail || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}
                    alt={blog.title}
                    borderRadius='lg'
                    h={155}
                    w={280}
                />
                <Stack mt='4' spacing='3'>
                    <Heading
                        size='md'
                        textAlign={'center'}
                        noOfLines={1}
                        _hover={{ color: Color.hoverBlue }}
                    >
                        {blog.title}
                    </Heading>
                    <Text fontSize={14} fontWeight={400} color={'gray'} noOfLines={1}>
                        {blog.summary}
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default BlogsItem