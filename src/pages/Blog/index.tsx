import { SimpleGrid } from "@chakra-ui/react"
import BlogsItem from "../../components/blogs_item"
import { useEffect } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useActiveBlogs from "../../hooks/useActiveBlogs";

const BlogPage = () => {
    const { data } = useActiveBlogs();

    useEffect(() => {
        changeTabTitle('Blog');
    }, []);

    console.log(data);


    return (
        <SimpleGrid columns={3} spacingX={7} spacingY={8} w={'6xl'} m={'auto'} my={10}>
            <BlogsItem />
            <BlogsItem />
            <BlogsItem />
        </SimpleGrid>
    )
}

export default BlogPage