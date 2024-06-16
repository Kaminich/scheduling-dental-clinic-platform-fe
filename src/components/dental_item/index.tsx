import { TimeIcon } from "@chakra-ui/icons"
import { Button, Card, CardBody, CardFooter, HStack, Heading, Image, Stack, Tag, TagLabel, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { FaLocationDot } from "react-icons/fa6"
import { useState } from "react";
import FeedbackModal from "../modal/feedback";
import AppointmentModal from "../modal/appointment";
import { useNavigate } from "react-router-dom";
import { Color } from "../../styles/styles";
import { useAuth } from "../../hooks/useAuth";

const DentalItem = () => {
    const { isOpen: isOpenFeedback, onOpen: onOpenFeedback, onClose: onCloseFeedback } = useDisclosure();
    const { isOpen: isOpenAppointment, onOpen: onOpenAppointment, onClose: onCloseAppointment } = useDisclosure();

    const [dentalData, setDentalData] = useState({
        id: '1',
        name: 'HCM'
    });

    const { role } = useAuth();

    const navigate = useNavigate();

    return (
        <>
            <Card bg={Color.blue_100}>
                <CardBody pb={0}>
                    <HStack align={'flex-start'}>
                        <Image
                            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                            w={0}
                            flex={1}
                        />
                        <Heading
                            flex={2}
                            my={1}
                            size='md'
                            textAlign={'center'}
                            noOfLines={3}
                            _hover={{ color: Color.hoverBlue }}
                            cursor={'pointer'}
                            onClick={() => navigate('/dental-detail')}
                        >
                            Living room Sofa
                        </Heading>
                    </HStack>
                    <Stack mt={5} mx={2}>
                        <HStack>
                            <Tooltip label='Branch location'>
                                <span>
                                    <FaLocationDot />
                                </span>
                            </Tooltip>
                            <Tag
                                size="md"
                                borderRadius="full"
                                variant="solid"
                                colorScheme="orange"
                            >
                                <TagLabel>HN</TagLabel>
                            </Tag>
                            <Tag
                                size="md"
                                borderRadius="full"
                                variant="solid"
                                colorScheme="orange"
                            >
                                <TagLabel>HCM</TagLabel>
                            </Tag>
                        </HStack>
                        <HStack>
                            <Tooltip label='Working hours'>
                                <TimeIcon />
                            </Tooltip>
                            <Tag
                                size="md"
                                borderRadius="full"
                                variant="solid"
                                colorScheme="red"
                            >
                                <TagLabel>
                                    10:00
                                </TagLabel>
                            </Tag>
                            <Text>-</Text>
                            <Tag
                                size="md"
                                borderRadius="full"
                                variant="solid"
                                colorScheme="red"
                            >
                                <TagLabel>
                                    20:00
                                </TagLabel>
                            </Tag>
                        </HStack>
                    </Stack>
                </CardBody>
                <CardFooter gap={4}>
                    <Button variant='solid' colorScheme='blue' flex={1} onClick={onOpenFeedback}>
                        Rating and Feedback
                    </Button>
                    {(role !== 'Staff' && role !== 'Dentist') && (
                        <Button variant='solid' colorScheme='green' flex={1} onClick={onOpenAppointment}>
                            Make appointment
                        </Button>
                    )}
                </CardFooter>
            </Card>
            <FeedbackModal isOpen={isOpenFeedback} onClose={onCloseFeedback} type="ratingfeedback" />
            <AppointmentModal
                isOpen={isOpenAppointment}
                onClose={onCloseAppointment}
                dentalData={dentalData}
                dentistData={''}
                locationData={''}
            />
        </>
    )
}

export default DentalItem