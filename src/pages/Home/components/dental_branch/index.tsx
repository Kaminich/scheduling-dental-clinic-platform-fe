import { AbsoluteCenter, Box, Divider, SimpleGrid } from "@chakra-ui/react"
import DentalItem from "../../../../components/dental_item"
import { Link } from "react-router-dom"
import useActiveClinics from "../../../../hooks/useActiveClinics";
import { useEffect, useState } from "react";
import ClinicListResponse from "../../../../types/ClinicListResponse";

const DentalBranch = () => {
    const { data } = useActiveClinics();
    const [clinics, setClinics] = useState<ClinicListResponse[]>([]);

    useEffect(() => {
        if (data?.content) {
            setClinics(data.content);
        }
    }, [data?.content]);
    console.log(clinics);

    return (
        <>
            <SimpleGrid columns={3} spacingX={3} spacingY={6}>
                {clinics.map((clinic) => (
                    <DentalItem dentalData={clinic} />
                ))}
            </SimpleGrid>
            <Box position='relative' py={7} my={5}>
                <Divider borderColor={'black'} w={'full'} />
                <Link to={'/dentals'}>
                    <AbsoluteCenter
                        bg={'twitter.500'}
                        _hover={{ bg: 'twitter.600' }}
                        color={'white'}
                        px={5}
                        py={3}
                        borderRadius={6}
                    >
                        See More
                    </AbsoluteCenter>
                </Link>
            </Box >
        </>
    )
}

export default DentalBranch