import { Card, CardBody, HStack, Heading, Image, SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/react"
import { Color } from "../../../../styles/styles"
import { FaMapLocationDot } from "react-icons/fa6"
import { Link } from "react-router-dom"
import DentistItem from "../../../../components/dentist_item"

const DentalDentist = () => {
    return (
        <>
            <Text
                maxW={'sm'}
                fontSize={20}
                pl={4}
                py={1}
                mb={4}
                fontWeight={500}
                borderRadius={'full'}
                bgGradient={Color.headingGradientMd}
            >
                Medical Team
            </Text>
            <SimpleGrid columns={4} spacing={6} mb={6}>
                <DentistItem type={2} />
                <DentistItem type={2} />
                <DentistItem type={2} />
                <DentistItem type={2} />
            </SimpleGrid>
        </>
    )
}

export default DentalDentist