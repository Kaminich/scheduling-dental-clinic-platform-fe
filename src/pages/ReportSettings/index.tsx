import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaCheck, FaEye, FaSliders, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { Color, Shadow } from "../../styles/styles";
import useReports from "../../hooks/useReports";
import Loading from "../../components/loading";
import ReportApproveModal from "../../components/modal/report_approve";
import ReportResponse from "../../types/ReportResponse";
import ApiClient from "../../services/apiClient";

const ReportSettingsPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [approve, setApprove] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const { data, isLoading } = useReports();
    const { isOpen: isOpenApprove, onClose: OnCloseApprove, onOpen: onOpenApprove } = useDisclosure();
    const [reports, setReports] = useState<ReportResponse[]>([]);
    const toast = useToast();

    let filteredReports = reports.filter((report) => {
        return report.reportReason.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleApprove = async () => {
        if (approve) {
            const api = new ApiClient<any>(`/report/approve`);
            try {
                const response = await api.createWithId(id);
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
                    placeholder="Search report reason..."
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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Clinic Name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Owner</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
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
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{'clinic.clinicId'}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{'clinic.clinicName'}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{'clinic.ownerName clinic.ownerName clinic.ownerName'}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>
                                                            {/* <Tag size={'md'} variant='subtle' colorScheme='yellow'>
                                                                <TagLabel>PENDING</TagLabel>
                                                            </Tag>  */}
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
                                                                    setId(0)
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
                                                                    setId(0);
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
                                                    No report
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
                </Card >
            </Stack >
            <ReportApproveModal
                isOpen={isOpenApprove}
                onClose={OnCloseApprove}
                approve={approve}
                handleApprove={handleApprove}
            />
        </Stack >
    )
}

export default ReportSettingsPage;