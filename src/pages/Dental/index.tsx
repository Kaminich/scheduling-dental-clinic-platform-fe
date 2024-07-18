import { SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react"
import DentalItem from "../../components/dental_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useActiveClinics from "../../hooks/useActiveClinics";
import ClinicListResponse from "../../types/ClinicListResponse";
import Loading from "../../components/loading";
import { useSearchParams } from "react-router-dom";
import ApiClient from "../../services/apiClient";

const DentalPage = () => {
    const { data, isLoading } = useActiveClinics();
    const [clinics, setClinics] = useState<ClinicListResponse[]>([]);
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
                setClinics(response.data['Searched clinic'])
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
        changeTabTitle('Dental Clinic');
    }, []);

    useEffect(() => {
        if (data?.content) {
            setClinics(data.content);
        }
    }, [data?.content]);

    return (
        <>
            {!isLoading ? (
                <>
                    {clinics.length !== 0 ? (
                        <>
                            {keyword && (
                                <Stack mx={'auto'} w={'6xl'} mt={5} mb={-5}>
                                    <Text>Result for: {keyword}</Text>
                                </Stack>
                            )}
                            <SimpleGrid
                                columns={3}
                                spacingX={4}
                                spacingY={6}
                                maxW={'6xl'}
                                my={5}
                                mx={'auto'}
                                py={8}
                            >
                                {clinics.map((clinic) => (
                                    <DentalItem key={clinic.clinicId} dentalData={clinic} />
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
                                <Text>No clinic available</Text>
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

export default DentalPage