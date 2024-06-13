import { SimpleGrid } from "@chakra-ui/react"
import DentalItem from "../../components/dental_item"
import { useEffect } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";

const DentalPage = () => {

    useEffect(() => {
        changeTabTitle('Dental Clinic');
    }, []);

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
            <DentalItem />
            <DentalItem />
            <DentalItem />
            <DentalItem />
            <DentalItem />
            <DentalItem />
        </SimpleGrid>
    )
}

export default DentalPage