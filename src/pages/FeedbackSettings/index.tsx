import { Button, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTitle } from "../../utils/changeTabTitle";
import { RiRotateLockFill } from "react-icons/ri";

const FeedbackSettingPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');

    useEffect(() => {
        changeTitle('Feedback Settings');
    }, []);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search dental..."
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
                    <Text
                        fontSize={16}
                        color="blue"
                        cursor={'pointer'}
                    >
                        Create
                    </Text>
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
                                <Th textAlign='center'>Dental Clinic</Th>
                                <Th textAlign='center'>Rating</Th>
                                <Th textAlign='center'>Feedback</Th>
                                <Th textAlign='center'>Create By</Th>
                                <Th textAlign='center'>Create At</Th>
                                <Th textAlign='center'></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td textAlign="center">{'logo'}</Td>
                                <Td textAlign="center">{'1'}</Td>
                                <Td textAlign='center'>{'name'}</Td>
                                <Td textAlign="center">{'aaa'}</Td>
                                <Td textAlign="center">{'bbb'}</Td>
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

export default FeedbackSettingPage;