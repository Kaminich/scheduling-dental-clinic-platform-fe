import { Button, Card, CardBody, CardFooter, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";
import { Color, Shadow } from "../../styles/styles";
import { useNavigate } from "react-router";

const DentalClinicSettings = () => {
    const navigate = useNavigate();

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
            <Stack gap={6} w={'full'} >
                <Card shadow={Shadow.cardShadow} bg={Color.blue_100}>
                    <CardBody>
                        <Stack w={'full'} align={'center'} gap={4} mb={12}>
                            <Image
                                border='1px solid gainsboro'
                                borderRadius='full'
                                boxSize={'9rem'}
                                src={
                                    'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
                                }
                                alt='avatar'
                                bgColor='white'
                                objectFit={'cover'}
                            />
                            <Heading fontSize={32} fontWeight={600}>F-Dental</Heading>
                        </Stack>
                        <HStack w={'5xl'} m={'auto'}>
                            <Stack flex={1}>
                                <Text>Phone Number: { }</Text>
                                <Text>Email: { }</Text>
                                <Text>Address: { }</Text>
                                <Text>City: { }</Text>
                            </Stack>
                            <Stack flex={1}>
                                <Text>Phone Number: { }</Text>
                                <Text>Email: { }</Text>
                                <Text>Address: { }</Text>
                                <Text>City: { }</Text>
                            </Stack>
                        </HStack>
                    </CardBody>
                    <CardFooter>
                        <HStack justify={'flex-end'} w={'full'}>
                            <Button gap={4} onClick={() => navigate('dental-detail')}>More Detail <FaArrowRight /></Button>
                        </HStack>
                    </CardFooter>
                </Card>
            </Stack>
        </Stack>
    )
}

export default DentalClinicSettings