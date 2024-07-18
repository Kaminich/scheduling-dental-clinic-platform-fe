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
                    src={blog.thumbnail || 'https://i.pinimg.com/736x/08/1a/ed/081aed2e7ddc029f940021ddb22145fc.jpg'}
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