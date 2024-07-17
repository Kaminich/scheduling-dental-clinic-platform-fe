import { SimpleGrid, Stack, Text } from "@chakra-ui/react"
import DentalItem from "../../components/dental_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useActiveClinics from "../../hooks/useActiveClinics";
import ClinicListResponse from "../../types/ClinicListResponse";
import Loading from "../../components/loading";

const DentalPage = () => {
    const { data, isLoading } = useActiveClinics();
    const [clinics, setClinics] = useState<ClinicListResponse[]>([]);

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
                    ) : (
                        <Stack m={'auto'}>
                            <Text>No clinic available</Text>
                        </Stack>
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