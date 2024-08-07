import { Avatar, Button, Card, Divider, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowLeft, FaCalendarCheck, FaCalendarDays, FaChevronRight, FaDoorOpen, FaGear, FaLaptopMedical, FaNewspaper, FaUserGear, FaUserPen } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../hooks/useAuth";
import useUserProfile from "../../../../hooks/useUserProfile";
import ApiClient from "../../../../services/apiClient";

const PersonalMenu = () => {
    const [subMenu, setSubMenu] = useState<boolean>(false);
    // const [isVN, setIsVN] = useState<boolean>(false);

    const api = new ApiClient<any>('/auth/logout');

    const { data } = useUserProfile();
    const navigate = useNavigate();
    const { setIsAuthenticated, setRole } = useAuth();
    const toast = useToast();

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await api.postUnauthen({ refreshToken });
            if (response.success) {
                localStorage.removeItem('access_token');
                setIsAuthenticated(false);
                setRole('');
                localStorage.removeItem('refresh_token');
                navigate('/');
            } else {
                toast({
                    title: "Error",
                    description: "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.response?.data?.message || "An error occurred",
                status: "error",
                duration: 2500,
                position: 'top',
                isClosable: true,
            });
        }
    }

    return (
        <Menu autoSelect={false} isLazy>
            <MenuButton onClick={() => setSubMenu(false)}>
                <Avatar
                    size={'md'}
                    src={data?.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'}
                    objectFit={'cover'}
                />
            </MenuButton>
            <MenuList minW={'sm'}>
                {!subMenu ? (
                    <Stack gap={0}>
                        <Card maxW={'full'} p={5} m={4} mt={2} borderTop={'0.5px solid #f0f0f0'}>
                            <Flex gap={4} align={'center'}>
                                <Avatar size={'sm'} src={data?.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} />
                                {data?.role === 'CUSTOMER' ? (
                                    <Text fontWeight={600}>{data?.fullName}</Text>
                                ) : (
                                    <Text fontWeight={600} textAlign={'center'} flex={1}>{`Welcome back, ${data?.fullName || data?.username}`}</Text>
                                )}
                            </Flex>
                            {data?.role !== 'ADMIN' && (
                                <>
                                    <Divider my={3} />
                                    <MenuItem
                                        p={0}
                                        _hover={{ bg: 'none' }}
                                        onClick={() => navigate('/profile')}
                                    >
                                        <Button w={'full'}>
                                            View personal information
                                        </Button>
                                    </MenuItem>
                                </>
                            )}
                        </Card>
                        {data?.role !== 'ADMIN' && (
                            <Button
                                maxW={'95%'}
                                borderRadius={10}
                                p={3}
                                py={8}
                                mx={2}
                                fontSize={17}
                                fontWeight={600}
                                justifyContent={'space-between'}
                                variant={'ghost'}
                                onClick={() => setSubMenu(true)}
                            >
                                <Flex align={'center'} >
                                    <Button
                                        px={3}
                                        borderRadius={'full'}
                                        mr={3}
                                        bg={'#dedede'}
                                        _hover={{ bg: '#dedede' }}
                                    >
                                        <FaGear />
                                    </Button>
                                    Settings
                                </Flex>
                                <Button
                                    mr={-3}
                                    colorScheme="grey"
                                    variant={'ghost'}
                                    _hover={{ bg: 'none' }}
                                >
                                    <FaChevronRight />
                                </Button>
                            </Button>
                        )}
                        {data?.role === 'CUSTOMER' && (
                            <>
                                <MenuItem
                                    maxW={'95%'}
                                    borderRadius={10}
                                    p={3}
                                    mx={2}
                                    fontSize={17}
                                    fontWeight={600}
                                    onClick={() => navigate('/appointment')}
                                >
                                    <Button
                                        px={3}
                                        borderRadius={'full'}
                                        mr={3}
                                        bg={'#dedede'}
                                        _hover={{ bg: '#dedede' }}
                                    >
                                        <FaCalendarCheck />
                                    </Button>
                                    Appointment
                                </MenuItem>
                                <MenuItem
                                    maxW={'95%'}
                                    borderRadius={10}
                                    p={3}
                                    mx={2}
                                    fontSize={17}
                                    fontWeight={600}
                                    onClick={() => navigate('/medical-record')}
                                >
                                    <Button
                                        px={3}
                                        borderRadius={'full'}
                                        mr={3}
                                        bg={'#dedede'}
                                        _hover={{ bg: '#dedede' }}
                                    >
                                        <FaLaptopMedical />
                                    </Button>
                                    Medical Record
                                </MenuItem>
                            </>
                        )}
                        {data?.role === 'STAFF' && (
                            <>
                                <MenuItem
                                    maxW={'95%'}
                                    borderRadius={10}
                                    p={3}
                                    mx={2}
                                    fontSize={17}
                                    fontWeight={600}
                                    onClick={() => navigate('/manage-appointment')}
                                >
                                    <Button
                                        px={3}
                                        borderRadius={'full'}
                                        mr={3}
                                        bg={'#dedede'}
                                        _hover={{ bg: '#dedede' }}
                                    >
                                        <FaCalendarCheck />
                                    </Button>
                                    Manage Appointment
                                </MenuItem>
                                <MenuItem
                                    maxW={'95%'}
                                    borderRadius={10}
                                    p={3}
                                    mx={2}
                                    fontSize={17}
                                    fontWeight={600}
                                    onClick={() => navigate('/manage-blog')}
                                >
                                    <Button
                                        px={3}
                                        borderRadius={'full'}
                                        mr={3}
                                        bg={'#dedede'}
                                        _hover={{ bg: '#dedede' }}
                                    >
                                        <FaNewspaper />
                                    </Button>
                                    Manage Blogs
                                </MenuItem>
                            </>
                        )}
                        {data?.role === 'DENTIST' && (
                            <>
                                <MenuItem
                                    maxW={'95%'}
                                    borderRadius={10}
                                    p={3}
                                    mx={2}
                                    fontSize={17}
                                    fontWeight={600}
                                    onClick={() => navigate('/view-schedule')}
                                >
                                    <Button
                                        px={3}
                                        borderRadius={'full'}
                                        mr={3}
                                        bg={'#dedede'}
                                        _hover={{ bg: '#dedede' }}
                                    >
                                        <FaCalendarDays />
                                    </Button>
                                    View Schedule
                                </MenuItem>
                            </>
                        )}
                        <MenuItem
                            maxW={'95%'}
                            borderRadius={10}
                            p={3}
                            mx={2}
                            fontSize={17}
                            fontWeight={600}
                            onClick={handleLogout}
                        >
                            <Button
                                px={3}
                                borderRadius={'full'}
                                mr={3}
                                bg={'#dedede'}
                                _hover={{ bg: '#dedede' }}
                            >
                                <FaDoorOpen />
                            </Button>
                            Logout
                        </MenuItem>
                    </Stack>
                ) : (
                    <Stack gap={0}>

                        <Flex align={'center'} w={'full'} mt={2} mb={4}>
                            <Button
                                px={3}
                                borderRadius={'full'}
                                mx={5}
                                colorScheme="gray"
                                variant={'ghost'}
                                onClick={() => setSubMenu(false)}
                            >
                                <FaArrowLeft />
                            </Button>
                            <Heading mt={-1} fontSize={24} textAlign={'center'}>Settings</Heading>
                        </Flex>
                        {data?.role !== 'ADMIN' && (
                            <MenuItem
                                maxW={'95%'}
                                borderRadius={10}
                                p={3}
                                mx={2}
                                fontSize={17}
                                fontWeight={600}
                                onClick={() => navigate('/update-profile/profile')}
                            >
                                <Button
                                    px={3}
                                    borderRadius={'full'}
                                    mr={3}
                                    bg={'#dedede'}
                                    _hover={{ bg: '#dedede' }}
                                >
                                    <FaUserPen />
                                </Button>
                                Update Profile
                            </MenuItem>
                        )}
                        <MenuItem
                            maxW={'95%'}
                            borderRadius={10}
                            p={3}
                            mx={2}
                            fontSize={17}
                            fontWeight={600}
                            onClick={() => navigate('/update-profile/password')}
                        >
                            <Button
                                px={3}
                                borderRadius={'full'}
                                mr={3}
                                bg={'#dedede'}
                                _hover={{ bg: '#dedede' }}
                            >
                                <FaUserGear />
                            </Button>
                            Update Password
                        </MenuItem>
                        {/* <Flex
                            maxW={'95%'}
                            borderRadius={10}
                            p={3}
                            mx={2}
                            fontSize={17}
                            fontWeight={600}
                            justifyContent={'space-between'}
                        >
                            <Flex align={'center'} cursor={'default'}>
                                <Button
                                    px={3}
                                    borderRadius={'full'}
                                    mr={3}
                                    bg={'#dedede'}
                                    _hover={{ bg: '#dedede' }}
                                    cursor={'default'}
                                >
                                    <FaGlobe />
                                </Button>
                                Language
                            </Flex>
                            <Flex mr={-3} gap={1}>
                                <Button
                                    colorScheme={isVN ? "green" : 'gray'}
                                    borderStartRadius={5}
                                    pr={3}
                                    onClick={() => setIsVN(true)}
                                >
                                    VN
                                </Button>
                                <Button
                                    colorScheme={!isVN ? "blue" : 'gray'}
                                    borderEndRadius={5}
                                    pl={3}
                                    onClick={() => setIsVN(false)}
                                >
                                    EN
                                </Button>
                            </Flex>
                        </Flex> */}
                    </Stack>
                )}
            </MenuList>
        </Menu>
    )
}

export default PersonalMenu