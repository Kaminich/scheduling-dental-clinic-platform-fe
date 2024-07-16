import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaChevronRight, FaEye, FaSliders, FaTrashCan, FaUserCheck, FaUserDoctor, FaUserNurse, FaUserXmark } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { Link, useNavigate } from "react-router-dom";
import { Color, Shadow } from "../../styles/styles";
import { AddIcon } from "@chakra-ui/icons";
import { Status } from "../../types/type.enum";
import useClinicAccounts from "../../hooks/useClinicAccounts";
import { useAuth } from "../../hooks/useAuth";
import ClinicStaffAndDentistResponse, { initialClinicStaffAndDentistResponse } from "../../types/ClinicStaffAndDentistResponse";
import Loading from "../../components/loading";
import ApiClient from "../../services/apiClient";
import DeleteModal from "../../components/modal/delete";
import ActivateModal from "../../components/modal/activate";
import useAccount from "../../hooks/useAccount";
import AccountListResponse from "../../types/AccountListResponse";
import LoadingModal from "../../components/modal/loading";

const AccountSettingsPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const { role } = useAuth();
    const [clinicAccounts, setClinicAccounts] = useState<ClinicStaffAndDentistResponse>(initialClinicStaffAndDentistResponse);
    const [accounts, setAccounts] = useState<AccountListResponse[]>([]);
    const { data: clinicAccountData, isLoading: isLoadingClinicAccount, refetch: refetchClinicAccount } = useClinicAccounts();
    const { data: accountData, isLoading: isLoadingAccount, refetch: refetchAccount } = useAccount();
    const { isOpen: isOpenDeactivate, onClose: onCloseDeactivate, onOpen: onOpenDeactivate } = useDisclosure();
    const { isOpen: isOpenActivate, onClose: onCloseActivate, onOpen: onOpenActivate } = useDisclosure();
    const { isOpen: isOpenLoading, onClose: onCloseLoading, onOpen: onOpenLoading } = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();

    const filteredClinicAccounts = {
        staffList: clinicAccounts.staffList.filter((account) =>
            account.fullName.toLowerCase().includes(keyword.toLowerCase())
        ),
        dentistList: clinicAccounts.dentistList.filter((account) =>
            account.fullName.toLowerCase().includes(keyword.toLowerCase())
        ),
    };

    let filteredAccounts = accounts.filter((account) => {
        return account.roleName.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleActivate = async () => {
        onOpenLoading();
        onCloseActivate();
        if (type === 'dentist') {
            try {
                const api = new ApiClient<any>(`/dentists/re-activate`);
                const response = await api.updateWithId(id);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    refetchClinicAccount && refetchClinicAccount();
                    refetchAccount && refetchAccount();
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
                onCloseLoading();
            }
        } else if (type === 'staff') {
            const api = new ApiClient<any>(`/staff`);
            try {
                const response = await api.updateWithId(id);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    refetchClinicAccount && refetchClinicAccount();
                    refetchAccount && refetchAccount();
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
                onCloseLoading();
            }
        } else if (type === 'owner') {
            const api = new ApiClient<any>(`/accounts/owner/activate-deactivate`);
            try {
                const response = await api.updateWithId(id);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    refetchAccount && refetchAccount();
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
                onCloseLoading();
            }
        } else if (type === 'customer') {
            const api = new ApiClient<any>(`/accounts/customer/activate-deactivate`);
            try {
                const response = await api.updateWithId(id);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    refetchAccount && refetchAccount();
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
                onCloseLoading();
            }
        }
    }

    const handleDeactivate = async () => {
        onOpenLoading();
        onCloseDeactivate();
        if (type === 'dentist') {
            try {
                const api = new ApiClient<any>(`/dentists`);
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
                    refetchClinicAccount && refetchClinicAccount();
                    refetchAccount && refetchAccount();
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
                onCloseLoading();
            }
        } else if (type === 'staff') {
            const api = new ApiClient<any>(`/staff`);
            try {
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
                    refetchClinicAccount && refetchClinicAccount();
                    refetchAccount && refetchAccount();
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
                onCloseLoading();
            }
        } else if (type === 'owner') {
            const api = new ApiClient<any>(`/accounts/owner/activate-deactivate`);
            try {
                const response = await api.updateWithId(id);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    refetchAccount && refetchAccount();
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
                onCloseLoading();
            }
        } else if (type === 'customer') {
            const api = new ApiClient<any>(`/accounts/customer/activate-deactivate`);
            try {
                const response = await api.updateWithId(id);
                if (response.success) {
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                    refetchAccount && refetchAccount();
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
                onCloseLoading();
            }
        }
    }

    useEffect(() => {
        changeTabTitle('Account Settings');
    }, []);

    useEffect(() => {
        if (clinicAccountData && role === 'Owner') {
            setClinicAccounts(clinicAccountData);
        } else if (accountData && role === 'Admin') {
            setAccounts(accountData.content);
        }
    }, [clinicAccountData, accountData]);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search username..."
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
                            {role === 'Owner' && (
                                <Menu autoSelect={false} isLazy>
                                    <MenuButton
                                        leftIcon={<AddIcon />}
                                        as={Button}
                                        fontSize={16}
                                        colorScheme="green"
                                    >
                                        Create
                                    </MenuButton>
                                    <MenuList minW={36}>
                                        <MenuItem
                                            as={Link}
                                            to={'create-dentist'}
                                            gap={4}
                                        >
                                            <FaUserDoctor /> Dentist
                                        </MenuItem>
                                        <MenuItem
                                            as={Link}
                                            to={'create-staff'}
                                            gap={4}
                                        >
                                            <FaUserNurse /> Staff
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                            <Button leftIcon={<FaSliders />} colorScheme="blue">Filter</Button>
                        </HStack>
                    </CardHeader>
                    <Divider borderColor={'gainsboro'} />
                    <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr borderColor={'gainsboro'}>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Username</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Full name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Role</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}></Th>
                                </Tr>
                            </Thead>
                            {role === 'Owner' ? (
                                <Tbody>
                                    {!isLoadingClinicAccount ? (
                                        <>
                                            {(filteredClinicAccounts.dentistList.length !== 0 && filteredClinicAccounts.staffList.length !== 0) ? (
                                                <>
                                                    {filteredClinicAccounts.dentistList.map((account) => (
                                                        <Tr key={account.dentistId} _hover={{ bg: 'gray.100' }}>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>{account.username || '-'}</Td>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>{account.fullName}</Td>
                                                            <Td textAlign='center' borderColor={'gainsboro'}>{'Dentist'}</Td>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>
                                                                {account.status === Status.ACTIVE && (
                                                                    <Tag colorScheme="green">
                                                                        <TagLabel>
                                                                            {account.status}
                                                                        </TagLabel>
                                                                    </Tag>
                                                                )}
                                                                {account.status === Status.INACTIVE && (
                                                                    <Tag colorScheme="red">
                                                                        <TagLabel>
                                                                            {account.status}
                                                                        </TagLabel>
                                                                    </Tag>
                                                                )}
                                                                {account.status === Status.PENDING && (
                                                                    <Tag colorScheme="yellow">
                                                                        <TagLabel>
                                                                            {account.status}
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
                                                                {account.status === Status.ACTIVE && (
                                                                    <Button
                                                                        borderRadius='full'
                                                                        px={3}
                                                                        colorScheme="red"
                                                                        variant='ghost'
                                                                        onClick={() => {
                                                                            setType('dentist');
                                                                            setId(account.dentistId);
                                                                            onOpenDeactivate();
                                                                        }}
                                                                    >
                                                                        <Tooltip label='Deactivate user account'>
                                                                            <span>
                                                                                <FaUserXmark />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </Button>
                                                                )}
                                                                {account.status === Status.INACTIVE && (
                                                                    <Button
                                                                        borderRadius='full'
                                                                        px={3}
                                                                        colorScheme="green"
                                                                        variant='ghost'
                                                                        onClick={() => {
                                                                            setType('dentist');
                                                                            setId(account.dentistId);
                                                                            onOpenActivate();
                                                                        }}
                                                                    >
                                                                        <Tooltip label='Activate user account'>
                                                                            <span>
                                                                                <FaUserCheck />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </Button>
                                                                )}
                                                                {account.status === Status.PENDING && (
                                                                    <Button
                                                                        borderRadius='full'
                                                                        px={3}
                                                                        colorScheme="red"
                                                                        variant='ghost'
                                                                    >
                                                                        <Tooltip label='Remove user account'>
                                                                            <span>
                                                                                <FaTrashCan />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </Button>
                                                                )}
                                                            </Td>
                                                            <Td
                                                                textAlign='center'
                                                                borderColor={'gainsboro'}
                                                                cursor={'pointer'}
                                                                onClick={() => navigate(`dentist/${account.dentistId}`)}
                                                            >
                                                                <FaChevronRight />
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                    {filteredClinicAccounts.staffList.map((account) => (
                                                        <Tr key={account.id} _hover={{ bg: 'gray.100' }}>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>{account.username}</Td>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>{account.fullName}</Td>
                                                            <Td textAlign='center' borderColor={'gainsboro'}>{'Staff'}</Td>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>
                                                                {account.status === Status.ACTIVE && (
                                                                    <Tag colorScheme="green">
                                                                        <TagLabel>
                                                                            {account.status}
                                                                        </TagLabel>
                                                                    </Tag>
                                                                )}
                                                                {account.status === Status.INACTIVE && (
                                                                    <Tag colorScheme="red">
                                                                        <TagLabel>
                                                                            {account.status}
                                                                        </TagLabel>
                                                                    </Tag>
                                                                )}
                                                                {account.status === Status.PENDING && (
                                                                    <Tag colorScheme="yellow">
                                                                        <TagLabel>
                                                                            {account.status}
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
                                                                {account.status === Status.ACTIVE && (
                                                                    <Button
                                                                        borderRadius='full'
                                                                        px={3}
                                                                        colorScheme="red"
                                                                        variant='ghost'
                                                                        onClick={() => {
                                                                            setType('staff');
                                                                            setId(account.id);
                                                                            onOpenDeactivate();
                                                                        }}
                                                                    >
                                                                        <Tooltip label='Deactivate user account'>
                                                                            <span>
                                                                                <FaUserXmark />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </Button>
                                                                )}
                                                                {account.status === Status.INACTIVE && (
                                                                    <Button
                                                                        borderRadius='full'
                                                                        px={3}
                                                                        colorScheme="green"
                                                                        variant='ghost'
                                                                        onClick={() => {
                                                                            setType('staff');
                                                                            setId(account.id);
                                                                            onOpenActivate();
                                                                        }}
                                                                    >
                                                                        <Tooltip label='Activate user account'>
                                                                            <span>
                                                                                <FaUserCheck />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </Button>
                                                                )}
                                                                {account.status === Status.PENDING && (
                                                                    <Button
                                                                        borderRadius='full'
                                                                        px={3}
                                                                        colorScheme="red"
                                                                        variant='ghost'
                                                                    >
                                                                        <Tooltip label='Remove user account'>
                                                                            <span>
                                                                                <FaTrashCan />
                                                                            </span>
                                                                        </Tooltip>
                                                                    </Button>
                                                                )}
                                                            </Td>
                                                            <Td
                                                                textAlign='center'
                                                                borderColor={'gainsboro'}
                                                                cursor={'pointer'}
                                                                onClick={() => navigate(`staff/${account.id}`)}
                                                            >
                                                                <FaChevronRight />
                                                            </Td>
                                                        </Tr>
                                                    ))}
                                                </>
                                            ) : (
                                                <Tr>
                                                    <Td colSpan={8} textAlign="center">
                                                        No account
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
                            ) : (
                                <Tbody>
                                    {!isLoadingAccount ? (
                                        <>
                                            {filteredAccounts.length !== 0 ? (
                                                <>
                                                    {filteredAccounts.map((account, index) => (
                                                        <Tr key={index} _hover={{ bg: 'gray.100' }}>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>{account.username || '-'}</Td>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>{account.fullName || '-'}</Td>
                                                            <Td textAlign='center' borderColor={'gainsboro'} textTransform={'capitalize'}>{account.roleName.toLowerCase()}</Td>
                                                            <Td textAlign="center" borderColor={'gainsboro'}>
                                                                {account.status === Status.ACTIVE && (
                                                                    <Tag colorScheme="green">
                                                                        <TagLabel>
                                                                            {account.status}
                                                                        </TagLabel>
                                                                    </Tag>
                                                                )}
                                                                {account.status === Status.INACTIVE && (
                                                                    <Tag colorScheme="red">
                                                                        <TagLabel>
                                                                            {account.status}
                                                                        </TagLabel>
                                                                    </Tag>
                                                                )}
                                                            </Td>
                                                            {account.roleName === 'OWNER' && (
                                                                <>
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
                                                                        {account.status === Status.ACTIVE && (
                                                                            <Button
                                                                                borderRadius='full'
                                                                                px={3}
                                                                                colorScheme="red"
                                                                                variant='ghost'
                                                                                onClick={() => {
                                                                                    setType('owner');
                                                                                    setId(account.id);
                                                                                    onOpenDeactivate();
                                                                                }}
                                                                            >
                                                                                <Tooltip label='Deactivate user account'>
                                                                                    <span>
                                                                                        <FaUserXmark />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Button>
                                                                        )}
                                                                        {account.status === Status.INACTIVE && (
                                                                            <Button
                                                                                borderRadius='full'
                                                                                px={3}
                                                                                colorScheme="green"
                                                                                variant='ghost'
                                                                                onClick={() => {
                                                                                    setType('owner');
                                                                                    setId(account.id);
                                                                                    onOpenActivate();
                                                                                }}
                                                                            >
                                                                                <Tooltip label='Activate user account'>
                                                                                    <span>
                                                                                        <FaUserCheck />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Button>
                                                                        )}
                                                                    </Td>
                                                                    <Td
                                                                        textAlign='center'
                                                                        borderColor={'gainsboro'}
                                                                        cursor={'pointer'}
                                                                        onClick={() => navigate(``)}
                                                                    >
                                                                        <FaChevronRight />
                                                                    </Td>
                                                                </>
                                                            )}
                                                            {account.roleName === 'CUSTOMER' && (
                                                                <>
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
                                                                        {account.status === Status.ACTIVE && (
                                                                            <Button
                                                                                borderRadius='full'
                                                                                px={3}
                                                                                colorScheme="red"
                                                                                variant='ghost'
                                                                                onClick={() => {
                                                                                    setType('customer');
                                                                                    setId(account.id);
                                                                                    onOpenDeactivate();
                                                                                }}
                                                                            >
                                                                                <Tooltip label='Deactivate user account'>
                                                                                    <span>
                                                                                        <FaUserXmark />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Button>
                                                                        )}
                                                                        {account.status === Status.INACTIVE && (
                                                                            <Button
                                                                                borderRadius='full'
                                                                                px={3}
                                                                                colorScheme="green"
                                                                                variant='ghost'
                                                                                onClick={() => {
                                                                                    setType('customer');
                                                                                    setId(account.id);
                                                                                    onOpenActivate();
                                                                                }}
                                                                            >
                                                                                <Tooltip label='Activate user account'>
                                                                                    <span>
                                                                                        <FaUserCheck />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Button>
                                                                        )}
                                                                    </Td>
                                                                    <Td
                                                                        textAlign='center'
                                                                        borderColor={'gainsboro'}
                                                                        cursor={'pointer'}
                                                                        onClick={() => navigate(``)}
                                                                    >
                                                                        <FaChevronRight />
                                                                    </Td>
                                                                </>
                                                            )}
                                                            {account.roleName === 'DENTIST' && (
                                                                <>
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
                                                                        {account.status === Status.ACTIVE && (
                                                                            <Button
                                                                                borderRadius='full'
                                                                                px={3}
                                                                                colorScheme="red"
                                                                                variant='ghost'
                                                                                onClick={() => {
                                                                                    setType('dentist');
                                                                                    setId(account.id);
                                                                                    onOpenDeactivate();
                                                                                }}
                                                                            >
                                                                                <Tooltip label='Deactivate user account'>
                                                                                    <span>
                                                                                        <FaUserXmark />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Button>
                                                                        )}
                                                                        {account.status === Status.INACTIVE && (
                                                                            <Button
                                                                                borderRadius='full'
                                                                                px={3}
                                                                                colorScheme="green"
                                                                                variant='ghost'
                                                                                onClick={() => {
                                                                                    setType('dentist');
                                                                                    setId(account.id);
                                                                                    onOpenActivate();
                                                                                }}
                                                                            >
                                                                                <Tooltip label='Activate user account'>
                                                                                    <span>
                                                                                        <FaUserCheck />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Button>
                                                                        )}
                                                                    </Td>
                                                                    <Td
                                                                        textAlign='center'
                                                                        borderColor={'gainsboro'}
                                                                        cursor={'pointer'}
                                                                        onClick={() => navigate(`dentist/${account.id}`)}
                                                                    >
                                                                        <FaChevronRight />
                                                                    </Td>
                                                                </>
                                                            )}
                                                            {account.roleName === 'STAFF' && (
                                                                <>
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
                                                                        {account.status === Status.ACTIVE && (
                                                                            <Button
                                                                                borderRadius='full'
                                                                                px={3}
                                                                                colorScheme="red"
                                                                                variant='ghost'
                                                                                onClick={() => {
                                                                                    setType('staff');
                                                                                    setId(account.id);
                                                                                    onOpenDeactivate();
                                                                                }}
                                                                            >
                                                                                <Tooltip label='Deactivate user account'>
                                                                                    <span>
                                                                                        <FaUserXmark />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Button>
                                                                        )}
                                                                        {account.status === Status.INACTIVE && (
                                                                            <Button
                                                                                borderRadius='full'
                                                                                px={3}
                                                                                colorScheme="green"
                                                                                variant='ghost'
                                                                                onClick={() => {
                                                                                    setType('staff');
                                                                                    setId(account.id);
                                                                                    onOpenActivate();
                                                                                }}
                                                                            >
                                                                                <Tooltip label='Activate user account'>
                                                                                    <span>
                                                                                        <FaUserCheck />
                                                                                    </span>
                                                                                </Tooltip>
                                                                            </Button>
                                                                        )}
                                                                    </Td>
                                                                    <Td
                                                                        textAlign='center'
                                                                        borderColor={'gainsboro'}
                                                                        cursor={'pointer'}
                                                                        onClick={() => navigate(`staff/${account.id}`)}
                                                                    >
                                                                        <FaChevronRight />
                                                                    </Td>
                                                                </>
                                                            )}
                                                            {account.roleName === 'ADMIN' && (
                                                                <>
                                                                    <Td
                                                                        p={1}
                                                                        textAlign='center'
                                                                        gap={4}
                                                                        borderColor={'gainsboro'}
                                                                    >
                                                                        -
                                                                    </Td>
                                                                    <Td
                                                                        borderColor={'gainsboro'}
                                                                        cursor={'pointer'}
                                                                        onClick={() => navigate(`staff/${account.id}`)}
                                                                    >
                                                                        -
                                                                    </Td>
                                                                </>
                                                            )}
                                                        </Tr>
                                                    ))}
                                                </>
                                            ) : (
                                                <Tr>
                                                    <Td colSpan={8} textAlign="center">
                                                        No account
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
                            )}
                        </Table>
                    </TableContainer>
                </Card>
            </Stack>
            <DeleteModal
                isOpen={isOpenDeactivate}
                onClose={onCloseDeactivate}
                type={type}
                handleDeactivate={handleDeactivate}
            />
            <ActivateModal
                isOpen={isOpenActivate}
                onClose={onCloseActivate}
                type={type}
                handleActivate={handleActivate}
            />
            <LoadingModal
                isOpen={isOpenLoading}
                onClose={onCloseLoading}
            />
        </Stack>
    )
}

export default AccountSettingsPage;