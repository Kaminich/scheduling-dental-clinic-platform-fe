import { Button, Card, CardHeader, Divider, HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure } from "@chakra-ui/react"
import { Color, Shadow } from "../../styles/styles"
import { useEffect, useRef, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useUserProfile from "../../hooks/useUserProfile";
import useCustomerMedicalRecord from "../../hooks/useCustomerMedicalRecord";
import TreatmentOutcomeResponse from "../../types/TreatmentOutcomeResponse";
import { formatDate } from "../../utils/formatDate";
import { FaCalendarDays, FaEye, FaSliders } from "react-icons/fa6";
import ReAppointmentModal from "../../components/modal/re_appointment";
import Loading from "../../components/loading";
import TreatmentOutcomeDetailModal from "../../components/modal/treatment_outcome_detail";
import { BsSearch } from "react-icons/bs";

const MedicalRecordPage = () => {
    const { data: userData } = useUserProfile();
    const { data: medicalData, isLoading } = useCustomerMedicalRecord({ username: userData?.username });
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [treatments, setTreatments] = useState<TreatmentOutcomeResponse[]>([]);
    const [id, setId] = useState<number>(0);
    const [followUpDate, setFollowUpDate] = useState<string>('');
    const { isOpen: isOpenAppointment, onClose: onCloseAppointment, onOpen: onOpenAppointment } = useDisclosure();
    const { isOpen: isOpenDetail, onClose: onCloseDetail, onOpen: onOpenDetail } = useDisclosure();

    let filteredTreatments = treatments.filter((treatment) => {
        return treatment.dentistName.toLowerCase().includes(keyword.toLowerCase())
    })

    useEffect(() => {
        changeTabTitle('Medical Record');
    }, []);

    useEffect(() => {
        if (medicalData) {
            setTreatments(medicalData);
        }
    }, [medicalData]);

    return (
        <Stack w={'7xl'} align='center' mx='auto' my={5} gap={10}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search dentist name..."
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
                                    <Th textAlign='center' borderColor={'gainsboro'}>Dentist</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Clinic Branch</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Follow-up Date</Th>
                                    <Th textAlign='center' borderColor={'gainsboro'}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {!isLoading ? (
                                    <>
                                        {filteredTreatments.length !== 0 ? (
                                            <>
                                                {filteredTreatments.map((treatment) => (
                                                    <Tr key={treatment.id} _hover={{ bg: 'gray.100' }}>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {treatment.id}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {treatment.dentistName}
                                                        </Td>
                                                        <Td
                                                            textAlign='center'
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {treatment.clinicBranchName}
                                                        </Td>
                                                        <Td
                                                            textAlign="center"
                                                            borderColor={'gainsboro'}
                                                        >
                                                            {formatDate(treatment.followUpDate)}
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
                                                                    setId(treatment.appointmentId);
                                                                    onOpenDetail();
                                                                }}
                                                            >
                                                                <Tooltip label='Show medical record detail'>
                                                                    <span>
                                                                        <FaEye />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                            <Button
                                                                borderRadius={'full'}
                                                                px={3}
                                                                colorScheme="green"
                                                                variant={'ghost'}
                                                                onClick={() => {
                                                                    setId(treatment.appointmentId);
                                                                    setFollowUpDate(treatment.followUpDate)
                                                                    onOpenAppointment();
                                                                }}
                                                            >
                                                                <Tooltip label={'Make re-appointment'}>
                                                                    <span>
                                                                        <FaCalendarDays />
                                                                    </span>
                                                                </Tooltip>
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </>
                                        ) : (
                                            <Tr>
                                                <Td colSpan={8} textAlign="center">
                                                    No medical record
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
            {isOpenAppointment && (
                <ReAppointmentModal
                    isOpen={isOpenAppointment}
                    onClose={onCloseAppointment}
                    id={id}
                    followUpDate={followUpDate}
                />
            )}
            {isOpenDetail && (
                <TreatmentOutcomeDetailModal
                    isOpen={isOpenDetail}
                    onClose={onCloseDetail}
                    id={id}
                />
            )}
        </Stack>
    )
}

export default MedicalRecordPage