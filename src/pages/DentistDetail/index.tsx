import { Box, Button, Card, CardBody, CardFooter, Flex, Image, ListItem, Stack, Text, UnorderedList, useDisclosure } from "@chakra-ui/react"
import AppointmentModal from "../../components/modal/appointment"
import { Color, Shadow } from "../../styles/styles";
import CustomCarousel from "../../components/carousel";
import { useAuth } from "../../hooks/useAuth";

const DentistDetailPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { role } = useAuth();

    return (
        <>
            <Stack w={"6xl"} mx={'auto'} my={6} gap={6}>
                <Text
                    maxW={'sm'}
                    fontSize={20}
                    pl={4}
                    py={1}
                    mb={4}
                    fontWeight={500}
                    borderRadius={'full'}
                    bgGradient={Color.headingGradientMd}
                >
                    Segun Adebayo
                </Text>
                <Flex my={2} align={'center'}>
                    <Flex flex={1} justify={'center'}>
                        <Image
                            alt={"Dentist avatar"}
                            h={'50vh'}
                            borderRadius={10}
                            p={0}
                            src={
                                "https://bit.ly/sage-adebayo"
                            }
                        />
                    </Flex>
                    <Card flex={1.5} shadow={Shadow.cardShadow}>
                        <CardBody>
                            <Flex gap={10}>
                                <Stack gap={4} flex={1}>
                                    <Text fontWeight={'bold'} textAlign={'center'}>Basic Information </Text>
                                    <Flex gap={2}>
                                        <Text fontWeight={'bold'}>Job: </Text>
                                        <Text>job</Text>
                                    </Flex>
                                    <Flex gap={2}>
                                        <Text fontWeight={'bold'}>Experience: </Text>
                                        <Text>experience</Text>
                                    </Flex>
                                    <Box gap={2}>
                                        <Text fontWeight={'bold'}>Dental: </Text>
                                        <Text>dental</Text>
                                    </Box>
                                    <Box gap={2}>
                                        <Text fontWeight={'bold'}>Branch: </Text>
                                        <Text>address address address address (HCM)</Text>
                                    </Box>
                                </Stack>
                                <Stack gap={4} flex={1.7}>
                                    <Text fontWeight={'bold'} textAlign={'center'}>Achievement: </Text>
                                    <UnorderedList spacing={1}>
                                        <ListItem fontSize={17}>Achievement 1</ListItem>
                                        <ListItem fontSize={17}>Achievement 2</ListItem>
                                        <ListItem fontSize={17}>Achievement 3</ListItem>
                                    </UnorderedList>
                                </Stack>
                            </Flex>
                        </CardBody>
                        {(role !== 'Staff' && role !== 'Dentist') && (
                            <CardFooter>
                                <Button colorScheme="green" onClick={onOpen}>Make Appointment</Button>
                            </CardFooter>
                        )}
                    </Card>
                </Flex>
                <Stack mt={12} mb={4}>
                    <Text
                        maxW={'lg'}
                        fontSize={20}
                        pl={4}
                        py={1}
                        mb={4}
                        fontWeight={500}
                        borderRadius={'full'}
                        bgGradient={Color.headingGradientMd}
                    >
                        Medical Team from HCM Branch
                    </Text>
                    <CustomCarousel type="dentist" />
                </Stack>
            </Stack>
            <AppointmentModal
                dentalData={''}
                dentistData={''}
                isOpen={isOpen}
                locationData={''}
                onClose={onClose}
            />
        </>
    )
}

export default DentistDetailPage