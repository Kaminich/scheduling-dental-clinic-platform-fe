import { Avatar, Button, Card, CardBody, CardFooter, HStack, Heading, Image, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { FaMapLocationDot, FaTooth } from "react-icons/fa6";
import { useState } from "react";
import AppointmentModal from "../modal/appointment";
import { Link } from "react-router-dom";
import { Color, Shadow } from "../../styles/styles";
import { useAuth } from "../../hooks/useAuth";

interface Prop {
    type: number
}

const DentistItem = ({ type }: Prop) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { role } = useAuth();

    const [dentalData, setDentalData] = useState({
        id: '1',
        name: 'ABC HCM'
    });
    const [dentistData, setDentistData] = useState({
        id: '1',
        name: 'Dentist A'
    });
    const [locationData, setLocationData] = useState({
        id: '1',
        name: 'HCM'
    });

    return (
        <>
            {type === 1 ? (
                <>
                    <Card maxW='sm'>
                        <CardBody pb={0}>
                            <Stack align={'center'}>
                                <Avatar
                                    size='2xl'
                                    name='Segun Adebayo'
                                    src='https://bit.ly/sage-adebayo'
                                />
                                <Link to={'/dentist-detail'}>
                                    <Heading
                                        size='md'
                                        mt={4}
                                        _hover={{ color: Color.hoverBlue }}
                                    >
                                        Segun Adebayo
                                    </Heading>
                                </Link>
                                <Text>Doctor</Text>
                            </Stack>
                            <Stack mx={3} mt={4}>
                                <HStack>
                                    <Tooltip label='Specialty'>
                                        <span>
                                            <FaTooth />
                                        </span>
                                    </Tooltip>
                                    <Text>Specialty</Text>
                                </HStack>
                            </Stack>
                            <Stack mx={3} mt={1}>
                                <HStack>
                                    <Tooltip label='Dental'>
                                        <span>
                                            <FaMapLocationDot />
                                        </span>
                                    </Tooltip>
                                    <Link to={'/dental-detail'}>
                                        <Text _hover={{ color: Color.hoverBlue }}>Dental</Text>
                                    </Link>
                                </HStack>
                            </Stack>
                        </CardBody>
                        {(role !== 'Staff' && role !== 'Dentist') && (
                            <CardFooter justify={'center'}>
                                <Button variant='solid' colorScheme='green' px={10} onClick={onOpen}>
                                    Make appointment
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                    <AppointmentModal
                        isOpen={isOpen}
                        onClose={onClose}
                        dentalData={dentalData}
                        dentistData={dentistData}
                        locationData={locationData}
                    />
                </>
            ) : (
                <Card maxW='sm' shadow={Shadow.cardShadow}>
                    <Link to={'/dentist-detail'}>
                        <CardBody pb={4}>
                            <Stack align={'center'}>
                                <Image
                                    src='https://bit.ly/sage-adebayo'
                                    alt='Dentist image'
                                    borderRadius='lg'
                                />
                                <Heading
                                    size='md'
                                    py={2}
                                    pb={0}
                                    _hover={{ color: Color.hoverBlue }}
                                >
                                    Segun Adebayo
                                </Heading>
                                <Text fontSize={18}>Dentist</Text>
                            </Stack>
                            <Stack mx={3} mt={1}>
                                <HStack>
                                    <Tooltip label='Dental'>
                                        <span>
                                            <FaMapLocationDot />
                                        </span>
                                    </Tooltip>
                                    <Text>HCM</Text>
                                </HStack>
                            </Stack>
                        </CardBody>
                    </Link>
                </Card>
            )}

        </>
    )
}

export default DentistItem