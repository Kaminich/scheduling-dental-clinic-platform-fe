import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaArrowRightArrowLeft, FaChevronRight, FaSliders } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { useNavigate } from "react-router";
import { Color, Shadow } from "../../styles/styles";
import { AddIcon } from "@chakra-ui/icons";
import ServiceViewListResponse from "../../types/ServiceViewListResponse";
import useUserProfile from "../../hooks/useUserProfile";
import useServiceByClinicId from "../../hooks/useServiceByClinicId";
import Loading from "../../components/loading";
import ChangeStatusModal from "../../components/modal/change_status";
import ApiClient from "../../services/apiClient";
import { formatDate } from "../../utils/formatDate";
import { formatDateTime } from "../../utils/formatDateTime";

const ServicesSettingsPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [status, setStatus] = useState<boolean>(false);
    const [services, setServices] = useState<ServiceViewListResponse[]>([]);
    const { data: userData } = useUserProfile();
    const { data: serviceData, isLoading, refetch } = useServiceByClinicId({ clinicId: userData?.clinicId });
    const navigate = useNavigate();
    const { isOpen: isOpenChange, onClose: onCloseChange, onOpen: onOpenChange } = useDisclosure();
    const toast = useToast();


    let filteredServices = services.filter((service) => {
        return service.serviceName.toLowerCase().includes(keyword.toLowerCase())
    })

    const apiChange = new ApiClient<any>(`/service/change-status`);

    const handleChangeStatus = async () => {
        const dataChange = {
            serviceId: id,
            serviceStatus: !status
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
        changeTabTitle('Services Settings');
    }, []);

    useEffect(() => {
        if (serviceData) {
            setServices(serviceData);
        }
    }, [serviceData]);

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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Service name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Category</Th>
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
                                        {filteredServices.length !== 0 ? (
                                            <>
                                                {filteredServices.map((service) => (
                                                    <Tr key={service.id} _hover={{ bg: 'gray.100' }}>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {service.id}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {service.serviceName}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {service.categoryName}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {formatDate(service.createdDate)}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {formatDateTime(service.modifiedDate)}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            <Tag colorScheme={service.status ? 'green' : 'red'}>
                                                                <TagLabel>
                                                                    {service.status ? 'ACTIVE' : 'INACTIVE'}
                                                                </TagLabel>
                                                            </Tag>
                                                        </Td>
                                                        <Td
                                                            p={1}
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            <Button
                                                                borderRadius='full'
                                                                px={3}
                                                                colorScheme="blue"
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setId(service.id);
                                                                    setStatus(service.status)
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
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                            cursor={'pointer'}
                                                            onClick={() => navigate(service.id.toString())}
                                                        >
                                                            <FaChevronRight />
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={8} textAlign="center">
                                                    No category
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
                type="service"
                handleChangeStatus={handleChangeStatus}
            />
        </Stack>
    )
}

export default ServicesSettingsPage;