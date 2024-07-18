import { Box, Button, HStack, Text } from "@chakra-ui/react";
import Logo from "../../../logo";
import { Link, useNavigate } from "react-router-dom";
import PersonalMenu from "../personal_menu";
import { useAuth } from "../../../../hooks/useAuth";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, role } = useAuth();

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
                <Link to={'/'}>
                    <Logo />
                </Link>
                <HStack gap={10}>
                    <Text>
                        <Link to={'/'}>
                            Home
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'about'}>
                            About
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'dentals'}>
                            Dental Clinic
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'dentists'}>
                            Dentist
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'services'}>
                            Service
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'blogs'}>
                            Blog
                        </Link>
                    </Text>
                    {role !== 'Dentist' && role !== 'Staff' && (
                        <Text>
                            <Link to={'partner-register'}>
                                Partner Registration
                            </Link>
                        </Text>
                    )}
                </HStack>
                {isAuthenticated ? (
                    <HStack>
                        {/* <Notification />
                        {role === 'Staff' && (
                            <MessageMenu />
                        )} */}
                        <PersonalMenu />
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
                            onClick={() => navigate('signup')}
                        >
                            Register
                        </Button>
                        <Button
                            borderRadius={8}
                            px={6}
                            py={'1.5rem'}
                            colorScheme="twitter"
                            fontSize={18}
                            onClick={() => navigate('login')}
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
