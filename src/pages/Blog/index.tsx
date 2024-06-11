import { SimpleGrid } from "@chakra-ui/react"
import BlogsItem from "../../components/blogs_item"
import { useEffect } from "react";
import { changeTitle } from "../../utils/changeTabTitle";

const BlogPage = () => {

    useEffect(() => {
        changeTitle('Blog');
    }, []);

    return (
        <SimpleGrid columns={3} spacingX={7} spacingY={8} w={'6xl'} m={'auto'} my={10}>
            <BlogsItem />
            <BlogsItem />
            <BlogsItem />
        </SimpleGrid>
    )
}

export default BlogPage