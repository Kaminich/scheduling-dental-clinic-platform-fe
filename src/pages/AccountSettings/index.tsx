import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import { FaEye, FaSliders, FaTrashCan, FaUserDoctor, FaUserNurse } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { Link } from "react-router-dom";
import { Color, Shadow } from "../../styles/styles";
import { AddIcon } from "@chakra-ui/icons";

const AccountSettings = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [accounts, setAccounts] = useState([
        { id: 1, username: 'John Doe', role: 'role 1', email: 'aaa', status: 'active' },
        { id: 2, username: 'John Sin', role: 'role 1', email: 'aaa', status: 'active' },
        { id: 3, username: 'Doe Sin', role: 'role 1', email: 'aaa', status: 'active' },
    ]);

    let filteredAccounts = accounts.filter((account) => {
        return account.username.toLowerCase().includes(keyword.toLowerCase())
    })

    useEffect(() => {
        changeTabTitle('Account Settings');
    }, []);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search username..."
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
                            <Menu autoSelect={false} isLazy>
                                <MenuButton
                                    leftIcon={<AddIcon />}
                                    as={Button}
                                    fontSize={16}
                                    colorScheme="green"
                                >
                                    Create
                                </MenuButton>
                                <MenuList minW={36}>
                                    <MenuItem
                                        as={Link}
                                        to={'create-dentist'}
                                        gap={4}
                                    >
                                        <FaUserDoctor /> Dentist
                                    </MenuItem>
                                    <MenuItem
                                        as={Link}
                                        to={'create-staff'}
                                        gap={4}
                                    >
                                        <FaUserNurse /> Staff
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Button leftIcon={<FaSliders />} colorScheme="blue">Filter</Button>
                        </HStack>
                    </CardHeader>
                    <Divider borderColor={'gainsboro'} />
                    <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr borderColor={'gainsboro'}>
                                    <Th textAlign='center' borderColor={'gainsboro'}>ID</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Username</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Role</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Email</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredAccounts.map((account) => (
                                    <Tr>
                                        <Td textAlign="center" borderColor={'gainsboro'}>{account.id}</Td>
                                        <Td textAlign="center" borderColor={'gainsboro'}>{account.username}</Td>
                                        <Td textAlign='center' borderColor={'gainsboro'}>{account.role}</Td>
                                        <Td textAlign="center" borderColor={'gainsboro'}>{account.email}</Td>
                                        <Td textAlign="center" borderColor={'gainsboro'}>{account.status}</Td>
                                        <Td
                                            p={1}
                                            textAlign='center'
                                            gap={4}
                                            borderColor={'gainsboro'}
                                        >
                                            <Button
                                                borderRadius='full'
                                                px={3}
                                                colorScheme="blue"
                                                variant='ghost'
                                            >
                                                <Tooltip label='Show user information'>
                                                    <span>
                                                        <FaEye />
                                                    </span>
                                                </Tooltip>
                                            </Button>
                                            <Button
                                                borderRadius='full'
                                                px={3}
                                                colorScheme="red"
                                                variant='ghost'
                                            >
                                                <Tooltip label='Deactivate user account'>
                                                    <span>
                                                        <FaTrashCan />
                                                    </span>
                                                </Tooltip>
                                            </Button>
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

export default AccountSettings;