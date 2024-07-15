import { Card, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Shadow } from "../../../../styles/styles"
import useWorkingHoursByClinicId from "../../../../hooks/useWorkingHoursByClinicId";
import { useEffect, useState } from "react";
import WorkingHoursResponse from "../../../../types/WorkingHoursResponse";
import { formatTime } from "../../../../utils/formatTime";

interface Prop {
    clinicId: number;
}
const WorkingHours = ({ clinicId }: Prop) => {
    const { data } = useWorkingHoursByClinicId({ clinicId: clinicId });
    const [workingHours, setWorkingHours] = useState<WorkingHoursResponse[]>([]);

    console.log(data);
    useEffect(() => {
        if (data) {
            setWorkingHours(data);
        }
    }, [data])

    return (
        <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
            <Table>
                <Thead>
                    <Tr>
                        <Th w={24}></Th>
                        <Th textAlign={'center'} w={'264.5px'}>Start time</Th>
                        <Th textAlign={'center'} w={'264.5px'}>End time</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {workingHours.map((workingHour) => (
                        <Tr>
                            <Th>{workingHour.day}</Th>
                            <Td textAlign={'center'}>{formatTime(workingHour.startTime)}</Td>
                            <Td textAlign={'center'}>{formatTime(workingHour.endTime)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Card>
    )
}

export default WorkingHours