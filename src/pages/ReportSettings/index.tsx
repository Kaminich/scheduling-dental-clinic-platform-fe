import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaCheck, FaEye, FaSliders, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { Color, Shadow } from "../../styles/styles";
import useReports from "../../hooks/useReports";
import Loading from "../../components/loading";
import ReportResponse, { initialReportResponse } from "../../types/ReportResponse";
import ApiClient from "../../services/apiClient";
import ApproveModal from "../../components/modal/approve";
import ReportDetailModal from "../../components/modal/report_detail";
import { formatDateMonth } from "../../utils/formatDateMonth";

const ReportSettingsPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [approve, setApprove] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const { data, isLoading, refetch } = useReports();
    const { isOpen: isOpenApprove, onClose: OnCloseApprove, onOpen: onOpenApprove } = useDisclosure();
    const { isOpen: isOpenDetail, onClose: OnCloseDetail, onOpen: onOpenDetail } = useDisclosure();
    const [reports, setReports] = useState<ReportResponse[]>([]);
    const [report, setReport] = useState<ReportResponse>(initialReportResponse);
    const toast = useToast();

    let filteredReports = reports.filter((report) => {
        return report.branchName.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleApprove = async () => {
        if (approve) {
            const api = new ApiClient<any>(`/report/approve`);
            try {
                const response = await api.createWithId(id);
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
                OnCloseApprove();
            }
        } else {
            const api = new ApiClient<any>(`/report/decline`);
            try {
                const response = await api.createWithId(id);
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
                OnCloseApprove();
            }
        }
    }

    useEffect(() => {
        changeTabTitle('Report Settings');
    }, []);

    useEffect(() => {
        if (data) {
            setReports(data);
        }
    }, [data]);

    console.log(data);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search branch..."
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
                            <Button leftIcon={<FaSliders />} colorScheme="blue">Filter</Button>
                        </HStack>
                    </CardHeader>
                    <Divider borderColor={'gainsboro'} />
                    <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th textAlign='center' borderColor={'gainsboro'}>ID</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Branch</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Reported Customer</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Reporter</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Created Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'} minW={120}>Approve or Denied</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoading ? (
                                    <>
                                        {filteredReports.length !== 0 ? (
                                            <>
                                                {filteredReports.map((report) => (
                                                    <Tr _hover={{ bg: 'gray.100' }}>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{report.reportId}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{`${report.branchName} (${report.city})`}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{report.reportedCustomer}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{report.reporter}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{report.createdDateTime ? formatDateMonth(report.createdDateTime) : '-'}</Td>
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
                                                                    setReport(report);
                                                                    onOpenDetail();
                                                                }}
                                                            >
                                                                <Tooltip label='Show report detail'>
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
                                                                    setId(report.reportId)
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
                                                                    setId(report.reportId);
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
                                                <Td colSpan={7} textAlign="center">
                                                    No report
                                                </Td>
                                            </Tr>
                                        )}
                                    </>
                                ) : (
                                    <Tr>
                                        <Td colSpan={7} textAlign="center">
                                            <Loading />
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card >
            </Stack >
            <ApproveModal
                isOpen={isOpenApprove}
                onClose={OnCloseApprove}
                approve={approve}
                type="report"
                handleApprove={handleApprove}
            />
            <ReportDetailModal
                isOpen={isOpenDetail}
                onClose={OnCloseDetail}
                report={report}
            />
        </Stack >
    )
}

export default ReportSettingsPage;