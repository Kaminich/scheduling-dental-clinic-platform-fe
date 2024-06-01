import { Avatar, Box, Card, CardBody, Heading, Text, Stack, HStack, Divider } from "@chakra-ui/react";
import { Shadow } from "../../styles/styles";

const ProfilePage = () => {

    return (
        <HStack gap={20} justify={'space-between'} align={'flex-start'} w={'7xl'} m={'auto'} my={10}>
            <Card flex={1} shadow={Shadow.cardShadow}>
                <CardBody>
                    <Stack gap="4" align="center" flexWrap="wrap" h='100%'>
                        <Avatar
                            boxSize={'13rem'}
                            fontSize='6rem'
                            border='1px solid gainsboro'
                            bgColor='white'
                            src={'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'}
                        />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <Heading size="md"></Heading>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
            <Stack align='center' flex={2} gap={10}>
                <Card w={'full'} shadow={Shadow.cardShadow}>
                    <CardBody w='100%'>
                        <HStack justify={'space-between'}>
                            <Text>Username: </Text>
                            <Text color={'gray'}>data</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack justify={'space-between'}>
                            <Text>Full Name: </Text>
                            <Text color={'gray'}>data</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack justify={'space-between'}>
                            <Text>Gender: </Text>
                            <Text color={'gray'}>data</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack justify={'space-between'}>
                            <Text>Date of Birth: </Text>
                            <Text color={'gray'}>data</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack justify={'space-between'}>
                            <Text>Phone Number: </Text>
                            <Text color={'gray'}>data</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack justify={'space-between'}>
                            <Text>Address: </Text>
                            <Text color={'gray'}>data</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack justify={'space-between'}>
                            <Text>Email: </Text>
                            <Text color={'gray'}>data</Text>
                        </HStack>
                    </CardBody>
                </Card>
            </Stack>
        </HStack>
    );
};

export default ProfilePage;
