import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { FaChevronRight, FaSliders } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { useNavigate } from "react-router";
import { Color, Shadow } from "../../styles/styles";
import { AddIcon } from "@chakra-ui/icons";

const ClinicBranchSettingsPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [clinics, setClinics] = useState([
        { id: 1, username: 'John Doe', role: 'role 1', email: 'aaa', status: 'active' },
        { id: 2, username: 'John Sin', role: 'role 1', email: 'aaa', status: 'active' },
        { id: 3, username: 'Doe Sin', role: 'role 1', email: 'aaa', status: 'active' },
    ]);
    const navigate = useNavigate();

    let filteredClinics = clinics.filter((clinic) => {
        return clinic.username.toLowerCase().includes(keyword.toLowerCase())
    })

    useEffect(() => {
        changeTabTitle('Clinic Branch Settings');
    }, []);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search branch name..."
                    variant="filled"
                    border='1px solid gainsboro'
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    value={keyword}
                />
            </InputGroup>
            <Stack w={'full'}>
                <Card shadow={Shadow.cardShadow} bg={Color.blue_100}>
                    <CardHeader py={3}>
                        <HStack w={'full'} justify={'flex-end'} gap={5}>
                            <Button
                                leftIcon={<AddIcon />}
                                colorScheme="green"
                                onClick={() => navigate('create')}
                            >
                                Create
                            </Button>
                            <Button leftIcon={<FaSliders />} colorScheme="blue">Filter</Button>
                        </HStack>
                    </CardHeader>
                    <Divider borderColor={'gainsboro'} />
                    <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th textAlign='center' borderColor={'gainsboro'}>ID</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Clinic name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Owner</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Create By</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Last Modified</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Last Modified By</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredClinics.map((clinic) => (
                                    <Tr _hover={{ bg: 'gray.100' }}>
                                        <Td textAlign="center" borderColor={'gainsboro'}>{'logo'}</Td>
                                        <Td textAlign="center" borderColor={'gainsboro'}>{'1'}</Td>
                                        <Td textAlign='center' borderColor={'gainsboro'}>{'name'}</Td>
                                        <Td textAlign="center" borderColor={'gainsboro'}>{'aaa'}</Td>
                                        <Td textAlign="center" borderColor={'gainsboro'}>{'bbb'}</Td>
                                        <Td textAlign='center' borderColor={'gainsboro'}>{'2 days ago'}</Td>
                                        <Td textAlign='center' borderColor={'gainsboro'}>{'ccc'}</Td>
                                        <Td
                                            textAlign='center'
                                            borderColor={'gainsboro'}
                                            cursor={'pointer'}
                                            onClick={() => navigate('dental-detail')}
                                        >
                                            <FaChevronRight />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </Stack>
        </Stack>
    )
}

export default ClinicBranchSettingsPage;