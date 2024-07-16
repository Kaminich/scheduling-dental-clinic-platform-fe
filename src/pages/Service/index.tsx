import { SimpleGrid, Stack } from "@chakra-ui/react"
import ServiceItem from "../../components/service_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useCategory from "../../hooks/useCategory";
import CategoryViewListResponse from "../../types/CategoryViewListResponse";
import Loading from "../../components/loading";

const ServicePage = () => {
    const { data, isLoading } = useCategory()
    const [categories, setCategories] = useState<CategoryViewListResponse[]>([]);

    useEffect(() => {
        changeTabTitle('Service');
    }, []);

    useEffect(() => {
        if (data) {
            setCategories(data.Categories);
        }
    }, [data]);

    return (
        <>
            {!isLoading ? (
                <SimpleGrid columns={4} spacingX={7} spacingY={8} w={'6xl'} m={'auto'} my={10}>
                    {categories
                        .filter((category) => category.status === true)
                        .map((category) => (
                            <ServiceItem
                                key={category.id}
                                categoryImage={category.categoryImage}
                                categoryName={category.categoryName}
                            />
                        ))}
                </SimpleGrid>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default ServicePage