import OwlCarousel from "react-owl-carousel"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Card, CardBody, Container, HStack, Heading, Image, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Color, Shadow } from "../../../styles/styles";
import { useNavigate } from "react-router-dom";
import { FaTooth } from "react-icons/fa6";
import DentistListResponse from "../../../types/DentistListResponse";
import { Status } from "../../../types/type.enum";

interface Prop {
    dentistList: DentistListResponse[]
}

const DentistCarousel = ({ dentistList }: Prop) => {
    const [dentists, setDentists] = useState<DentistListResponse[]>([]);
    const navigate = useNavigate();
    const navigateToDetail = (name: string) => {
        const hyphenatedName = name.replace(/ /g, '-');
        navigate(`/dentists/${hyphenatedName}`);
    };

    useEffect(() => {
        if (dentistList) {
            setDentists(dentistList);
        }
    }, [dentistList])

    return (
        <OwlCarousel
            key={dentists.length}
            items={4}
            autoplay
            autoplayTimeout={4000}
            loop
            dots={false}
            mouseDrag={false}
            margin={20}
        >
            {dentists
                .filter((dentist) => dentist.status === Status.ACTIVE)
                .map((dentist) => (
                    <Container key={dentist.dentistId} h={'380px'} pt={1} m={0} px={1}>
                        <Card
                            maxW='sm'
                            shadow={Shadow.cardShadow}
                        >
                            <CardBody pb={4}>
                                <Stack align={'center'}>
                                    <Image
                                        src={dentist.avatar}
                                        alt='Dentist image'
                                        borderRadius='lg'
                                        w={221}
                                        h={200}
                                        objectFit={'cover'}
                                    />
                                    <Heading
                                        size='md'
                                        py={2}
                                        pb={0}
                                        _hover={{ color: Color.hoverBlue }}
                                        onClick={() => navigateToDetail(dentist.fullName)}
                                        cursor={'pointer'}
                                    >
                                        {dentist.fullName}
                                    </Heading>
                                </Stack>
                                <Stack mx={2} mt={6}>
                                    <HStack>
                                        <Tooltip label='Specialty'>
                                            <span>
                                                <FaTooth />
                                            </span>
                                        </Tooltip>
                                        <Text noOfLines={1}>{dentist.specialty}</Text>
                                    </HStack>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Container>
                ))}
        </OwlCarousel>
    )
}


export default DentistCarousel
