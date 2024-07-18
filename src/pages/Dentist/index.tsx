import { SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react"
import DentistItem from "../../components/dentist_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useDentists from "../../hooks/useDentists";
import Loading from "../../components/loading";
import { useSearchParams } from "react-router-dom";
import ApiClient from "../../services/apiClient";
import DentistListResponse from "../../types/DentistListResponse";

const DentistPage = () => {
    const { data, isLoading } = useDentists();
    const [dentists, setDentists] = useState<DentistListResponse[]>([]);
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
                setDentists(response.data['Searched Dentist'])
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
        changeTabTitle('Dentist');
    }, []);

    useEffect(() => {
        if (data?.content) {
            setDentists(data.content);
        }
    }, [data?.content]);

    return (
        <>
            {!isLoading ? (
                <>
                    {dentists.length !== 0 ? (
                        <>
                            {keyword && (
                                <Stack mx={'auto'} w={'6xl'} mt={5} mb={-5}>
                                    <Text>Result for: {keyword}</Text>
                                </Stack>
                            )}
                            <SimpleGrid
                                columns={4}
                                spacingX={8}
                                spacingY={6}
                                w={'6xl'}
                                my={5}
                                mx={'auto'}
                                py={8}
                            >
                                <DentistItem type={1} data={dentists} />
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
                                <Text>No dentist available</Text>
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

export default DentistPage