import { AbsoluteCenter, Box, Divider, SimpleGrid } from "@chakra-ui/react"
import DentalItem from "../../../../components/dental_item"
import { Link } from "react-router-dom"

const DentalBranch = () => {
    return (
        <>
            <SimpleGrid columns={3} spacingX={3} spacingY={6}>
                <DentalItem />
                <DentalItem />
                <DentalItem />
                <DentalItem />
                <DentalItem />
                <DentalItem />
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