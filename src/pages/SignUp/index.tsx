import { AbsoluteCenter, Box, Button, Divider, FormControl, FormLabel, HStack, Heading, Icon, Image, Input, InputGroup, InputRightElement, Select, Stack, Text, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Logo from "../../components/logo";
import { Link, useNavigate } from "react-router-dom";
import { today } from "../../components/modal/appointment";
import { useGoogleLogin } from "@react-oauth/google";
import ApiClient from "../../services/apiClient";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { FcGoogle } from "react-icons/fc";
import { Border } from "../../styles/styles";

const SignUpPage = () => {
    const [username, setUsername] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dob, setDob] = useState<Date | string>('');
    const [gender, setGender] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const toast = useToast();
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
    const googleSignup = useGoogleLogin({
        onSuccess: (token) => console.log(token),
        onError: (error) => {
            console.log(error);
            toast({
                title: "Sign Up Error",
                description: "Sign up by Google failed. Try again!!!",
                status: "error",
                duration: 2500,
                isClosable: true,
            });
        }
    })

    const navigate = useNavigate();

    const responseMessage = (response: any) => {
        console.log(response);
    };

    const api = new ApiClient<any>('/auth/register');

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                status: "error",
                duration: 2500,
                isClosable: true,
            });
            return;
        }

        const data = {
            username,
            fullName,
            password,
            dob,
            gender,
            phone,
            email,
            address
        };

        try {
            const response = await api.postUnauthen(data);
            console.log(response);

            if (response.success) {
                toast({
                    title: "Success",
                    description: response.message,
                    status: "success",
                    duration: 2500,
                    isClosable: true,
                });
                navigate('/login');
            } else {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                status: "error",
                duration: 2500,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        changeTabTitle('Sign Up');
    }, []);

    return (
        <HStack maxW={'full'} minH={'100vh'}>
            <HStack flex={1} h={'full'}>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    h={'100vh'}
                    w={'auto'}
                />
            </HStack>
            <Box flex={1}>
                <Box pos={'fixed'} top={1}>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </Box>
                <Stack maxW={'md'} gap={1} m={'auto'} mt={8}>
                    <Heading
                        fontSize={"2xl"}
                        textAlign={'center'}
                        mb={2}
                    >
                        Sign up to F-Dental
                    </Heading>
                    <HStack>
                        <FormControl id="username" flex={2} isRequired>
                            <FormLabel pl={1}>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl id="gender" flex={1} isRequired>
                            <FormLabel pl={1}>Gender</FormLabel>
                            <Select
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                placeholder={'Select gender'}
                            >
                                <option value="Male">
                                    Male
                                </option>
                                <option value="Female">
                                    Female
                                </option>
                                <option value="Other">
                                    Other
                                </option>
                            </Select>
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl id="fullName" flex={2} isRequired>
                            <FormLabel pl={1}>Full Name</FormLabel>
                            <Input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl id="dob" flex={1} isRequired>
                            <FormLabel pl={1}>Date of Birth</FormLabel>
                            <Input
                                type="date"
                                max={today}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl id="email" flex={1.7} isRequired>
                            <FormLabel pl={1}>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl id="phone" flex={1} isRequired>
                            <FormLabel pl={1}>Phone Number</FormLabel>
                            <Input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </FormControl>
                    </HStack>
                    <FormControl id="address" flex={2} isRequired>
                        <FormLabel pl={1}>Address</FormLabel>
                        <Input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel pl={1}>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPass ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <InputRightElement width='3.5rem' cursor='pointer' onClick={() => setShowPass(!showPass)}>
                                {!showPass ? <FaEye /> : <FaEyeSlash />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="confirm-password" isRequired>
                        <FormLabel pl={1}>Confirm Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showConfirmPass ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <InputRightElement width='3.5rem' cursor='pointer' onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                {!showConfirmPass ? <FaEye /> : <FaEyeSlash />}
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack gap={4} mt={2}>
                        <Button
                            colorScheme={"blue"}
                            variant={"solid"}
                            onClick={handleSignUp}
                        >
                            Sign up
                        </Button>
                        <Box position='relative'>
                            <Divider borderColor={'black'} />
                            <AbsoluteCenter bg={'white'} px={1}>
                                or
                            </AbsoluteCenter>
                        </Box>
                        <HStack w={'full'} justify={'center'} mb={2}>
                            <Button
                                leftIcon={<Icon as={FcGoogle} />}
                                bg={'white'}
                                border={Border.tableBorder}
                                size="lg"
                                onClick={() => googleSignup()}
                            >
                                Sign up with Google
                            </Button>
                        </HStack>
                    </Stack>
                    <HStack gap={2} justify={'center'}>
                        <Text align={"center"}>
                            Already a user?
                        </Text>
                        <Text style={{ color: "#00d4d8" }} >
                            <Link to={'/login'}>
                                Login
                            </Link>
                        </Text>
                    </HStack>
                </Stack>
            </Box>
        </HStack>
    )
}

export default SignUpPage