import { Card, CardBody, Container, Flex, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Slider from './components/slider';
import SearchBar from '../../components/search_bar';
import DentalBranch from './components/dental_branch';
import MedicalTeam from './components/medical_team';
import { Color } from '../../styles/styles';
import BlogsItem from '../../components/blogs_item';
import { useEffect, useState } from 'react';
import { changeTabTitle } from '../../utils/changeTabTitle';
import ServiceCarousel from '../../components/carousel/service';
import useActiveBlogs from '../../hooks/useActiveBlogs';
import BlogDetailResponse from '../../types/BlogDetailResponse';

const HomePage = () => {
    const { data } = useActiveBlogs();
    const [blogs, setBlogs] = useState<BlogDetailResponse[]>([]);

    useEffect(() => {
        changeTabTitle('F-Dental');
    }, []);

    useEffect(() => {
        if (data) {
            setBlogs(data?.content);
        }
    }, [data]);

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
                                src='https://res.cloudinary.com/dy1t2fqsc/image/upload/v1721275775/4fd7966486f0db87e58a36a081619a62_yxsqtr.jpg'
                                alt='Many member branches'
                                borderRadius='lg'
                                h={175}
                                w={'full'}
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' textAlign={'center'} minH={78}>Many member branches</Heading>
                                <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'}>
                                    Join our network of dental clinics and specialists with branches in various locations. Benefit from our extensive reach and collaborate with professionals from diverse backgrounds. Our platform ensures that patients can find and connect with the right dental care provider no matter where they are.
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card maxW='sm' bgColor={Color.blue_100}>
                        <CardBody>
                            <Image
                                src='https://res.cloudinary.com/dy1t2fqsc/image/upload/v1721275776/5495572_xmpcck.jpg'
                                alt='Make an appointment with your dental clinic or specialist'
                                borderRadius='lg'
                                h={175}
                                w={'full'}
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' textAlign={'center'} minH={78}>Make an appointment with your dental clinic or specialist</Heading>
                                <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'}>
                                    Simplify the appointment process for your patients. With our platform, patients can easily schedule appointments with their preferred dental clinic or specialist. The intuitive interface and seamless booking system make it convenient for patients to get the care they need at a time that suits them.
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card maxW='sm' bgColor={Color.blue_100}>
                        <CardBody>
                            <Image
                                src='https://res.cloudinary.com/dy1t2fqsc/image/upload/v1721275776/dentist-avatar-3d-icon-3d-model-ca27cc7953_geqskw.jpg'
                                alt='Easily search for the service you want'
                                borderRadius='lg'
                                h={175}
                                w={'full'}
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' textAlign={'center'} minH={78}>Easily search for the service you want</Heading>
                                <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'}>
                                    Finding the right dental service is now easier than ever. Our platform allows patients to quickly and effortlessly search for the specific dental services they need. Whether it's a routine check-up, a specialized treatment, or an emergency procedure, our user-friendly search feature ensures that patients can find the best dental care options available to them. Simplify your search and get connected with the right dental professionals in no time.
                                </Text>
                            </Stack>
                        </CardBody>
                    </Card>
                    <Card maxW='sm' bgColor={Color.blue_100}>
                        <CardBody>
                            <Image
                                src='https://res.cloudinary.com/dy1t2fqsc/image/upload/v1721275775/71r9thcxXjL._AC_UF894_1000_QL80__afbyia.jpg'
                                alt='Connect your clinic through our website'
                                borderRadius='lg'
                                h={175}
                                w={'full'}
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md' textAlign={'center'} minH={78}>Connect your clinic through our website</Heading>
                                <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'}>
                                    Expand your clinic’s reach by connecting through our website. Our platform offers an easy and efficient way for dental clinics to join our network and reach a wider audience. By becoming a part of our community, you'll gain access to a variety of tools and resources designed to enhance patient engagement and streamline your operations. Connect with us today and take the first step towards growing your practice and improving patient care.
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
                    <ServiceCarousel />
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
                    {blogs.slice(0, 3).map((blog) => (
                        <BlogsItem key={blog.id} blog={blog} />
                    ))}
                </SimpleGrid>
            </Stack>
        </>
    )
}

export default HomePage