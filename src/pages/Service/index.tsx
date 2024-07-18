import { SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react"
import ServiceItem from "../../components/service_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useCategory from "../../hooks/useCategory";
import CategoryViewListResponse from "../../types/CategoryViewListResponse";
import Loading from "../../components/loading";
import ApiClient from "../../services/apiClient";
import { useSearchParams } from "react-router-dom";

const ServicePage = () => {
    const { data, isLoading } = useCategory()
    const [categories, setCategories] = useState<CategoryViewListResponse[]>([]);
    const [searchParams] = useSearchParams();
    const toast = useToast();
    const category = searchParams.get('category');
    const keyword = searchParams.get('keyword');

    const handleSearch = async () => {
        const api = new ApiClient<any>('/clinics/search');
        try {
            const response = await api.getUnauthen({
                params: {
                    filter: category,
                    searchValue: keyword
                }
            })
            if (response.success) {
                setCategories(response.data['Searched service'])
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (category && keyword) {
            handleSearch();
        }
    }, [category, keyword]);

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
                <>
                    {categories.length !== 0 ? (
                        <>
                            {keyword && (
                                <Stack mx={'auto'} w={'6xl'} mt={5} mb={-5}>
                                    <Text>Result for: {keyword}</Text>
                                </Stack>
                            )}
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
                        </>
                    ) : (
                        <>
                            {keyword && (
                                <Stack mx={'auto'} w={'6xl'} mt={5} mb={-5}>
                                    <Text>Result for: {keyword}</Text>
                                </Stack>
                            )}
                            <Stack m={'auto'}>
                                <Text>No service available</Text>
                            </Stack>
                        </>
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

export default ServicePage