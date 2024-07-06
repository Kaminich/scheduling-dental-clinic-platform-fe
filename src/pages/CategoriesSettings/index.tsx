import { Button, Card, CardHeader, Divider, HStack, Image, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaArrowRightArrowLeft, FaEye, FaPenToSquare, FaSliders } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { Color, Shadow } from "../../styles/styles";
import { AddIcon } from "@chakra-ui/icons";
import CategoryModal from "../../components/modal/category";
import ApiClient from "../../services/apiClient";
import useUserProfile from "../../hooks/useUserProfile";
import CategoryViewListResponse from "../../types/CategoryViewListResponse";
import useCategoryByClinicId from "../../hooks/useCategoryByClinicId";
import Loading from "../../components/loading";
import ChangeStatusModal from "../../components/modal/change_status";
import { formatDate } from "../../utils/formatDate";
import { formatDateTime } from "../../utils/formatDateTime";

const CategoriesSettingsPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [status, setStatus] = useState<boolean>(false);
    const [hideImage, setHideImage] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryViewListResponse[]>([]);
    const { data: userData } = useUserProfile();
    const { data: categoryData, isLoading, refetch } = useCategoryByClinicId({ clinicId: userData?.clinicId });
    const { isOpen: isOpenCategory, onClose: onCloseCategory, onOpen: onOpenCategory } = useDisclosure();
    const { isOpen: isOpenChange, onClose: onCloseChange, onOpen: onOpenChange } = useDisclosure();
    const toast = useToast();

    let filteredCategories = categories.filter((category) => {
        return category.categoryName.toLowerCase().includes(keyword.toLowerCase())
    })

    const apiChange = new ApiClient<any>(`/category/change-status`);

    const handleChangeStatus = async () => {
        const dataChange = {
            categoryId: id,
            categoryStatus: !status
        }
        try {
            const response = await apiChange.update(dataChange);
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
                refetch && refetch()
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
            onCloseChange();
        }
    }

    useEffect(() => {
        changeTabTitle('Categories Settings');
    }, []);

    useEffect(() => {
        if (categoryData)
            setCategories(categoryData);
    }, [categoryData]);

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
                            {hideImage ? (
                                <Button
                                    leftIcon={<FaSliders />}
                                    colorScheme="blue"
                                    onClick={() => setHideImage(false)}
                                >
                                    Unhide
                                </Button>
                            ) : (
                                <Button
                                    leftIcon={<FaSliders />}
                                    colorScheme="blue"
                                    onClick={() => setHideImage(true)}
                                >
                                    Hide
                                </Button>
                            )}
                        </HStack>
                    </CardHeader>
                    <Divider borderColor={'gainsboro'} />
                    <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th textAlign='center' borderColor={'gainsboro'}>ID</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'} maxW={100}>Category Image</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Category Name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Create Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Modified Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoading ? (
                                    <>
                                        {filteredCategories.length !== 0 ? (
                                            <>
                                                {filteredCategories.map((category) => (
                                                    <Tr key={category.id} _hover={{ bg: 'gray.100' }}>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {category.id}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {hideImage ? (
                                                                <Text fontSize={16}>Click unhide to view</Text>
                                                            ) : (
                                                                <>
                                                                    <Image
                                                                        src={category.categoryImage}
                                                                        w={100}
                                                                        h={47}
                                                                        m={'auto'}
                                                                    />
                                                                </>
                                                            )}

                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {category.categoryName}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {formatDate(category.createdDate)}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {formatDateTime(category.modifiedDate)}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            <Tag colorScheme={category.status ? 'green' : 'red'}>
                                                                <TagLabel>
                                                                    {category.status ? 'ACTIVE' : 'INACTIVE'}
                                                                </TagLabel>
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
                                                                    setId(category.id);
                                                                    setType('detail')
                                                                    onOpenCategory();
                                                                }}
                                                            >
                                                                <Tooltip label='Show category information'>
                                                                    <span>
                                                                        <FaEye />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                            <Button
                                                                borderRadius='full'
                                                                px={3}
                                                                colorScheme="gray"
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setId(category.id);
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
                                                                colorScheme="blue"
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setId(category.id);
                                                                    setStatus(category.status)
                                                                    onOpenChange();
                                                                }}
                                                            >
                                                                <Tooltip label='Change status'>
                                                                    <span>
                                                                        <FaArrowRightArrowLeft />
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
                                                    No category
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
                </Card>
            </Stack>
            <CategoryModal
                isOpen={isOpenCategory}
                onClose={onCloseCategory}
                id={id}
                type={type}
                refetch={refetch}
            />
            <ChangeStatusModal
                isOpen={isOpenChange}
                onClose={onCloseChange}
                type="category"
                handleChangeStatus={handleChangeStatus}
            />
        </Stack>
    )
}

export default CategoriesSettingsPage;