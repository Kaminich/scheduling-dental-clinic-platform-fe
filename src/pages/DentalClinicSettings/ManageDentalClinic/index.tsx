import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaArrowRightArrowLeft, FaChevronRight, FaSliders } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../../utils/changeTabTitle";
import { useNavigate } from "react-router";
import { Color, Shadow } from "../../../styles/styles";
import useAllClinics from "../../../hooks/useAllClinics";
import ClinicListResponse from "../../../types/ClinicListResponse";
import Loading from "../../../components/loading";
import { Status } from "../../../types/type.enum";
import { formatDate } from "../../../utils/formatDate";
import { formatDateTime } from "../../../utils/formatDateTime";
import DeleteModal from "../../../components/modal/delete";
import ActivateModal from "../../../components/modal/activate";
import ApiClient from "../../../services/apiClient";

const ManageDentalClinicPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [clinics, setClinics] = useState<ClinicListResponse[]>([]);
    const { data, isLoading, refetch } = useAllClinics();
    const { isOpen: isOpenDeactivate, onClose: onCloseDeactivate, onOpen: onOpenDeactivate } = useDisclosure();
    const { isOpen: isOpenActivate, onClose: onCloseActivate, onOpen: onOpenActivate } = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();

    let filteredClinics = clinics.filter((clinic) => {
        return clinic.clinicName.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleActivate = async () => {
        try {
            const api = new ApiClient<any>(`/clinics/re-activate`);
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
            onCloseActivate();
        }
    }

    const handleDeactivate = async () => {
        try {
            const api = new ApiClient<any>(`/clinics`);
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
            onCloseDeactivate();
        }
    }

    useEffect(() => {
        changeTabTitle('Manage Dental Clinic');
    }, []);

    useEffect(() => {
        if (data?.content) {
            setClinics(data.content);
        }
    }, [data?.content]);

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
                            <Button leftIcon={<FaSliders />} colorScheme="blue">Filter</Button>
                        </HStack>
                    </CardHeader>
                    <Divider borderColor={'gainsboro'} />
                    <TableContainer w='full' overflowY="auto" whiteSpace='normal'>
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th textAlign='center' borderColor={'gainsboro'}>ID</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Clinic name</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Owner</Th>
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
                                        {filteredClinics.length !== 0 ? (
                                            <>
                                                {filteredClinics.map((clinic) => (
                                                    <Tr _hover={{ bg: 'gray.100' }}>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{clinic.clinicId}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{clinic.clinicName}</Td>
                                                        <Td textAlign='center' borderColor={'gainsboro'}>{clinic.ownerName}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{formatDate(clinic.createdDate)}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>{formatDateTime(clinic.modifiedDate)}</Td>
                                                        <Td textAlign="center" borderColor={'gainsboro'}>
                                                            {clinic.status === Status.ACTIVE && (
                                                                <Tag colorScheme="green">
                                                                    <TagLabel>
                                                                        {clinic.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {clinic.status === Status.INACTIVE && (
                                                                <Tag colorScheme="red">
                                                                    <TagLabel>
                                                                        {clinic.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {clinic.status === Status.PENDING && (
                                                                <Tag colorScheme="yellow">
                                                                    <TagLabel>
                                                                        {clinic.status}
                                                                    </TagLabel>
                                                                </Tag>
                                                            )}
                                                            {clinic.status === Status.APPROVED && (
                                                                <Tag colorScheme="cyan">
                                                                    <TagLabel>
                                                                        {clinic.status}
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
                                                            {clinic.status === Status.ACTIVE && (
                                                                <Button
                                                                    borderRadius='full'
                                                                    px={3}
                                                                    colorScheme="red"
                                                                    variant='ghost'
                                                                    onClick={() => {
                                                                        setId(clinic.clinicId);
                                                                        onOpenDeactivate();
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        label={'Deactivate clinic'}
                                                                    >
                                                                        <span>
                                                                            <FaArrowRightArrowLeft />
                                                                        </span>
                                                                    </Tooltip>
                                                                </Button>
                                                            )}
                                                            {clinic.status === Status.INACTIVE && (
                                                                <Button
                                                                    borderRadius='full'
                                                                    px={3}
                                                                    colorScheme="green"
                                                                    variant='ghost'
                                                                    onClick={() => {
                                                                        setId(clinic.clinicId);
                                                                        onOpenActivate();
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        label={'Activate clinic'}
                                                                    >
                                                                        <span>
                                                                            <FaArrowRightArrowLeft />
                                                                        </span>
                                                                    </Tooltip>
                                                                </Button>
                                                            )}
                                                            {clinic.status === Status.PENDING && (
                                                                <Text>-</Text>
                                                            )}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                            cursor={'pointer'}
                                                            onClick={() => navigate(clinic.clinicId.toString())}
                                                        >
                                                            <FaChevronRight />
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={6} textAlign="center">
                                                    No clinic
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
            <DeleteModal
                isOpen={isOpenDeactivate}
                onClose={onCloseDeactivate}
                type={'clinic'}
                handleDeactivate={handleDeactivate}
            />
            <ActivateModal
                isOpen={isOpenActivate}
                onClose={onCloseActivate}
                type={'clinic'}
                handleActivate={handleActivate}
            />
        </Stack>
    )
}

export default ManageDentalClinicPage;