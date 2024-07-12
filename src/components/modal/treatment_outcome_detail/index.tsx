import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Loading from "../../loading";
import ApiClient from "../../../services/apiClient";
import useTreatmentOutcomeDetail from "../../../hooks/useTreatmentOutcomeDetail";
import TreatmentOutcomeResponse, { initialTreatmentOutcomeResponse } from "../../../types/TreatmentOutcomeResponse";
import { formatDate } from "../../../utils/formatDate";
import { FaTrashCan } from "react-icons/fa6";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const TreatmentOutcomeDetailModal = ({ isOpen, onClose, id }: Props) => {
    const toast = useToast();
    const [type, setType] = useState<string>('detail');
    const [deleteId, setDeleteId] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: treatmentData, refetch } = useTreatmentOutcomeDetail({ appointmentId: id });
    const [treatment, setTreatment] = useState<TreatmentOutcomeResponse>(initialTreatmentOutcomeResponse);

    const handleRemove = async () => {
        setIsLoading(true);
        const api = new ApiClient<any>('treatment-outcome');
        try {
            const response = await api.delete(deleteId);
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
                    <ModalHeader textAlign={'center'}>Treatment Outcome Detail</ModalHeader>
                    <ModalCloseButton borderRadius={'full'} />
                    <ModalBody maxH={'xl'} overflowY={'auto'} mx={5}>
                        {treatmentData ? (
                            <>
                                {type === 'detail' && (
                                    <Stack gap={4}>
                                        <HStack justify={'flex-end'}>
                                            <Button
                                                borderRadius='full'
                                                px={3}
                                                colorScheme="red"
                                                variant='ghost'
                                                onClick={() => {
                                                    setDeleteId(treatment.id);
                                                    setType('remove');
                                                }}
                                            >
                                                <FaTrashCan />
                                            </Button>
                                        </HStack>
                                        <Stack flex={1} gap={2}>
                                            <FormControl id="fullname" flex={2}>
                                                <FormLabel ml={1}>Full Name</FormLabel>
                                                <Input value={'appointment.customerName'} readOnly />
                                            </FormControl>
                                            <FormControl id="followUpDate" flex={1}>
                                                <FormLabel ml={1}>Follow-up Date</FormLabel>
                                                <Input
                                                    value={formatDate(treatment.followUpDate)}
                                                    readOnly
                                                />
                                            </FormControl>
                                            <FormControl id="diagnosis" flex={1.5}>
                                                <FormLabel ml={1} pl={1}>Diagnosis</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={treatment.diagnosis}
                                                    placeholder="Enter diagnosis"
                                                    readOnly
                                                />
                                            </FormControl>
                                            <FormControl id="prescription" flex={1.5}>
                                                <FormLabel ml={1}>Prescription</FormLabel>
                                                <Input
                                                    type="text"
                                                    value={treatment.prescription}
                                                    placeholder="Enter prescription"
                                                    readOnly
                                                />
                                            </FormControl>
                                            <FormControl id="recommendation" flex={1}>
                                                <FormLabel ml={1}>Recommendation</FormLabel>
                                                <Textarea
                                                    value={treatment.recommendations}
                                                    readOnly
                                                    focusBorderColor='#E2E8F0'
                                                    resize={'none'}
                                                    maxH={32}
                                                    minH={32}
                                                />
                                            </FormControl>
                                            <FormControl id="treatmentPlan">
                                                <FormLabel ml={1}>Treatment Plan</FormLabel>
                                                <Textarea
                                                    value={treatment.treatmentPlan}
                                                    readOnly
                                                    focusBorderColor='#E2E8F0'
                                                    resize={'none'}
                                                    maxH={32}
                                                    minH={32}
                                                />
                                            </FormControl>
                                        </Stack>
                                    </Stack>
                                )}
                                {type === 'remove' && (
                                    <Text>Are you sure you want to remove this treatment outcome?</Text>
                                )}
                            </>
                        ) : (
                            <Text>This appointment has no treatment outcome</Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {type === 'remove' && (
                            <Button colorScheme='blue' mr={3} onClick={handleRemove}>Remove</Button>
                        )}
                        <Button
                            colorScheme='gray'
                            mr={3}
                            onClick={() => {
                                setType('detail');
                                onClose();
                            }}
                        >
                            Close
                        </Button>
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

export default TreatmentOutcomeDetailModal