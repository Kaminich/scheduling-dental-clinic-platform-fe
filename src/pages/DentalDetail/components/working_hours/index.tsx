import { Card, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Shadow } from "../../../../styles/styles"

const WorkingHours = () => {
    return (
        <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
            <Table>
                <Thead>
                    <Tr>
                        <Th w={24}></Th>
                        <Th textAlign={'center'} w={'264.5px'}>Morning</Th>
                        <Th textAlign={'center'} w={'264.5px'}>Afternoon</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Th>Monday</Th>
                        <Td textAlign={'center'}>millimetres (mm)</Td>
                        <Td textAlign={'center'}>25.4</Td>
                    </Tr>
                    <Tr>
                        <Th>Tuesday</Th>
                        <Td textAlign={'center'}>centimetres (cm)</Td>
                        <Td textAlign={'center'}>30.48</Td>
                    </Tr>
                    <Tr>
                        <Th>Wednesday</Th>
                        <Td textAlign={'center'}>metres (m)</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Th>Thursday</Th>
                        <Td textAlign={'center'}>metres (m)</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Th>Friday</Th>
                        <Td textAlign={'center'}>metres (m)</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Th>Saturday</Th>
                        <Td textAlign={'center'}>metres (m)</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                    </Tr>
                    <Tr>
                        <Th>Sunday</Th>
                        <Td textAlign={'center'}>metres (m)</Td>
                        <Td textAlign={'center'}>0.91444</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Card>
    )
}

export default WorkingHours