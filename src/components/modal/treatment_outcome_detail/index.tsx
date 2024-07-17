import { Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Loading from "../../loading";
import useTreatmentOutcomeDetail from "../../../hooks/useTreatmentOutcomeDetail";
import TreatmentOutcomeResponse, { initialTreatmentOutcomeResponse } from "../../../types/TreatmentOutcomeResponse";
import { formatDate } from "../../../utils/formatDate";
import { FaTrashCan } from "react-icons/fa6";
import { useAuth } from "../../../hooks/useAuth";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    handleRemove?: () => void;
}

const TreatmentOutcomeDetailModal = ({ isOpen, onClose, id, handleRemove }: Props) => {
    const [type, setType] = useState<string>('detail');
    const { data: treatmentData, isLoading } = useTreatmentOutcomeDetail({ appointmentId: id });
    const [treatment, setTreatment] = useState<TreatmentOutcomeResponse>(initialTreatmentOutcomeResponse);
    const { role } = useAuth();

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
            size={'2xl'}
            closeOnEsc={isLoading ? false : true}
            closeOnOverlayClick={isLoading ? false : true}
        >
            <ModalOverlay />
            {!isLoading ? (
                <ModalContent>
                    <ModalHeader textAlign={'center'}>Treatment Outcome Detail</ModalHeader>
                    <ModalCloseButton borderRadius={'full'} />
                    <ModalBody maxH={'lg'} overflowY={'auto'} mx={5}>
                        {treatmentData ? (
                            <>
                                {type === 'detail' && (
                                    <Stack gap={4}>
                                        {role !== 'Customer' && (
                                            <HStack justify={'flex-end'}>
                                                <Button
                                                    borderRadius='full'
                                                    px={3}
                                                    colorScheme="red"
                                                    variant='ghost'
                                                    onClick={() => {
                                                        setType('remove');
                                                    }}
                                                >
                                                    <FaTrashCan />
                                                </Button>
                                            </HStack>
                                        )}
                                        <Stack flex={1} gap={2}>
                                            <FormControl id="fullname" flex={2}>
                                                <FormLabel ml={1}>Full Name</FormLabel>
                                                <Input value={treatment.customerName} readOnly />
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
                            <Button colorScheme='red' mr={3} onClick={handleRemove}>Remove</Button>
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