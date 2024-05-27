import { Card, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { Border, Color, Shadow } from "../../../../styles/styles"

const ServicePrice = () => {
    return (
        <Stack>
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
                Service and Price list
            </Text>
            <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
                <Table size={'lg'} variant={'unstyled'}>
                    <Thead>
                        <Tr borderBottom={Border.tableBorder}>
                            <Th w={'2xl'}>Service</Th>
                            <Th
                                borderStart={Border.tableBorder}
                                borderEnd={Border.tableBorder}
                                textAlign={'center'}
                            >
                                Unit
                            </Th>
                            <Th textAlign={'center'}>Unit Price (VND)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr borderBottom={Border.tableBorder}>
                            <Th textTransform={'capitalize'}>Examining</Th>
                        </Tr>
                        <Tr borderBottom={Border.tableBorder}>
                            <Td>Examining</Td>
                            <Td
                                borderStart={Border.tableBorder}
                                borderEnd={Border.tableBorder}
                                textAlign={'center'}
                            >
                                1
                            </Td>
                            <Td textAlign={'center'}>200.000 - 400.000</Td>
                        </Tr>
                        <Tr borderBottom={Border.tableBorder}>
                            <Th textTransform={'capitalize'}>X-ray Scan</Th>
                        </Tr>
                        <Tr borderBottom={Border.tableBorder}>
                            <Td>X-ray Scan</Td>
                            <Td
                                borderStart={Border.tableBorder}
                                borderEnd={Border.tableBorder}
                                textAlign={'center'}
                            >
                                1
                            </Td>
                            <Td textAlign={'center'}>200.000 - 400.000</Td>
                        </Tr>
                        <Tr borderBottom={Border.tableBorder}>
                            <Td>X-ray Scan</Td>
                            <Td
                                borderStart={Border.tableBorder}
                                borderEnd={Border.tableBorder}
                                textAlign={'center'}
                            >
                                1
                            </Td>
                            <Td textAlign={'center'}>200.000 - 400.000</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Card>
        </Stack>
    )
}

export default ServicePrice