import { Button, Card, Divider, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { Shadow } from "../../styles/styles"
import WorkingHours from "../DentalDetail/components/working_hours"
import DentalDetailBranch from "../DentalDetail/components/branch"
import { useAuth } from "../../hooks/useAuth"
import { useEffect } from "react"
import { changeTabTitle } from "../../utils/changeTabTitle"

const DentalDetailSettingsPage = () => {
    const { role } = useAuth();

    useEffect(() => {
        changeTabTitle('Clinic Dental Settings');
    }, []);

    return (
        <Stack>
            {role === 'Owner' && (
                <HStack justify={'flex-end'} m={6} mb={-6}>
                    <Button colorScheme="blue">Edit</Button>
                </HStack>
            )}
            <HStack align={'center'} mt={6}>
                <Stack flex={1} align={'center'}>
                    <Image src="/image0.svg" />
                </Stack>
                <Stack flex={4}>
                    <Heading fontSize={28}>F-Dental</Heading>
                    <HStack mt={4} ml={4} align={'flex-start'}>
                        <Stack flex={1}>
                            <Text>Owner: { }</Text>
                            <Text>Phone Number: { }</Text>
                            <Text>Email: { }</Text>
                            <Text>Address: { }</Text>
                            <Text>City: { }</Text>
                        </Stack>
                        <Stack flex={1}>
                            <Text>Created at: { }</Text>
                            <Text>Last Modified: { }</Text>
                            <Text>Last Modified By: { }</Text>
                        </Stack>
                    </HStack>
                </Stack>
            </HStack>
            <Divider my={8} borderColor={'grey'} />
            <Stack maxW={'90%'} m={'auto'}>
                <Stack flex={2} gap={8}>
                    <Stack>
                        <Text
                            maxW={'sm'}
                            fontSize={20}
                            pl={4}
                            py={1}
                            mb={4}
                            fontWeight={500}
                            borderRadius={'full'}
                        >
                            About
                        </Text>
                        <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
                            <Text>
                                The Scheduling Dental Clinics Platform presents a compelling business opportunity by addressing the problem of inefficient dental appointment scheduling. Existing methods are often manual, leading to scheduling conflicts and missed opportunities. In contrast, the platform offers a comprehensive solution with features like real-time scheduling, automated reminders, and integration with clinic management systems. By streamlining appointment scheduling, the platform improves productivity, reduces no-shows, and enhances patient satisfaction. This product aligns with market trends of digital healthcare solutions and supports corporate strategic goals by optimizing resource utilization and offering a user-friendly experience. Overall, it provides an efficient and user-friendly solution for dental clinics, improving productivity, patient satisfaction, and resource utilization
                            </Text>
                        </Card>
                    </Stack>
                    <Stack>
                        <Text
                            maxW={'sm'}
                            fontSize={20}
                            pl={4}
                            py={1}
                            mb={4}
                            fontWeight={500}
                            borderRadius={'full'}
                        >
                            Working Hours
                        </Text>
                        <WorkingHours />
                    </Stack>
                    <Stack>
                        <Text
                            maxW={'sm'}
                            fontSize={20}
                            pl={4}
                            py={1}
                            mb={4}
                            fontWeight={500}
                            borderRadius={'full'}
                        >
                            Branch
                        </Text>
                        <DentalDetailBranch />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default DentalDetailSettingsPage