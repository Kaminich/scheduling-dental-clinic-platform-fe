import { Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import BlogsItem from "../../components/blogs_item"

interface Prop {
    type: string;
}

const BlogDetailPage = ({ type }: Prop) => {
    return (
        <Stack w={'6xl'} m={'auto'} gap={10} mb={8}>
            <Stack>
                <Heading fontWeight={600}>Blog 1</Heading>
                <Text fontSize={16}>By ABC</Text>
                <Text fontSize={16}>May 28, 2024 7:50 AM</Text>
            </Stack>
            <Image
                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                h={'50vh'}
                w={'full'}
            />
            <Text>Blog Content</Text>
            {type === 'customer' && (
                <Stack>
                    <Heading
                        textAlign={'center'}
                        mb={6}
                    >
                        Highlight Blogs
                    </Heading>
                    <SimpleGrid columns={3} spacingX={7}>
                        <BlogsItem />
                        <BlogsItem />
                        <BlogsItem />
                    </SimpleGrid>
                </Stack>
            )}
        </Stack>
    )
}

export default BlogDetailPage