import { Button, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FaEllipsis, FaTrashCan } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { RiRotateLockFill } from "react-icons/ri";

const ManageAppointmentPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>('');
    const { role } = useAuth();

    useEffect(() => {
        changeTabTitle('Manage Appointment');
    }, []);

    return (
        <Stack w={'7xl'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search dentist..."
                    variant="filled"
                    border='1px solid gainsboro'
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    value={keyword}
                />
            </InputGroup>
            <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                <Table variant="simple" size="md">
                    <Thead>
                        <Tr>
                            <Th textAlign='center'>ID</Th>
                            <Th textAlign='center'>Customer</Th>
                            <Th textAlign='center'>Dentist</Th>
                            <Th textAlign='center'>Date</Th>
                            <Th textAlign='center'>Time</Th>
                            <Th textAlign='center'>Service</Th>
                            <Th textAlign='center'>Status</Th>
                            <Th textAlign='center'></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td textAlign="center">{'1'}</Td>
                            <Td textAlign='center'>{'name'}</Td>
                            <Td textAlign="center">{'aaa'}</Td>
                            <Td textAlign="center">{'bbb'}</Td>
                            <Td textAlign='center'>{'2 days ago'}</Td>
                            <Td textAlign='center'>{'ccc'}</Td>
                            <Td textAlign='center'>{'active'}</Td>
                            <Td textAlign='center'>
                                <Button
                                    borderRadius='full'
                                    px={3}
                                    colorScheme="blue"
                                    variant='ghost'

                                >
                                    <FaEllipsis />
                                </Button>
                                <Button
                                    borderRadius='full'
                                    px={3}
                                    colorScheme="green"
                                    variant='ghost'

                                >
                                    <RiRotateLockFill />
                                </Button>
                                <Button
                                    borderRadius='full'
                                    px={3}
                                    colorScheme="red"
                                    variant='ghost'

                                >
                                    <FaTrashCan />
                                </Button>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

export default ManageAppointmentPage