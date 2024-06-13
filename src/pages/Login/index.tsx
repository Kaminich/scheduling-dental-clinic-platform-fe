import { AbsoluteCenter, Box, Button, Divider, FormControl, FormLabel, HStack, Heading, Image, Input, InputGroup, InputRightElement, Stack, Text, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Logo from "../../components/logo";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import ApiClient from "../../services/apiClient";
import { useAuth } from "../../hooks/useAuth";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { formatRoleString } from "../../utils/formatRoleString";

interface DecodeJWTRole {
    role: string;
}

const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPass, setShowPass] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();

    const { setIsAuthenticated, setRole } = useAuth();

    const api = new ApiClient<any>('/auth/login');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const data = {
            usernameOrEmail: username,
            password,
        };

        try {
            const response = await api.postUnauthen(data);
            console.log(response.data);

            if (response.data.success === false) {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
            } else {
                localStorage.setItem('access_token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refreshToken);
                const decoded = jwtDecode<DecodeJWTRole>(response.data.token);
                setIsAuthenticated(true);
                setRole(formatRoleString(decoded.role[0]));
                if (formatRoleString(decoded.role[0]) === 'Customer') {
                    navigate('/');
                } else if (formatRoleString(decoded.role[0]) === 'Admin') {
                    navigate('/admin');
                }
            }
        } catch (error) {
            console.log(error);

            if (error instanceof AxiosError) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
            }
        }
    };

    const responseMessage = (response: any) => {
        console.log(response);
    };
    const errorMessage = (error: any) => {
        console.log(error);
    };

    useEffect(() => {
        changeTabTitle('Login');
    }, []);

    return (
        <HStack maxW={'full'} maxH={'100%'}>
            <Box flex={1}>
                <Box pos={'fixed'} top={5} left={3}>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </Box>
                <Stack maxW={'md'} gap={5} m={'auto'}>
                    <Heading fontSize={"2xl"} textAlign={'center'} mb={10}>Login to F-Dental</Heading>
                    <FormControl id="email">
                        <FormLabel pl={1}>Username</FormLabel>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel pl={1}>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPass ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width='3.5rem' cursor='pointer' onClick={() => setShowPass(!showPass)}>
                                {!showPass ? <FaEye /> : <FaEyeSlash />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={6} mt={5}>
                        <Button
                            colorScheme={"blue"}
                            variant={"solid"}
                            onClick={handleLogin}
                        >
                            Sign in
                        </Button>
                        <Box position='relative'>
                            <Divider borderColor={'black'} />
                            <AbsoluteCenter bg={'white'} px={2}>
                                or
                            </AbsoluteCenter>
                        </Box>
                        <HStack w={'full'} justify={'center'}>
                            <GoogleLogin
                                onSuccess={responseMessage}
                                width={'400'}
                                size="large"
                                shape="pill"
                                locale="EN"
                            />
                        </HStack>
                        <HStack gap={2} justify={'center'}>
                            <Text align={"center"}>
                                Don't have account?
                            </Text>
                            <Text style={{ color: "#00d4d8" }}>
                                <Link to={'/signup'}>
                                    Registration
                                </Link>
                            </Text>
                        </HStack>
                    </Stack>
                </Stack>
            </Box>
            <HStack flex={1} h={'full'}>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    h={'100vh'}
                    w={'auto'}
                />
            </HStack>
        </HStack>
    )
}

export default LoginPage