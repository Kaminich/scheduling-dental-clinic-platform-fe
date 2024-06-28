import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure } from "@chakra-ui/react";
import { FaCheck, FaEye, FaSliders, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Color, Shadow } from "../../../styles/styles";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import usePendingDentists from "../../../hooks/usePendingDentists";
import Loading from "../../../components/loading";
import DentistApproveModal from "../../../components/modal/dentist_approve";
import DentistDetailModal from "../../../components/modal/dentist_detail";
import DentistListResponse from "../../../types/DentistListResponse";

const ApproveDentistPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [dentists, setDentists] = useState<DentistListResponse[]>([]);
    const [type, setType] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const { data, isLoading } = usePendingDentists();
    const { isOpen: isOpenApprove, onClose: onCloseApprove, onOpen: onOpenApprove } = useDisclosure();
    const { isOpen: isOpenDetail, onClose: onCloseDetail, onOpen: onOpenDetail } = useDisclosure();

    let filteredDentists = dentists.filter((dentist) => {
        return dentist.fullName.toLowerCase().includes(keyword.toLowerCase())
    })

    useEffect(() => {
        changeTabTitle('Approve Dentist');
    }, []);

    useEffect(() => {
        if (data) {
            setDentists(data.content);
        }
    }, [data]);

    console.log(dentists.length);


    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search dentist name..."
                    variant="filled"
                    border='1px solid gainsboro'
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    value={keyword}
                />
            </InputGroup>
            <Stack w={'full'} >
                <Card shadow={Shadow.cardShadow} bg={Color.blue_100}>
                    <CardHeader py={3}>
                        <HStack w={'full'} justify={'flex-end'} gap={5}>
                            <Button leftIcon={<FaSliders />} colorScheme="blue">Filter</Button>
                        </HStack>
                    </CardHeader>
                    <Divider borderColor={'gainsboro'} />
                    <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th textAlign='center' borderColor={'gainsboro'}>ID</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Clinic Name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Branch</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'} minW={120}>Approve or Denied</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoading ? (
                                    <>
                                        {filteredDentists.length !== 0 ? (
                                            <>
                                                {filteredDentists.map((dentist) => (
                                                    <Tr _hover={{ bg: 'gray.100' }}>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{dentist.dentistId}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{dentist.fullName}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{dentist.branchName}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>
                                                            <Tag size={'md'} variant='subtle' colorScheme='yellow'>
                                                                <TagLabel>PENDING</TagLabel>
                                                            </Tag>
                                                        </Td>
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
                                                                    setId(dentist.dentistId)
                                                                    onOpenDetail();
                                                                }}
                                                            >
                                                                <Tooltip label='Show user information'>
                                                                    <span>
                                                                        <FaEye />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                        </Td>
                                                        <Td
                                                            p={1}
                                                            textAlign='center'
                                                            gap={4}
                                                            borderColor={'gainsboro'}
                                                        >
                                                            <Button
                                                                borderRadius='full'
                                                                px={3}
                                                                colorScheme="green"
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setType('approve');
                                                                    setId(dentist.dentistId)
                                                                    onOpenApprove();
                                                                }}
                                                            >
                                                                <Tooltip label='Approve'>
                                                                    <span>
                                                                        <FaCheck />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                            <Button
                                                                borderRadius='full'
                                                                px={3}
                                                                colorScheme="red"
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setType('denied');
                                                                    setId(dentist.dentistId);
                                                                    onOpenApprove();
                                                                }}
                                                            >
                                                                <Tooltip label='Denied'>
                                                                    <span>
                                                                        <FaX />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={6} textAlign="center">
                                                    No pending dentist
                                                </Td>
                                            </Tr>
                                        )}
                                    </>
                                ) : (
                                    <Tr>
                                        <Td colSpan={6} textAlign="center">
                                            <Loading />
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </Stack>
            <DentistApproveModal
                isOpen={isOpenApprove}
                onClose={onCloseApprove}
                id={id}
                type={type}
            />
            <DentistDetailModal
                isOpen={isOpenDetail}
                onClose={onCloseDetail}
                id={id}
            />
        </Stack>
    )
}

export default ApproveDentistPage