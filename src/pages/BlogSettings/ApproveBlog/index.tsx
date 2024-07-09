import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaCheck, FaChevronRight, FaSliders, FaX } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Color, Shadow } from "../../../styles/styles";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import Loading from "../../../components/loading";
import usePendingBlogs from "../../../hooks/usePendingBlogs";
import BlogListResponse from "../../../types/BlogListResponse";
import ApiClient from "../../../services/apiClient";
import ApproveModal from "../../../components/modal/approve";
import { formatDate } from "../../../utils/formatDate";
import { formatDateTime } from "../../../utils/formatDateTime";

const ApproveBlogPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const { data, isLoading, refetch } = usePendingBlogs();
    const [blogs, setBlogs] = useState<BlogListResponse[]>([]);
    const [approve, setApprove] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const { isOpen: isOpenApprove, onClose: onCloseApprove, onOpen: onOpenApprove } = useDisclosure();
    const toast = useToast();

    let filteredBlogs = blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleApprove = async () => {
        const api = new ApiClient<any>(`/blog/approval`);
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
        changeTabTitle('Approve Blog');
    }, []);

    useEffect(() => {
        if (data?.content) {
            setBlogs(data.content)
        }
    }, [data?.content]);

    console.log(data);


    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search title..."
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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Title</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Created Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Modified Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'} minW={120}>Approve or Denied</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoading ? (
                                    <>
                                        {filteredBlogs.length !== 0 ? (
                                            <>
                                                {filteredBlogs.map((blog) => (
                                                    <Tr _hover={{ bg: 'gray.100' }}>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{blog.id}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{blog.clinicName}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{blog.title}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{formatDate(blog.createdDate)}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{formatDateTime(blog.modifiedDate)}</Td>
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
                                                                colorScheme="green"
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setApprove(true);
                                                                    setId(blog.id);
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
                                                                    setId(blog.id);
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
                                                        <Td textAlign='center' borderColor={'gainsboro'} cursor={'pointer'}>
                                                            <FaChevronRight />
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={8} textAlign="center">
                                                    No pending blog
                                                </Td>
                                            </Tr>
                                        )}
                                    </>
                                ) : (
                                    <Tr>
                                        <Td colSpan={8} textAlign="center">
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
                type={'blog'}
                approve={approve}
                handleApprove={handleApprove}
            />
        </Stack>
    )
}

export default ApproveBlogPage