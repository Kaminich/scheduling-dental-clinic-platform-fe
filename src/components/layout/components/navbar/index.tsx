import { Avatar, Box, Button, Card, Divider, Flex, HStack, Heading, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { FaBell, FaClockRotateLeft, FaDoorOpen, FaGear, FaGlobe, FaStar } from "react-icons/fa6";
import { useState } from "react";
import Logo from "../../../logo";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const onSignout = () => {
        googleLogout();
    }

    return (
        <Box
            minW={'full'}
            pos={'fixed'}
            top={0}
            zIndex={10}
            bg={'white'}
        >
            <HStack
                p={2}
                justify='space-between'
                maxW={'7xl'}
                m={'auto'}
            >
                <Logo />
                <HStack gap={10}>
                    <Text>
                        <Link to={'/'}>
                            Home
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'/about'}>
                            About
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'/dental'}>
                            Dental
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'/dentist'}>
                            Dentist
                        </Link>
                    </Text>
                    <Text>
                        <Link to={''}>
                            Service
                        </Link>
                    </Text>
                    <Text>
                        <Link to={''}>
                            Blog
                        </Link>
                    </Text>
                    <Text>
                        <Link to={''}>
                            Treatment
                        </Link>
                    </Text>
                </HStack>
                {isLogin ? (
                    <HStack>
                        <Menu autoSelect={false}>
                            <MenuButton>
                                <Button
                                    colorScheme="gray"
                                    borderRadius={'full'}
                                    px={2}
                                    py={5}
                                    mr={0}
                                    size={'lg'}
                                >
                                    <FaBell />
                                </Button>
                            </MenuButton>
                            <MenuList minW={'sm'} maxW={'sm'} ml={20}>
                                <Heading mx={5} my={2} fontSize={24}>Notification</Heading>
                                <Stack>
                                    <MenuItem
                                        maxW={'95%'}
                                        borderRadius={10}
                                        p={3}
                                        mx={2}
                                        fontSize={17}
                                        fontWeight={600}
                                    >
                                        <HStack align={'flex-start'} gap={4}>
                                            <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                                            <Stack justify={'space-between'} minH={'65px'}>
                                                <Text noOfLines={3} fontSize={15} lineHeight={1.2} fontWeight={700}>Notification 1</Text>
                                                <Text fontSize={12} color={'blue'}>12 hours ago</Text>
                                            </Stack>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem
                                        maxW={'95%'}
                                        borderRadius={10}
                                        p={3}
                                        mx={2}
                                        fontSize={17}
                                        fontWeight={600}
                                    >
                                        <HStack align={'flex-start'} gap={4}>
                                            <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                                            <Stack justify={'space-between'} minH={'65px'}>
                                                <Text noOfLines={3} fontSize={15} lineHeight={1.2} fontWeight={700}>Notification 1</Text>
                                                <Text fontSize={12} color={'blue'}>12 hours ago</Text>
                                            </Stack>
                                        </HStack>
                                    </MenuItem>
                                </Stack>
                            </MenuList>
                        </Menu>
                        <Menu autoSelect={false}>
                            <MenuButton>
                                <Avatar size={'md'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                            </MenuButton>
                            <MenuList minW={'sm'}>
                                <Stack gap={0}>
                                    <Card maxW={'full'} p={5} m={4} mt={2} borderTop={'0.5px solid #f0f0f0'}>
                                        <Flex gap={4} align={'center'}>
                                            <Avatar size={'sm'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                                            <Text fontWeight={600}>Segun Adebayo</Text>
                                        </Flex>
                                        <Divider my={3} />
                                        <Button textAlign={'center'}>View personal information</Button>
                                    </Card>
                                    <MenuItem
                                        maxW={'95%'}
                                        borderRadius={10}
                                        p={3}
                                        mx={2}
                                        fontSize={17}
                                        fontWeight={600}
                                    >
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
                                    </MenuItem>
                                    <MenuItem
                                        maxW={'95%'}
                                        borderRadius={10}
                                        p={3}
                                        mx={2}
                                        fontSize={17}
                                        fontWeight={600}
                                    >
                                        <Button
                                            px={3}
                                            borderRadius={'full'}
                                            mr={3}
                                            bg={'#dedede'}
                                            _hover={{ bg: '#dedede' }}
                                        >
                                            <FaGlobe />
                                        </Button>
                                        Language
                                    </MenuItem>
                                    <MenuItem
                                        maxW={'95%'}
                                        borderRadius={10}
                                        p={3}
                                        mx={2}
                                        fontSize={17}
                                        fontWeight={600}
                                    >
                                        <Button
                                            px={3}
                                            borderRadius={'full'}
                                            mr={3}
                                            bg={'#dedede'}
                                            _hover={{ bg: '#dedede' }}
                                        >
                                            <FaClockRotateLeft />
                                        </Button>
                                        Appointment History
                                    </MenuItem>
                                    <MenuItem
                                        maxW={'95%'}
                                        borderRadius={10}
                                        p={3}
                                        mx={2}
                                        fontSize={17}
                                        fontWeight={600}
                                    >
                                        <Button
                                            px={3}
                                            borderRadius={'full'}
                                            mr={3}
                                            bg={'#dedede'}
                                            _hover={{ bg: '#dedede' }}
                                        >
                                            <FaStar />
                                        </Button>
                                        Rating and Feedback
                                    </MenuItem>
                                    <MenuItem
                                        maxW={'95%'}
                                        borderRadius={10}
                                        p={3}
                                        mx={2}
                                        fontSize={17}
                                        fontWeight={600}
                                        onClick={() => {
                                            setIsLogin(false)
                                            onSignout()
                                        }}
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
                            </MenuList>
                        </Menu>
                    </HStack>
                ) : (
                    <HStack gap={5}>
                        <Button
                            borderRadius={8}
                            px={6}
                            py={'1.5rem'}
                            colorScheme="cyan"
                            variant='ghost'
                            fontSize={18}
                            onClick={() => navigate('/signup')}
                        >
                            Register
                        </Button>
                        <Button
                            borderRadius={8}
                            px={6}
                            py={'1.5rem'}
                            colorScheme="twitter"
                            fontSize={18}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </Button>
                    </HStack>
                )}
            </HStack>
        </Box>
    );
};

export default Navbar;
