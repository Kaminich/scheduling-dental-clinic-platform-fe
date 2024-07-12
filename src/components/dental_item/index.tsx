import { Button, Card, CardBody, CardFooter, HStack, Heading, Image, Stack, Tag, TagLabel, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { FaCalendarDays, FaLocationDot, FaPhone } from "react-icons/fa6"
import AppointmentModal from "../modal/appointment";
import { useNavigate } from "react-router-dom";
import { Color } from "../../styles/styles";
import { useAuth } from "../../hooks/useAuth";
import ClinicListResponse from "../../types/ClinicListResponse";
import { Rate } from "antd";

interface Prop {
    dentalData: ClinicListResponse;
}

const DentalItem = ({ dentalData }: Prop) => {
    const { isOpen: isOpenAppointment, onOpen: onOpenAppointment, onClose: onCloseAppointment } = useDisclosure();
    const { role } = useAuth();
    const navigate = useNavigate();
    const navigateToDentalDetail = (name: string) => {
        const hyphenatedName = name.replace(/ /g, '-');
        navigate(`/dentals/${hyphenatedName}`);
    };

    console.log(dentalData);


    return (
        <Card bg={Color.blue_100} minW={376}>
            <CardBody pb={0}>
                <HStack align={'flex-start'}>
                    <Image
                        src={dentalData?.clinicName || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}
                        alt='Green double couch with wooden legs'
                        borderRadius='full'
                        w={16}
                        h={16}
                    />
                    <Heading
                        flex={2}
                        my={1}
                        size='md'
                        textAlign={'center'}
                        noOfLines={3}
                        _hover={{ color: Color.hoverBlue }}
                        cursor={'pointer'}
                        onClick={() => navigateToDentalDetail(dentalData?.clinicName)}
                    >
                        {dentalData?.clinicName}
                    </Heading>
                </HStack>
                <Stack mt={8} mx={0}>
                    <HStack>
                        <Tag
                            size="md"
                            borderRadius="full"
                            variant="solid"
                            colorScheme="orange"
                            px={2}
                        >
                            <TagLabel>
                                <Tooltip label='Branch location'>
                                    <span>
                                        <FaLocationDot />
                                    </span>
                                </Tooltip>
                            </TagLabel>
                        </Tag>
                        <Text fontWeight={500} fontSize={16}>{`${dentalData?.address} (${dentalData?.city})`}</Text>
                    </HStack>
                    <HStack gap={1}>
                        <HStack flex={1}>
                            <Tag
                                size="md"
                                borderRadius="full"
                                variant="solid"
                                colorScheme="red"
                            >
                                <TagLabel>
                                    <Tooltip label='Phone Number'>
                                        <FaPhone />
                                    </Tooltip>
                                </TagLabel>
                            </Tag>
                            <Text fontWeight={500} fontSize={16}>{dentalData?.phone}</Text>
                        </HStack>
                        <HStack flex={1}>
                            <Rate style={{ fontSize: '16px' }} defaultValue={4.5} allowHalf disabled />
                            <Text fontWeight={500} fontSize={16}>({233})</Text>
                        </HStack>
                    </HStack>
                </Stack>
            </CardBody>
            <CardFooter>
                {(role !== 'Staff' && role !== 'Dentist') && (
                    <Button variant='solid' colorScheme='green' gap={2} flex={1} onClick={onOpenAppointment}>
                        <FaCalendarDays /> Make appointment
                    </Button>
                )}
            </CardFooter>
            <AppointmentModal
                isOpen={isOpenAppointment}
                onClose={onCloseAppointment}
                clinicId={dentalData?.clinicId}
                clinicName={dentalData?.clinicName}
            />
        </Card>
    )
}

export default DentalItem