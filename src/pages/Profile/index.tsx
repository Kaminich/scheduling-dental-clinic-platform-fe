import { Avatar, Box, Card, CardBody, Heading, Text, Stack, HStack, Divider } from "@chakra-ui/react";
import { Shadow } from "../../styles/styles";
import { useEffect, useState } from "react";
import useUserProfile from "../../hooks/useUserProfile";
import { formatDate } from "../../utils/formatDate";
import { changeTabTitle } from "../../utils/changeTabTitle";
import UserInformationResponse, { initialUserInformationResponse } from "../../types/UserInformationResponse";

const ProfilePage = () => {
    const [userData, setUserData] = useState<UserInformationResponse>(initialUserInformationResponse);

    const { data } = useUserProfile();

    useEffect(() => {
        changeTabTitle('Profile');
    }, []);

    useEffect(() => {
        data && setUserData(data);
    }, [data]);

    return (
        <HStack gap={20} justify={'space-between'} align={'flex-start'} w={'7xl'} m={'auto'}>
            <Card flex={1} shadow={Shadow.cardShadow}>
                <CardBody>
                    <Stack gap="4" align="center" flexWrap="wrap" h='100%'>
                        <Avatar
                            boxSize={'13rem'}
                            fontSize='6rem'
                            border='1px solid gainsboro'
                            bgColor='white'
                            objectFit={'cover'}
                            src={data?.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'}
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
                        {userData.username && (
                            <>
                                <HStack gap={5}>
                                    <Text minW={36}>Username: </Text>
                                    <Text color={'gray'}>{userData.username}</Text>
                                </HStack>
                                <Divider my={4} />
                            </>
                        )}
                        <HStack gap={5}>
                            <Text minW={36}>Full Name: </Text>
                            <Text color={'gray'}>{userData.fullName}</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack gap={5}>
                            <Text minW={36}>Gender: </Text>
                            <Text color={'gray'}>{userData.gender}</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack gap={5}>
                            <Text minW={36}>Date of Birth: </Text>
                            <Text color={'gray'}>{formatDate(userData.dob)}</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack gap={5}>
                            <Text minW={36}>Phone Number: </Text>
                            <Text color={'gray'}>{userData.phone}</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack gap={5}>
                            <Text minW={36}>Email: </Text>
                            <Text color={'gray'}>{userData.email}</Text>
                        </HStack>
                        <Divider my={4} />
                        <HStack gap={5}>
                            <Text minW={36}>Address: </Text>
                            <Text color={'gray'}>{userData.address}</Text>
                        </HStack>
                    </CardBody>
                </Card>
            </Stack>
        </HStack>
    );
};

export default ProfilePage;
