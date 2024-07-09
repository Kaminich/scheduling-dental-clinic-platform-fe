import { SimpleGrid } from "@chakra-ui/react"
import DentalItem from "../../components/dental_item"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useActiveClinics from "../../hooks/useActiveClinics";
import ClinicListResponse from "../../types/ClinicListResponse";

const DentalPage = () => {
    const { data } = useActiveClinics();
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
                <DentalItem dentalData={clinic} />
            ))}
        </SimpleGrid>
    )
}

export default DentalPage