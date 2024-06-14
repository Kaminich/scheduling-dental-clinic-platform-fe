import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    VStack,
    HStack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Stack,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { changeTabTitle } from '../../utils/changeTabTitle';

const appointments = [
    { id: 1, time: '09:00 AM', patient: 'John Doe', treatment: 'Cleaning' },
    { id: 2, time: '10:00 AM', patient: 'Jane Smith', treatment: 'Filling' },
    { id: 3, time: '11:00 AM', patient: 'Jim Brown', treatment: 'Check-up' },
    // Add more appointments as needed
];
const ViewSchedulePage = () => {
    const currentDate = new Date();
    const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        changeTabTitle('View Schedule');
    }, []);
    return (
        <Stack w={'7xl'} mx={'auto'}>
            <Heading mb={5}>{currentMonthName} Schedule</Heading>
            <Tabs variant='soft-rounded' colorScheme='green' w={'full'}>
                <TabList w={'full'}>
                    <Tab>Monday</Tab>
                    <Tab>Tuesday</Tab>
                    <Tab>Wednesday</Tab>
                    <Tab>Thursday</Tab>
                    <Tab>Friday</Tab>
                    <Tab>Saturday</Tab>
                    <Tab>Sunday</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
                            {appointments.map((appointment) => (
                                <Box
                                    key={appointment.id}
                                    p={5}
                                    shadow="md"
                                    borderWidth="1px"
                                    borderRadius="md"
                                >
                                    <HStack justify="space-between" mb={3}>
                                        <Text fontWeight="bold">{appointment.time}</Text>
                                        <CalendarIcon />
                                    </HStack>
                                    <VStack align="start">
                                        <Text>Patient: {appointment.patient}</Text>
                                        <Text>Treatment: {appointment.treatment}</Text>
                                    </VStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </TabPanel>
                    <TabPanel>
                        <Heading>No appointment</Heading>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Stack>
    )
}

export default ViewSchedulePage