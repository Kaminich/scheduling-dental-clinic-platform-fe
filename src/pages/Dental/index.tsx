import { SimpleGrid } from "@chakra-ui/react"
import DentalItem from "../../components/dental_item"

const DentalPage = () => {
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