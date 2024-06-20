import { SimpleGrid } from "@chakra-ui/react"
import ServiceItem from "../../components/service_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useCategory from "../../hooks/useCategory";
import Category from "../../types/Category";

const ServicePage = () => {
    const { data } = useCategory({ type: 'get', id: 0 })
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        changeTabTitle('Service');
    }, []);

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    console.log(categories);


    return (
        <SimpleGrid columns={4} spacingX={7} spacingY={8} w={'6xl'} m={'auto'} my={10}>
            <ServiceItem data={categories} />
        </SimpleGrid>
    )
}

export default ServicePage