import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure } from "@chakra-ui/react";
import { FaArrowRightArrowLeft, FaEye, FaPenToSquare, FaSliders, FaTrashCan } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { useNavigate } from "react-router";
import { Color, Shadow } from "../../styles/styles";
import { AddIcon } from "@chakra-ui/icons";
import useCategory from "../../hooks/useCategory";
import CategoryModal from "../../components/modal/category";
import DeleteModal from "../../components/modal/delete";
import CategoryChangeStatusModal from "../../components/modal/category_change_status";

const CategoriesSettingsPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [status, setStatus] = useState<string>('');
    const [clinics, setClinics] = useState([
        { id: 1, username: 'John Doe', role: 'role 1', email: 'aaa', status: 'active' },
        { id: 2, username: 'John Sin', role: 'role 1', email: 'aaa', status: 'active' },
        { id: 3, username: 'Doe Sin', role: 'role 1', email: 'aaa', status: 'active' },
    ]);
    const { data } = useCategory();
    const { isOpen: isOpenCategory, onClose: onCloseCategory, onOpen: onOpenCategory } = useDisclosure();
    const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpen: onOpenDelete } = useDisclosure();
    const { isOpen: isOpenChange, onClose: onCloseChange, onOpen: onOpenChange } = useDisclosure();
    const navigate = useNavigate();

    let filteredClinics = clinics.filter((clinic) => {
        return clinic.username.toLowerCase().includes(keyword.toLowerCase())
    })

    useEffect(() => {
        changeTabTitle('Categories Settings');
    }, []);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search clinic name..."
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
                                onClick={() => {
                                    setType('create');
                                    onOpenCategory();
                                }}
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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
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
                                                onClick={() => {
                                                    setId(0);
                                                    setType('detail')
                                                    onOpenCategory();
                                                }}
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
                                                colorScheme="blue"
                                                variant='ghost'
                                                onClick={() => {
                                                    setId(0);
                                                    setStatus('')
                                                    onOpenChange();
                                                }}
                                            >
                                                <Tooltip label='Change status'>
                                                    <span>
                                                        <FaArrowRightArrowLeft />
                                                    </span>
                                                </Tooltip>
                                            </Button>
                                            <Button
                                                borderRadius='full'
                                                px={3}
                                                colorScheme="gray"
                                                variant='ghost'
                                                onClick={() => {
                                                    setId(0);
                                                    setType('update')
                                                    onOpenCategory();
                                                }}
                                            >
                                                <Tooltip label='Update category'>
                                                    <span>
                                                        <FaPenToSquare />
                                                    </span>
                                                </Tooltip>
                                            </Button>
                                            <Button
                                                borderRadius='full'
                                                px={3}
                                                colorScheme="red"
                                                variant='ghost'
                                                onClick={() => {
                                                    setId(0);
                                                    onOpenDelete();
                                                }}
                                            >
                                                <Tooltip label='Delete category'>
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
            <CategoryModal
                isOpen={isOpenCategory}
                onClose={onCloseCategory}
                id={null}
                type={type}
            />
            <DeleteModal
                isOpen={isOpenDelete}
                onClose={onCloseDelete}
                id={id}
                type="category"
            />
            <CategoryChangeStatusModal
                isOpen={isOpenChange}
                onClose={onCloseChange}
                id={id}
                status={status === 'ACTIVE' ? true : false}
            />
        </Stack>
    )
}

export default CategoriesSettingsPage;