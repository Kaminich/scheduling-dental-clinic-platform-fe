import { SimpleGrid } from "@chakra-ui/react"
import DentistItem from "../../../../components/dentist_item"

const MedicalTeam = () => {
    return (
        <SimpleGrid columns={4} spacingX={7} spacingY={8}>
            <DentistItem type={1} />
            <DentistItem type={1} />
            <DentistItem type={1} />
            <DentistItem type={1} />
            <DentistItem type={1} />
            <DentistItem type={1} />
            <DentistItem type={1} />
            <DentistItem type={1} />
        </SimpleGrid>
    )
}

export default MedicalTeam