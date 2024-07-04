import OwlCarousel from "react-owl-carousel"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Card, CardBody, Container, HStack, Heading, Image, Stack, Text, Tooltip } from "@chakra-ui/react";
import ApiClient from "../../../services/apiClient";
import { ApiResponse } from "../../../types/ApiResponse";
import { useEffect, useState } from "react";
import { Color, Shadow } from "../../../styles/styles";
import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import DentistDetailResponse from "../../../types/DentistDetailResponse";

interface Prop {
    branchId: number
}

const DentistCarousel = ({ branchId }: Prop) => {
    const api = new ApiClient<ApiResponse<DentistDetailResponse>>('/dentist');
    const [dentists, setDentists] = useState<DentistDetailResponse[]>([]);

    const getDentists = async () => {
        try {
            const response = await api.getUnauthen({
                params: {
                    branchId
                }
            })
            console.log(response.data);
            // if (response.success) {
            //     setCategories(response.data["Categories by clinic"])
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (branchId) {
            getDentists();
        }
    }, [branchId])

    return (
        <OwlCarousel
            items={4}
            autoplay
            autoplayTimeout={4000}
            loop
            dots={false}
            mouseDrag={false}
            margin={20}
        >
            <>
                {dentists.map((dentist) => (
                    <Container h={'380px'} pt={1} m={0} px={1}>
                        <Card maxW='sm' shadow={Shadow.cardShadow}>
                            <Link to={'/dentist-detail'}>
                                <CardBody pb={4}>
                                    <Stack align={'center'}>
                                        <Image
                                            src={dentist.avatar}
                                            alt='Dentist image'
                                            borderRadius='lg'
                                        />
                                        <Heading
                                            size='md'
                                            py={2}
                                            pb={0}
                                            _hover={{ color: Color.hoverBlue }}
                                        >
                                            {dentist.fullName}
                                        </Heading>
                                        <Text fontSize={18}>{dentist.specialty} Dentist</Text>
                                    </Stack>
                                    <Stack mx={3} mt={1}>
                                        <HStack>
                                            <Tooltip label='Dental'>
                                                <span>
                                                    <FaMapLocationDot />
                                                </span>
                                            </Tooltip>
                                            <Text>{dentist.branchName}</Text>
                                        </HStack>
                                    </Stack>
                                </CardBody>
                            </Link>
                        </Card>
                    </Container>
                ))}

                {/* <Container h={'380px'} pt={1} m={0} px={1}>
                    <DentistItem type={2} />
                </Container>
                <Container h={'380px'} pt={1} m={0} px={1}>
                    <DentistItem type={2} />
                </Container>
                <Container h={'380px'} pt={1} m={0} px={1}>
                    <DentistItem type={2} />
                </Container>
                <Container h={'380px'} pt={1} m={0} px={1}>
                    <DentistItem type={2} />
                </Container>
                <Container h={'380px'} pt={1} m={0} px={1}>
                    <DentistItem type={2} />
                </Container> */}
            </>

        </OwlCarousel>
    )
}


export default DentistCarousel
