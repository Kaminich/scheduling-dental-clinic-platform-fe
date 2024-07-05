import { Avatar, Button, Card, CardBody, CardFooter, HStack, Heading, Image, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react"
import { FaMapLocationDot, FaTooth } from "react-icons/fa6";
import { useEffect, useState } from "react";
import AppointmentModal from "../modal/appointment";
import { Link, useNavigate } from "react-router-dom";
import { Border, Color, Shadow } from "../../styles/styles";
import { useAuth } from "../../hooks/useAuth";
import DentistListResponse from "../../types/DentistListResponse";

interface Props {
    type: number;
    data: DentistListResponse[];
}

const DentistItem = ({ type, data }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dentists, setDentists] = useState<DentistListResponse[]>([]);
    const { role } = useAuth();
    const navigate = useNavigate();

    const navigateToDentistDetail = (name: string) => {
        const hyphenatedName = name.replace(/ /g, '-');
        navigate(`/dentists/${hyphenatedName}`);
    };

    useEffect(() => {
        if (data) {
            setDentists(data);
        }
    }, [data])

    return (
        <>
            {type === 1 ? (
                <>
                    {dentists.map((dentist) => (
                        <Card maxW='sm' key={dentist.dentistId}>
                            <CardBody pb={0}>
                                <Stack align={'center'}>
                                    <Avatar
                                        size='2xl'
                                        name='Segun Adebayo'
                                        src={dentist.avatar || ''}
                                        border={Border.tableBorder}
                                    />
                                    <Heading
                                        size='md'
                                        mt={4}
                                        _hover={{ color: Color.hoverBlue }}
                                        cursor={'pointer'}
                                        onClick={() => navigateToDentistDetail(dentist.fullName)}
                                    >
                                        {dentist.fullName}
                                    </Heading>
                                    <Text>Doctor</Text>
                                </Stack>
                                <Stack mx={3} mt={4}>
                                    <HStack>
                                        <Tooltip label='Specialty'>
                                            <span>
                                                <FaTooth />
                                            </span>
                                        </Tooltip>
                                        <Text>{dentist.specialty}</Text>
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
                                            <Text _hover={{ color: Color.hoverBlue }}>{dentist.clinicName}</Text>
                                        </Link>
                                    </HStack>
                                </Stack>
                            </CardBody>
                            {(role !== 'Staff' && role !== 'Dentist') ? (
                                <CardFooter justify={'center'}>
                                    <Button variant='solid' colorScheme='green' px={10} onClick={onOpen}>
                                        Make appointment
                                    </Button>
                                </CardFooter>
                            ) : (
                                <CardFooter></CardFooter>
                            )}
                        </Card>
                    ))}
                    <AppointmentModal
                        isOpen={isOpen}
                        onClose={onClose}
                        dentalData={'dentalData'}
                        dentistData={'dentistData'}
                        locationData={'locationData'}
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