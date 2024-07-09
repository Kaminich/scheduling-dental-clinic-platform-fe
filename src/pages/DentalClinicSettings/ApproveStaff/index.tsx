import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaCheck, FaEye, FaSliders, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Color, Shadow } from "../../../styles/styles";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import StaffDetailModal from "../../../components/modal/staff_detail";
import StaffSummaryResponse from "../../../types/StaffSummaryResponse";
import usePendingStaffs from "../../../hooks/usePendingStaffs";
import Loading from "../../../components/loading";
import ApiClient from "../../../services/apiClient";
import ApproveModal from "../../../components/modal/approve";

const ApproveStaffPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [approve, setApprove] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [staffs, setStaffs] = useState<StaffSummaryResponse[]>([]);
    const { data, isLoading, refetch } = usePendingStaffs();
    const { isOpen: isOpenApprove, onClose: onCloseApprove, onOpen: onOpenApprove } = useDisclosure();
    const { isOpen: isOpenDetail, onClose: onCloseDetail, onOpen: onOpenDetail } = useDisclosure();
    const toast = useToast();

    let filteredStaffs = staffs.filter((staff) => {
        return staff.fullName.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleApprove = async () => {
        const api = new ApiClient<any>(`/staff/approval`);
        try {
            const response = await api.createWithId(id, {
                params: {
                    isApproved: approve
                }
            });
            console.log(response);
            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                refetch && refetch();
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "An error occurred",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
        } finally {
            onCloseApprove();
        }
    }

    useEffect(() => {
        changeTabTitle('Approve Staff');
    }, []);

    useEffect(() => {
        if (data) {
            setStaffs(data.content);
        }
    }, [data]);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search staff name..."
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
                                        {filteredStaffs.length !== 0 ? (
                                            <>
                                                {filteredStaffs.map((staff) => (
                                                    <Tr _hover={{ bg: 'gray.100' }}>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{staff.id}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{staff.fullName}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{staff.clinicBranchName}</Td>
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
                                                                    setId(staff.id)
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
                                                                    setApprove(true);
                                                                    setId(staff.id)
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
                                                                    setApprove(false);
                                                                    setId(staff.id);
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
                                                    No pending staff
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
            <ApproveModal
                isOpen={isOpenApprove}
                onClose={onCloseApprove}
                type={'staff'}
                approve={approve}
                handleApprove={handleApprove}
            />
            <StaffDetailModal
                isOpen={isOpenDetail}
                onClose={onCloseDetail}
                id={id}
            />
        </Stack>
    )
}

export default ApproveStaffPage