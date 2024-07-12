import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Loading from "../../loading";
import ApiClient from "../../../services/apiClient";
import { today } from "../appointment";
import TreatmentOutcomeResponse, { initialTreatmentOutcomeResponse } from "../../../types/TreatmentOutcomeResponse";
import useTreatmentOutcomeDetail from "../../../hooks/useTreatmentOutcomeDetail";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const UpdateTreatmentOutcomeModal = ({ isOpen, onClose, id }: Props) => {
    const [diagnosis, setDiagnosis] = useState<string>("");
    const [treatmentPlan, setTreatmentPlan] = useState<string>("");
    const [prescription, setPrescription] = useState<string>("");
    const [recommendations, setRecommendations] = useState<string>("");
    const [followUpDate, setFollowUpDate] = useState<string>("");
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: treatmentData, refetch } = useTreatmentOutcomeDetail({ appointmentId: id });
    const [treatment, setTreatment] = useState<TreatmentOutcomeResponse>(initialTreatmentOutcomeResponse);

    const getTreatment = () => {
        setDiagnosis(treatment.diagnosis);
        setTreatmentPlan(treatment.treatmentPlan);
        setFollowUpDate(treatment.followUpDate);
        setRecommendations(treatment.recommendations);
        setPrescription(treatment.prescription);
    }

    const handleUpdate = async () => {
        setIsLoading(true);
        const api = new ApiClient<any>('/appointment');
        const data = {
            diagnosis: "",
            treatmentPlan: "",
            prescription: "",
            recommendations: "",
            followUpDate: "",
            appointmentId: id
        }

        try {
            const response = await api.updateWithIdAndData(treatment.id, data);
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
        if (treatmentData) {
            setTreatment(treatmentData);
        }
    }, [treatmentData])

    useEffect(() => {
        getTreatment();
    }, [treatment])

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
                    <ModalHeader textAlign={'center'}>Update Treatment Outcome</ModalHeader>
                    <ModalCloseButton borderRadius={'full'} />
                    <ModalBody maxH={'xl'} overflowY={'auto'} mx={5}>
                        <Stack gap={4}>
                            <HStack gap={10} align={'flex-start'}>
                                <Stack flex={1} gap={2}>
                                    <FormControl id="fullname" flex={2}>
                                        <FormLabel ml={1}>Full Name</FormLabel>
                                        <Input value={'appointment.customerName'} readOnly />
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
                                    <FormControl id="prescription" flex={1.5}>
                                        <FormLabel ml={1}>Prescription</FormLabel>
                                        <Input
                                            type="text"
                                            value={prescription}
                                            onChange={(e) => setPrescription(e.target.value)}
                                            placeholder="Enter prescription"
                                            required
                                        />
                                    </FormControl>
                                    <FormControl id="recommendation" flex={1}>
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
                                    <FormControl id="treatmentPlan">
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
                            onClick={handleUpdate}
                            isDisabled={
                                followUpDate === '' ||
                                diagnosis === '' ||
                                prescription === '' ||
                                recommendations === '' ||
                                treatmentPlan === ''
                            }
                        >
                            Save
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

export default UpdateTreatmentOutcomeModal