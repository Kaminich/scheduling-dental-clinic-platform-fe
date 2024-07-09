import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaArrowRightArrowLeft, FaChevronRight, FaSliders } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { useNavigate } from "react-router";
import { Color, Shadow } from "../../styles/styles";
import { AddIcon } from "@chakra-ui/icons";
import useUserProfile from "../../hooks/useUserProfile";
import BranchDetailResponse from "../../types/BranchDetailResponse";
import { formatDate } from "../../utils/formatDate";
import Loading from "../../components/loading";
import useBranchByClinicId from "../../hooks/useBranchByClinicId";
import ChangeStatusModal from "../../components/modal/change_status";
import ApiClient from "../../services/apiClient";
import { formatDateTime } from "../../utils/formatDateTime";
import { Status } from "../../types/type.enum";

const ClinicBranchSettingsPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [status, setStatus] = useState<string>('');
    const [branches, setBranches] = useState<BranchDetailResponse[]>([]);
    const { data: userData } = useUserProfile();
    const { data: branchData, isLoading, refetch } = useBranchByClinicId({ clinicId: userData?.clinicId })
    const { isOpen: isOpenChange, onClose: onCloseChange, onOpen: onOpenChange } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();
    const api = new ApiClient<any>('branch');

    let filteredBranches = branches.filter((branch) => {
        return branch.branchName.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleChangeStatus = async () => {
        if (status === 'INACTIVE') {
            try {
                const response = await api.updateWithId(id);
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
        } else {
            try {
                const response = await api.delete(id);
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
                console.log(error);

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
    }

    useEffect(() => {
        changeTabTitle('Clinic Branch Settings');
    }, []);

    useEffect(() => {
        if (branchData) {
            setBranches(branchData);
        }
    }, [branchData]);

    console.log(branches);


    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search branch name..."
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
                                onClick={() => navigate('create')}
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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Branch name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>City</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Create Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Modified Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoading ? (
                                    <>
                                        {filteredBranches.length !== 0 ? (
                                            <>
                                                {filteredBranches.map((branch) => (
                                                    <Tr key={branch.branchId} _hover={{ bg: 'gray.100' }}>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {branch.branchId}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {branch.branchName}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {branch.city}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {formatDate(branch.createdDate)}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {formatDateTime(branch.modifiedDate)}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            <Tag
                                                                colorScheme={
                                                                    branch.status === 'ACTIVE'
                                                                        ? 'green'
                                                                        : 'red'
                                                                }
                                                            >
                                                                <TagLabel>
                                                                    {branch.status}
                                                                </TagLabel>
                                                            </Tag>
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                            p={1}
                                                        >
                                                            <Button
                                                                borderRadius='full'
                                                                px={3}
                                                                colorScheme={
                                                                    branch.status === Status.ACTIVE
                                                                        ? 'red'
                                                                        : 'green'
                                                                }
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setId(branch.branchId);
                                                                    setStatus(branch.status)
                                                                    onOpenChange();
                                                                }}
                                                            >
                                                                <Tooltip
                                                                    label=
                                                                    {
                                                                        branch.status === Status.ACTIVE
                                                                            ? 'Deactivate branch'
                                                                            : 'Activate branch'
                                                                    }
                                                                >
                                                                    <span>
                                                                        <FaArrowRightArrowLeft />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                            cursor={'pointer'}
                                                            onClick={() => navigate(branch.branchId.toString())}
                                                        >
                                                            <FaChevronRight />
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={8} textAlign="center">
                                                    No branch
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
            <ChangeStatusModal
                isOpen={isOpenChange}
                onClose={onCloseChange}
                type="branch"
                handleChangeStatus={handleChangeStatus}
            />
        </Stack>
    )
}

export default ClinicBranchSettingsPage;