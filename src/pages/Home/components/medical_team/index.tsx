import { SimpleGrid } from "@chakra-ui/react"
import DentistItem from "../../../../components/dentist_item"
import useDentists from "../../../../hooks/useDentists";

const MedicalTeam = () => {
    const { data } = useDentists();

    return (
        <SimpleGrid columns={4} spacingX={7} spacingY={8}>
            <DentistItem type={1} data={data?.content} />
        </SimpleGrid>
    )
}

export default MedicalTeam