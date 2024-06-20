import { Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const ManageBlogPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>('');
    const { role } = useAuth();

    useEffect(() => {
        changeTabTitle('Manage Blog');
    }, []);

    return (
        <Stack w={role === 'Customer' ? '7xl' : 'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search blog..."
                    variant="filled"
                    border='1px solid gainsboro'
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    value={keyword}
                />
            </InputGroup>
            <Stack w={'full'}>
                <HStack w={'full'} justify={'flex-end'} gap={5} pr={10}>
                    <Link to={'create-blog'}>
                        <Text
                            fontSize={16}
                            color="blue"
                            cursor={'pointer'}
                        >
                            Create
                        </Text>
                    </Link>
                    <Text
                        fontSize={16}
                        color="blue"
                        cursor={'pointer'}
                    >
                        Delete
                    </Text>
                </HStack>
                <Divider />
                <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                    <Table variant="simple" size="md">
                        <Thead>
                            <Tr>
                                <Th textAlign='center'>ID</Th>
                                <Th textAlign='center'>Title</Th>
                                <Th textAlign='center'>Create At</Th>
                                <Th textAlign='center'>Create By</Th>
                                <Th textAlign='center'>Last Modified</Th>
                                <Th textAlign='center'>Last Modified By</Th>
                                <Th textAlign='center'>Status</Th>
                                <Th textAlign='center'></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr _hover={{ bg: '#f1f1f1' }} onClick={() => navigate('blog-detail')}>
                                <Td textAlign="center">{'1'}</Td>
                                <Td textAlign='center'>{'name'}</Td>
                                <Td textAlign="center">{'aaa'}</Td>
                                <Td textAlign="center">{'bbb'}</Td>
                                <Td textAlign='center'>{'2 days ago'}</Td>
                                <Td textAlign='center'>{'ccc'}</Td>
                                <Td textAlign='center'>{'active'}</Td>
                                <Td textAlign='center' cursor={'pointer'}>
                                    <FaChevronRight />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    )
}

export default ManageBlogPage;