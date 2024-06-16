import { Button, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiRotateLockFill } from "react-icons/ri";
import { changeTabTitle } from "../../utils/changeTabTitle";

const AccountSettings = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');

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
                <HStack w={'full'} justify={'flex-end'} gap={5} pr={10}>
                    <Text fontSize={16} color="blue">Create</Text>
                </HStack>
                <Divider />
                <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                    <Table variant="simple" size="md">
                        <Thead>
                            <Tr>
                                <Th textAlign='center'>ID</Th>
                                <Th textAlign='center'>Username</Th>
                                <Th textAlign='center'>Role</Th>
                                <Th textAlign='center'>Email</Th>
                                <Th textAlign='center'>Status</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td textAlign="center">{'ID'}</Td>
                                <Td textAlign="center">{'Username'}</Td>
                                <Td textAlign='center'>{'44'}</Td>
                                <Td textAlign="center">{'admin'}</Td>
                                <Td textAlign="center">2</Td>
                                <Td p={1} textAlign='center' gap={4}>
                                    <Button
                                        borderRadius='full'
                                        px={3}
                                        colorScheme="blue"
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
        </Stack>
    )
}

export default AccountSettings;