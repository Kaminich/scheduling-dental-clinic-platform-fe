import { Container, Flex, HStack, Heading, Image, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react"
import { Color } from "../../styles/styles"

const AboutPage = () => {
    return (
        <>
            <Stack
                bgImage={
                    'https://static.vecteezy.com/system/resources/thumbnails/007/023/598/small_2x/oral-care-horizontal-dental-banner-items-for-daily-oral-hygiene-mouthwash-and-toothbrush-with-paste-apple-chewing-gum-white-healthy-teeth-isolated-flat-icons-on-a-blue-background-vector.jpg'
                }
                h={'55vh'}
                bgRepeat={'no-repeat'}
                bgPos={'right'}
                bgSize={'contain'}
                bgColor={'#1fa4ab'}
                align={'center'}
                justify={'center'}
            >
                <Text fontSize={24}>ABOUT US</Text>
                <Heading fontSize={'4rem'}>About F-Dental</Heading>
            </Stack>
            <HStack align={'flex-start'} maxW={'6xl'} mx={'auto'} my={20}>
                <Flex flex={1}>
                    <Image
                        alt={"Slider Image"}
                        borderRadius={5}
                        p={0}
                        src={
                            "https://www.shutterstock.com/image-photo/young-female-patient-receiving-dental-600nw-129584396.jpg"
                        }
                    />
                </Flex>
                <Stack flex={1.4} my={5} gap={10}>
                    <Heading textAlign={'center'} bgGradient={Color.headingGradientLg} py={2}>F-Dental</Heading>
                    <Text textAlign={'justify'}>
                        The F-Dental platform was built and launched with the desire to provide solutions to connect online clinics, dentists and businesses selling dental products. At F-Dental, users can easily refer to information about clinics, doctors and dental product businesses.
                    </Text>
                    <Text textAlign={'justify'}>
                        Provides a professional, reliable environment to connect users with the leading reputable systems of clinics and doctors today as well as the units that produce and distribute the highest quality dental products on the market. . From there, it helps users make the most appropriate and safe oral health care choices.
                    </Text>
                    <Text textAlign={'justify'}>
                        In addition, F-Dental also has the mission of building a large dental community, helping users easily access reputable services and high-quality dental products. This community will direct users to collect official information and choose quality dental products and services, thereby having the most satisfying experiences.
                    </Text>
                </Stack>
            </HStack>
            <HStack align={'flex-start'} maxW={'6xl'} mx={'auto'} my={20}>
                <Stack flex={1.4} my={5} gap={7}>
                    <Heading textAlign={'center'} bgGradient={Color.headingGradientLg} py={2}>Service</Heading>
                    <Stack gap={4}>
                        <Heading fontSize={24}>Connect with the dental clinic</Heading>
                        <Text textAlign={'justify'}>
                            Reputable dental clinics that ensure quality, have full operating documents as well as receive good reviews and ratings will be connected to customers by F-Dental. With this connection, customers can be completely assured of finding a reputable clinic that meets the criteria of quality - safety - efficiency.
                        </Text>
                    </Stack>
                    <Stack gap={4}>
                        <Heading fontSize={24}>Connect with dentist</Heading>
                        <Text textAlign={'justify'}>
                            Coming to the 4.0 dental connection platform - F-Dental, customers will also have the opportunity to update information about a team of good dentists in fields such as dental implants, braces, crowns, and teeth whitening. The team of doctors appearing on F-Dental are all doctors with high professional qualifications, extensive practical experience and possess the most prestigious certificates in Vietnam as well as in the world.
                        </Text>
                        <Text textAlign={'justify'}>
                            With continuously updated information and guaranteed accuracy and objectivity, F-Dental will help customers quickly connect to the right doctor. From there, the doctor can advise and give advice to effectively solve dental problems.
                        </Text>
                    </Stack>
                </Stack>
                <Flex flex={1} justify={'flex-end'}>
                    <Image
                        alt={"Slider Image"}
                        borderRadius={5}
                        p={0}
                        src={
                            "https://www.shutterstock.com/image-photo/young-female-patient-receiving-dental-600nw-129584396.jpg"
                        }
                    />
                </Flex>
            </HStack>
            <HStack align={'flex-start'} maxW={'6xl'} mx={'auto'} my={20}>
                <Flex flex={1}>
                    <Image
                        alt={"Slider Image"}
                        borderRadius={5}
                        p={0}
                        src={
                            "https://www.shutterstock.com/image-photo/young-female-patient-receiving-dental-600nw-129584396.jpg"
                        }
                    />
                </Flex>
                <Stack flex={1.4} my={5} gap={10}>
                    <Heading textAlign={'center'} mb={2} bgGradient={Color.headingGradientLg} py={2}>Contact</Heading>
                    <Text textAlign={'justify'}>
                        F-Dental always aims for the best values ​​for users as well as creating an easier, closer connection between users and today's leading reputable system of clinics and dentists. Therefore, if you are looking to contribute content, advertise or connect online with clinics, doctors, dental product manufacturers or distributors, you can contact us immediately at the address The following.
                    </Text>
                    <UnorderedList>
                        <ListItem>Address: </ListItem>
                        <ListItem>Phone number: </ListItem>
                        <ListItem>Email: </ListItem>
                        <ListItem>Website: </ListItem>
                    </UnorderedList>
                </Stack>
            </HStack>
        </>
    )
}

export default AboutPage