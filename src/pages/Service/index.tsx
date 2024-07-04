import { SimpleGrid } from "@chakra-ui/react"
import ServiceItem from "../../components/service_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useCategory from "../../hooks/useCategory";
import CategoryViewListResponse from "../../types/CategoryViewListResponse";

const ServicePage = () => {
    const { data } = useCategory()
    const [categories, setCategories] = useState<CategoryViewListResponse[]>([]);

    useEffect(() => {
        changeTabTitle('Service');
    }, []);

    useEffect(() => {
        if (data) {
            setCategories(data.Categories);
        }
    }, [data]);

    console.log(categories);


    return (
        <SimpleGrid columns={4} spacingX={7} spacingY={8} w={'6xl'} m={'auto'} my={10}>
            {categories.map((category) => (
                <ServiceItem
                    key={category.id}
                    categoryImage={category.categoryImage}
                    categoryName={category.categoryName}
                />
            ))}
        </SimpleGrid>
    )
}

export default ServicePage