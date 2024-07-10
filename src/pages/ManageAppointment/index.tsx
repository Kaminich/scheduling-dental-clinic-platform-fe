import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tag, TagLabel, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { FaEye, FaSliders, FaTrashCan } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useAppointment from "../../hooks/useAppointment";
import { Color, Shadow } from "../../styles/styles";
import AppointmentBranchResponse from "../../types/AppointmentBranchResponse";
import Loading from "../../components/loading";
import AppointmentDetailModal from "../../components/modal/appointment_detail";
import { formatDateTime } from "../../utils/formatDateTime";
import { AppointmentStatus } from "../../types/type.enum";
import ApiClient from "../../services/apiClient";
import DeleteModal from "../../components/modal/delete";

const ManageAppointmentPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const { data, isLoading, refetch } = useAppointment();
    const [appointments, setAppointments] = useState<AppointmentBranchResponse[]>([]);
    const { isOpen: isOpenDetail, onClose: onCloseDetail, onOpen: onOpenDetail } = useDisclosure();
    const { isOpen: isOpenCancel, onClose: onCloseCancel, onOpen: onOpenCancel } = useDisclosure();
    const toast = useToast();

    let filteredAppointments = appointments.filter((appointment) => {
        return appointment.customerName.toLowerCase().includes(keyword.toLowerCase())
    })

    const handleCancel = async () => {
        const api = new ApiClient<any>('appointment');
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
            onCloseCancel();
        }
    }

    useEffect(() => {
        changeTabTitle('Manage Appointment');
    }, []);

    useEffect(() => {
        if (data) {
            setAppointments(data);
        }
    }, [data]);

    console.log(appointments);


    return (
        <Stack w={'7xl'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search customer..."
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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Customer</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Dentist</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Service</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Created Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Status</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoading ? (
                                    <>
                                        {filteredAppointments.length !== 0 ? (
                                            <>
                                                {filteredAppointments.map((appointment) => (
                                                    <Tr>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {appointment.appointmentId}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {appointment.customerName}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {appointment.dentistName}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {appointment.service}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {formatDateTime(appointment.createdDate)}
                                                        </Td>
                                                        {appointment.appointmentStatus === AppointmentStatus.PENDING && (
                                                            <Td
                                                                textAlign='center'
                                                                borderColor={'gainsboro'}
                                                            >
                                                                <Tag colorScheme={'yellow'}>
                                                                    <TagLabel>
                                                                        PENDING
                                                                    </TagLabel>
                                                                </Tag>
                                                            </Td>
                                                        )}
                                                        {appointment.appointmentStatus === AppointmentStatus.DONE && (
                                                            <Td
                                                                textAlign='center'
                                                                borderColor={'gainsboro'}
                                                            >
                                                                <Tag colorScheme={'green'}>
                                                                    <TagLabel>
                                                                        DONE
                                                                    </TagLabel>
                                                                </Tag>
                                                            </Td>
                                                        )}
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >

                                                            <Button
                                                                borderRadius='full'
                                                                px={3}
                                                                colorScheme="blue"
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setId(appointment.appointmentId);
                                                                    onOpenDetail();
                                                                }}
                                                            >
                                                                <FaEye />
                                                            </Button>
                                                            <Button
                                                                borderRadius='full'
                                                                px={3}
                                                                colorScheme="red"
                                                                variant='ghost'
                                                                onClick={() => {
                                                                    setId(appointment.appointmentId);
                                                                    onOpenCancel();
                                                                }}
                                                            >
                                                                <FaTrashCan />
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={8} textAlign="center" borderColor={'gainsboro'}>
                                                    No appointment
                                                </Td>
                                            </Tr>
                                        )}
                                    </>
                                ) : (
                                    <Tr>
                                        <Td colSpan={8} textAlign="center" borderColor={'gainsboro'}>
                                            <Loading />
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </Stack>
            <AppointmentDetailModal
                isOpen={isOpenDetail}
                onClose={onCloseDetail}
                id={id}
            />
            <DeleteModal
                isOpen={isOpenCancel}
                onClose={onCloseCancel}
                type="appointment"
                handleDeactivate={handleCancel}
            />
        </Stack>
    )
}

export default ManageAppointmentPage