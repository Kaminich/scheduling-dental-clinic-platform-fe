import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Loading from "../../loading";
import useAppointmentDetail from "../../../hooks/useAppoinmentDetail";
import AppointmentViewDetailsResponse, { initialAppointmentViewDetailsResponse } from "../../../types/AppointmentViewDetailsResponse";
import ApiClient from "../../../services/apiClient";
import { today } from "../appointment";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const CreateTreatmentOutcomeModal = ({ isOpen, onClose, id }: Props) => {
    const [diagnosis, setDiagnosis] = useState<string>("");
    const [treatmentPlan, setTreatmentPlan] = useState<string>("");
    const [prescription, setPrescription] = useState<string>("");
    const [recommendations, setRecommendations] = useState<string>("");
    const [followUpDate, setFollowUpDate] = useState<string>("");
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: appointmentData, refetch } = useAppointmentDetail({ appointmentId: id });
    const [appointment, setAppointment] = useState<AppointmentViewDetailsResponse>(initialAppointmentViewDetailsResponse);

    const handleCreateAppointment = async () => {
        setIsLoading(true);
        const api = new ApiClient<any>('/appointment');
        const data = {
            diagnosis: "",
            treatmentPlan: "",
            prescription: "",
            recommendations: "",
            followUpDate: "",
            appointmentId: appointment.appointmentId
        }

        try {
            const response = await api.create(data);
            console.log(response);
            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                })
                refetch && refetch();
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                })
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
            setIsLoading(false);
            onClose();
        }
    }

    useEffect(() => {
        if (appointmentData) {
            setAppointment(appointmentData);
        }
    }, [appointmentData])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size={'5xl'}
            closeOnEsc={isLoading ? false : true}
            closeOnOverlayClick={isLoading ? false : true}
        >
            <ModalOverlay />
            {!isLoading ? (
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Create Treatment Outcome</ModalHeader>
                    <ModalCloseButton borderRadius={'full'} />
                    <ModalBody maxH={'lg'} overflowY={'auto'} mx={5}>
                        <Stack gap={4}>
                            <HStack gap={10} align={'flex-start'}>
                                <Stack flex={1} gap={2}>
                                    <FormControl id="fullname" flex={2}>
                                        <FormLabel ml={1}>Full Name</FormLabel>
                                        <Input value={appointment.customerName} readOnly />
                                    </FormControl>
                                    <FormControl id="followUpDate" flex={1} isRequired>
                                        <FormLabel ml={1}>Follow-up Date</FormLabel>
                                        <Input
                                            type="date"
                                            min={today}
                                            value={followUpDate}
                                            onChange={(e) => setFollowUpDate(e.target.value)}
                                            required
                                        />
                                    </FormControl>
                                    <FormControl id="diagnosis" flex={1.5} isRequired>
                                        <FormLabel ml={1} pl={1}>Diagnosis</FormLabel>
                                        <Input
                                            type="text"
                                            value={diagnosis}
                                            onChange={(e) => setDiagnosis(e.target.value)}
                                            placeholder="Enter diagnosis"
                                            required
                                        />
                                    </FormControl>
                                    <FormControl id="prescription" flex={1.5} isRequired>
                                        <FormLabel ml={1}>Prescription</FormLabel>
                                        <Input
                                            type="text"
                                            value={prescription}
                                            onChange={(e) => setPrescription(e.target.value)}
                                            placeholder="Enter prescription"
                                            required
                                        />
                                    </FormControl>
                                    <FormControl id="recommendation" flex={1} isRequired>
                                        <FormLabel ml={1}>Recommendation</FormLabel>
                                        <Textarea
                                            value={recommendations}
                                            onChange={(e) => setRecommendations(e.target.value)}
                                            placeholder="Enter recommendation"
                                            required
                                            focusBorderColor='#E2E8F0'
                                            resize={'none'}
                                            maxH={32}
                                            minH={32}
                                        />
                                    </FormControl>
                                    <FormControl id="treatmentPlan" isRequired>
                                        <FormLabel ml={1}>Treatment Plan</FormLabel>
                                        <Textarea
                                            value={treatmentPlan}
                                            onChange={(e) => setTreatmentPlan(e.target.value)}
                                            placeholder="Enter treatment plan"
                                            required
                                            focusBorderColor='#E2E8F0'
                                            resize={'none'}
                                            maxH={32}
                                            minH={32}
                                        />
                                    </FormControl>
                                </Stack>
                            </HStack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={handleCreateAppointment}
                            isDisabled={
                                followUpDate === '' ||
                                diagnosis === '' ||
                                prescription === '' ||
                                recommendations === '' ||
                                treatmentPlan === ''
                            }
                        >
                            Create
                        </Button>
                        <Button colorScheme='gray' mr={3} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            ) : (
                <ModalContent>
                    <ModalBody p={6}>
                        <Stack h={170}>
                            <Loading />
                        </Stack>
                    </ModalBody>
                </ModalContent>
            )}
        </Modal >
    )
}

export default CreateTreatmentOutcomeModal