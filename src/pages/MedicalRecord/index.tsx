import { Button, Card, CardBody, CardHeader, FormControl, FormLabel, HStack, Input, Stack, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react"
import { Shadow } from "../../styles/styles"
import { useEffect, useState } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";
import useUserProfile from "../../hooks/useUserProfile";
import useCustomerMedicalRecord from "../../hooks/useCustomerMedicalRecord";
import TreatmentOutcomeResponse from "../../types/TreatmentOutcomeResponse";
import { formatDate } from "../../utils/formatDate";
import { FaCalendarDays } from "react-icons/fa6";
import ReAppointmentModal from "../../components/modal/re_appointment";
import Loading from "../../components/loading";

const MedicalRecordPage = () => {
    const { data: userData } = useUserProfile();
    const { data: medicalData, isLoading } = useCustomerMedicalRecord({ username: userData?.username });
    const [treatments, setTreatments] = useState<TreatmentOutcomeResponse[]>([]);
    const [id, setId] = useState<number>(0);
    const [followUpDate, setFollowUpDate] = useState<string>('');
    const { isOpen: isOpenAppointment, onClose: onCloseAppointment, onOpen: onOpenAppointment } = useDisclosure();

    useEffect(() => {
        changeTabTitle('Medical Record');
    }, []);

    useEffect(() => {
        if (medicalData) {
            setTreatments(medicalData);
        }
    }, [medicalData]);

    return (
        <>
            {!isLoading ? (
                <Stack maxW={'7xl'} mx={'auto'} my={10}>
                    {treatments.map((treatment) => (
                        <Card shadow={Shadow.cardShadow} w={'xl'} key={treatment.id}>
                            <CardHeader mb={-5}>
                                <HStack gap={0} justify={'flex-end'}>
                                    <Button
                                        borderRadius={'full'}
                                        px={3}
                                        colorScheme="blue"
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
                                </HStack>
                            </CardHeader>
                            <CardBody py={7} px={8}>
                                <Stack gap={5}>
                                    <HStack>
                                        <FormControl id="customer" flex={2}>
                                            <FormLabel ml={1}>Customer</FormLabel>
                                            <Input value={treatment.customerName} readOnly />
                                        </FormControl>
                                        <FormControl id="followUpDate" flex={1}>
                                            <FormLabel ml={1}>Follow-up Date</FormLabel>
                                            <Input
                                                value={formatDate(treatment.followUpDate)}
                                                readOnly
                                            />
                                        </FormControl>
                                    </HStack>
                                    <HStack>
                                        <FormControl id="dentist" flex={1}>
                                            <FormLabel ml={1}>Dentist</FormLabel>
                                            <Input value={treatment.dentistName} readOnly />
                                        </FormControl>
                                        <FormControl id="branch" flex={1}>
                                            <FormLabel ml={1}>Clinic Branch</FormLabel>
                                            <Input
                                                value={treatment.clinicBranchName}
                                                readOnly
                                            />
                                        </FormControl>
                                    </HStack>
                                    <FormControl id="diagnosis" flex={1.5}>
                                        <FormLabel ml={1} pl={1}>Diagnosis</FormLabel>
                                        <Input
                                            value={treatment.diagnosis}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl id="prescription" flex={1.5}>
                                        <FormLabel ml={1}>Prescription</FormLabel>
                                        <Input
                                            value={treatment.prescription}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl id="recommendation" flex={1}>
                                        <FormLabel ml={1}>Recommendation</FormLabel>
                                        <Textarea
                                            value={treatment.recommendations}
                                            focusBorderColor='#E2E8F0'
                                            resize={'none'}
                                            maxH={32}
                                            minH={32}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl id="treatmentPlan">
                                        <FormLabel ml={1}>Treatment Plan</FormLabel>
                                        <Textarea
                                            value={treatment.treatmentPlan}
                                            focusBorderColor='#E2E8F0'
                                            resize={'none'}
                                            maxH={32}
                                            minH={32}
                                            readOnly
                                        />
                                    </FormControl>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                    {id && (
                        <ReAppointmentModal
                            isOpen={isOpenAppointment}
                            onClose={onCloseAppointment}
                            id={id}
                            followUpDate={followUpDate}
                        />
                    )}
                </Stack>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default MedicalRecordPage