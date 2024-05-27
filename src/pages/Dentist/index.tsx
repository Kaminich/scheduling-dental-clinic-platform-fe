import { SimpleGrid } from "@chakra-ui/react"
import DentistItem from "../../components/dentist_item"

const DentistPage = () => {
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

export default DentistPage