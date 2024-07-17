import { Avatar, Card, CardBody, HStack, Heading, Image, Stack, Text, Tooltip } from "@chakra-ui/react"
import { FaMapLocationDot, FaTooth } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Border, Color, Shadow } from "../../styles/styles";
import DentistListResponse from "../../types/DentistListResponse";
import { Status } from "../../types/type.enum";

interface Props {
    type: number;
    data: DentistListResponse[];
}

const DentistItem = ({ type, data }: Props) => {
    const [dentists, setDentists] = useState<DentistListResponse[]>([]);
    const navigate = useNavigate();

    const navigateToDentistDetail = (name: string) => {
        const hyphenatedName = name.replace(/ /g, '-');
        navigate(`/dentists/${hyphenatedName}`);
    };

    const navigateToDentalDetail = (name: string) => {
        const hyphenatedName = name.replace(/ /g, '-');
        navigate(`/dentals/${hyphenatedName}`);
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
                    {dentists
                        .filter((dentist) => dentist.status === Status.ACTIVE)
                        .map((dentist) => (
                            <Card maxW='sm' key={dentist.dentistId}>
                                <CardBody pb={6}>
                                    <Stack align={'center'}>
                                        <Avatar
                                            size='2xl'
                                            src={dentist.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'}
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
                                        <Text>Dentist</Text>
                                    </Stack>
                                    <Stack mx={3} mt={4}>
                                        <HStack>
                                            <Tooltip label='Specialty'>
                                                <span>
                                                    <FaTooth />
                                                </span>
                                            </Tooltip>
                                            <Text textTransform={'capitalize'}>{dentist.specialty}</Text>
                                        </HStack>
                                    </Stack>
                                    <Stack mx={3} mt={1}>
                                        <HStack>
                                            <Tooltip label='Clinic'>
                                                <span>
                                                    <FaMapLocationDot />
                                                </span>
                                            </Tooltip>
                                            <Text
                                                cursor={'pointer'}
                                                _hover={{ color: Color.hoverBlue }}
                                                onClick={() => navigateToDentalDetail(dentist.clinicName)}
                                            >
                                                {dentist.clinicName}
                                            </Text>
                                        </HStack>
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                </>
            ) : (
                <>
                    {dentists
                        .filter((dentist) => dentist.status === Status.ACTIVE)
                        .map((dentist) => (
                            <Card maxW='sm' shadow={Shadow.cardShadow} key={dentist.dentistId}>
                                <CardBody pb={4}>
                                    <Stack align={'center'}>
                                        <Image
                                            src={dentist.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'}
                                            alt={dentist.fullName}
                                            borderRadius='lg'
                                            w={222}
                                            h={222}
                                        />
                                        <Heading
                                            size='md'
                                            py={2}
                                            pb={0}
                                            _hover={{ color: Color.hoverBlue }}
                                            cursor={'pointer'}
                                            onClick={() => navigateToDentistDetail(dentist.fullName)}
                                        >
                                            {dentist.fullName}
                                        </Heading>
                                    </Stack>
                                    <Stack mx={3} mt={3}>
                                        <HStack>
                                            <Tooltip label='Dental'>
                                                <span>
                                                    <FaMapLocationDot />
                                                </span>
                                            </Tooltip>
                                            <Text>{dentist.city}</Text>
                                        </HStack>
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))}
                </>
            )}
        </>
    )
}

export default DentistItem