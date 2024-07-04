import { Avatar, Button, Divider, Flex, Heading, Image, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react"
import AppointmentModal from "../../components/modal/appointment"
import RatingAndFeedback from "../../components/rating_feedback";
import { Color } from "../../styles/styles";
import DentalAbout from "./components/about";
import DentalDentist from "./components/dentist";
import ServicePrice from "./components/service_price";
import { useAuth } from "../../hooks/useAuth";

const DentalDetailPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { role } = useAuth();

    return (
        <Stack w={"6xl"} m={'auto'}>
            <Image
                alt={"Slider Image"}
                h={'50vh'}
                borderRadius={10}
                p={0}
                src={
                    "https://benhviencuadong.vn/wp-content/uploads/2022/08/kham-nha-khoa-3.jpg"
                }
            />
            <Flex alignItems="center" mt={-8} mx={10} justify={'space-between'}>
                <Flex align={'center'} gap={5}>
                    <Avatar
                        name="John Doe"
                        src="/image0.svg"
                        w={36}
                        h={36}
                        bg={'white'}
                        shadow={'lg'}
                    />
                    <Heading fontSize={27}>F-Dental</Heading>
                </Flex>
                {(role !== 'Staff' && role !== 'Dentist') && (
                    <Flex justify={'center'} gap={4} mt={8}>
                        <Button colorScheme={'blue'} variant={'outline'}>Chat with Dental</Button>
                        <Button colorScheme={'green'} onClick={onOpen}>Make Appointment</Button>
                    </Flex>
                )}
            </Flex>
            <Divider my={4} borderColor={'gray'} />
            <Tabs variant={'unstyled'}>
                <TabList>
                    <Tab>About</Tab>
                    <Tab>Dentist</Tab>
                    <Tab>Service and Price list</Tab>
                    <Tab>Rating and Feedback</Tab>
                </TabList>
                <TabIndicator mt='-1.5px' height='2px' bg={Color.greenBlue} borderRadius='1px' />
                <TabPanels mt={6}>
                    <TabPanel>
                        <DentalAbout />
                    </TabPanel>
                    <TabPanel>
                        <DentalDentist />
                    </TabPanel>
                    <TabPanel>
                        <ServicePrice clinicId={1} />
                    </TabPanel>
                    <TabPanel>
                        <RatingAndFeedback isModal={false} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <AppointmentModal
                dentalData={''}
                dentistData={''}
                isOpen={isOpen}
                locationData={''}
                onClose={onClose}
            />
        </Stack>
    )
}

export default DentalDetailPage