import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaChevronRight, FaSliders, FaTrashCan } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { Color, Shadow } from "../../../styles/styles";
import { AddIcon } from "@chakra-ui/icons";
import Loading from "../../../components/loading";
import { Status } from "../../../types/type.enum";
import { formatDateTime } from "../../../utils/formatDateTime";
import { formatDate } from "../../../utils/formatDate";
import ApiClient from "../../../services/apiClient";
import DeleteModal from "../../../components/modal/delete";
import BlogDetailResponse from "../../../types/BlogDetailResponse";
import useUserProfile from "../../../hooks/useUserProfile";
import useBlogByClinicId from "../../../hooks/useBlogByClinicId";
import useActiveBlogs from "../../../hooks/useActiveBlogs";

const ManageBlogPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const { role } = useAuth();
    const { data: userData } = useUserProfile();
    const { data: blogData, isLoading: isLoadingBlog, refetch: refetchBlog } = useBlogByClinicId({ clinicId: userData?.clinicId });
    const { data: allData, isLoading: isLoadingAll, refetch: refetchAll } = useActiveBlogs();
    const [blogs, setBlogs] = useState<BlogDetailResponse[]>([]);
    const { isOpen: isOpenDeactivate, onClose: onCloseDeactivate, onOpen: onOpenDeactivate } = useDisclosure();
    const toast = useToast();

    let filteredBlogs = blogs.filter((blog) => {
        return blog.title.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleDeactivate = async () => {
        try {
            const api = new ApiClient<any>(`/blog`);
            const response = await api.delete(id);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
                refetchAll && refetchAll();
                refetchBlog && refetchBlog();
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
            onCloseDeactivate();
        }
    }

    useEffect(() => {
        if (role === 'Owner') {
            changeTabTitle('Blogs Settings');
        } else {
            changeTabTitle('Manage Blog');
        }
    }, []);

    useEffect(() => {
        if (allData && role === 'Admin') {
            setBlogs(allData.content)
        } else if (blogData) {
            setBlogs(blogData.content)
        }
    }, [allData, blogData]);

    return (
        <Stack w={role === 'Staff' ? '7xl' : 'full'} align='center' mx='auto' my={5} gap={10}>
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
                <Card shadow={Shadow.cardShadow} bg={Color.blue_100}>
                    <CardHeader py={3}>
                        <HStack w={'full'} justify={'flex-end'} gap={5}>
                            {role !== 'Admin' && (
                                <Button leftIcon={<AddIcon />} colorScheme="green" onClick={() => navigate('create')}>Create</Button>
                            )}
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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoadingAll || !isLoadingBlog ? (
                                    <>
                                        {filteredBlogs.length !== 0 ? (
                                            <>
                                                {filteredBlogs.map((blog) => (
                                                    <Tr _hover={{ bg: 'gray.100' }} key={blog.id}>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{blog.id}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{blog.clinicName}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{blog.title}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{formatDate(blog.createdDate)}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{formatDateTime(blog.modifiedDate)}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>
                                                            {blog.status === Status.ACTIVE && (
                                                                <Tag colorScheme="green">
                                                                    <TagLabel>
                                                                        {blog.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {blog.status === Status.INACTIVE && (
                                                                <Tag colorScheme="red">
                                                                    <TagLabel>
                                                                        {blog.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {blog.status === Status.PENDING && (
                                                                <Tag colorScheme="yellow">
                                                                    <TagLabel>
                                                                        {blog.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {blog.status === Status.APPROVED && (
                                                                <Tag colorScheme="cyan">
                                                                    <TagLabel>
                                                                        {blog.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                        </Td>
                                                        <Td
                                                            p={1}
                                                            textAlign='center'
                                                            gap={4}
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {blog.status === Status.ACTIVE && (
                                                                <Button
                                                                    borderRadius='full'
                                                                    px={3}
                                                                    colorScheme="red"
                                                                    variant='ghost'
                                                                    onClick={() => {
                                                                        setId(blog.id);
                                                                        onOpenDeactivate();
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        label={'Remove blog'}
                                                                    >
                                                                        <span>
                                                                            <FaTrashCan />
                                                                        </span>
                                                                    </Tooltip>
                                                                </Button>
                                                            )}
                                                            {blog.status === Status.PENDING && (
                                                                <Text>-</Text>
                                                            )}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                            cursor={'pointer'}
                                                            onClick={() => navigate(blog.id.toString())}
                                                        >
                                                            <FaChevronRight />
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={8} textAlign="center">
                                                    No blog
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
            <DeleteModal
                isOpen={isOpenDeactivate}
                onClose={onCloseDeactivate}
                type={'blog'}
                handleDeactivate={handleDeactivate}
            />
        </Stack>
    )
}

export default ManageBlogPage;