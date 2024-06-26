import { SimpleGrid } from "@chakra-ui/react"
import DentistItem from "../../components/dentist_item"
import { useEffect } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useDentists from "../../hooks/useDentists";

const DentistPage = () => {
    const { data } = useDentists();

    useEffect(() => {
        changeTabTitle('Dentist');
    }, []);

    return (
        <SimpleGrid
            columns={4}
            spacingX={8}
            spacingY={6}
            maxW={'6xl'}
            my={5}
            mx={'auto'}
            py={8}
        >
            <DentistItem type={1} data={data?.content} />
        </SimpleGrid>
    )
}

export default DentistPage