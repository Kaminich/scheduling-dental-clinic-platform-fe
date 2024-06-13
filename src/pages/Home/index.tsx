import { Card, CardBody, Container, Flex, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Slider from './components/slider';
import SearchBar from '../../components/search_bar';
import CustomCarousel from '../../components/carousel';
import DentalBranch from './components/dental_branch';
import MedicalTeam from './components/medical_team';
import { Color } from '../../styles/styles';
import BlogsItem from '../../components/blogs_item';
import { useEffect } from 'react';
import { changeTabTitle } from '../../utils/changeTabTitle';

const HomePage = () => {

    useEffect(() => {
        changeTabTitle('F-Dental');
    }, []);

    return (
        <>
            <Slider />
            <Container maxW={'6xl'} mt={20} px={0}>
                <SearchBar />
            </Container>
            <Stack
                maxW={'6xl'}
                my={5}
                mx={'auto'}
                py={8}
            >
                <Heading
                    textAlign={'center'}
                    mb={6}
                >
                    4 Yes points at F-Dental
                </Heading>
                <SimpleGrid columns={4} spacingX={7} spacingY={8}>
                    <Card maxW='sm' bgColor={Color.blue_100}>
                        <CardBody>
                            <Image
                                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' textAlign={'center'}>Many member branches</Heading>
                                <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'} noOfLines={2}>
                                    With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen.
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card maxW='sm' bgColor={Color.blue_100}>
                        <CardBody>
                            <Image
                                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' textAlign={'center'}>Make an appointment with your dental clinic or specialist</Heading>
                                <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'} noOfLines={2}>
                                    With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen.
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card maxW='sm' bgColor={Color.blue_100}>
                        <CardBody>
                            <Image
                                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' textAlign={'center'}>Consulting via chat</Heading>
                                <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'} noOfLines={2}>
                                    With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen.
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card maxW='sm' bgColor={Color.blue_100}>
                        <CardBody>
                            <Image
                                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' textAlign={'center'}>Living room Sofa</Heading>
                                <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'} noOfLines={2}>
                                    With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen.
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                </SimpleGrid>
            </Stack>
            <Flex
                bgColor={Color.blue_100}
                justify={'center'}
                pb={10}
                pt={5}
                my={5}
            >
                <Stack
                    w={'6xl'}
                    my={5}
                    gap={10}
                >
                    <Heading
                        textAlign={'center'}
                    >
                        Highlight Services
                    </Heading>
                    <CustomCarousel type='service' />
                </Stack>
            </Flex>
            <Stack
                maxW={'6xl'}
                my={5}
                mx={'auto'}
                py={8}
            >
                <Heading
                    textAlign={'center'}
                    mb={6}
                >
                    Dental Clinic
                </Heading>
                <DentalBranch />
            </Stack>
            <Flex
                bgColor={Color.blue_100}
                justify={'center'}
                pb={10}
                pt={5}
                my={5}
            >
                <Stack
                    w={'6xl'}
                    my={5}
                    gap={10}
                >
                    <Heading
                        textAlign={'center'}
                    >
                        Medical Team
                    </Heading>
                    <MedicalTeam />
                </Stack>
            </Flex>
            <Stack
                maxW={'6xl'}
                my={5}
                mx={'auto'}
                py={8}
            >
                <Heading
                    textAlign={'center'}
                    mb={6}
                >
                    Highlight Blogs
                </Heading>
                <SimpleGrid columns={3} spacingX={7} spacingY={8}>
                    <BlogsItem />
                    <BlogsItem />
                    <BlogsItem />
                </SimpleGrid>
            </Stack>
        </>
    )
}

export default HomePage