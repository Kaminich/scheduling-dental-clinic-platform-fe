import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import Logo from "../../../logo";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Notification from "../notification";
import PersonalMenu from "../personal_menu";

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
                        <Link to={'about'}>
                            About
                        </Link>
                    </Text>
                    <Text>
                        <Link to={'dentals'}>
                            Dental
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
                    <Text>
                        <Link to={'partner-register'}>
                            Partner registration
                        </Link>
                    </Text>
                </HStack>
                {isLogin ? (
                    <HStack>
                        <Notification />
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
