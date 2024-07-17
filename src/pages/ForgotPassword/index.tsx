import { Box, Button, FormControl, FormLabel, HStack, Heading, Image, Input, Stack, useDisclosure, useToast } from "@chakra-ui/react"
import { FormEvent, useEffect, useRef, useState } from "react";
import Logo from "../../components/logo";
import { Link } from "react-router-dom";
import ApiClient from "../../services/apiClient";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { AxiosError } from "axios";
import RecoverModal from "../../components/modal/recover";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>("");
    const toast = useToast();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const emailRef = useRef<HTMLInputElement>(null);

    const handleRecover = async (e: FormEvent) => {
        e.preventDefault();
        const api = new ApiClient<any>('/auth/recover-password');
        const data = {
            email
        };

        try {
            const response = await api.postUnauthen(data);
            console.log(response);

            if (response.success === false) {
                toast({
                    title: "Error",
                    description: response.message,
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            } else {
                onOpen();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        }
    };

    useEffect(() => {
        changeTabTitle('Forgot Password');
        emailRef.current?.focus();
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
                    <Heading fontSize={"2xl"} textAlign={'center'} mb={10}>Recover Password</Heading>
                    <FormControl id="email">
                        <FormLabel pl={1}>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailRef}
                            placeholder="Email"
                        />
                    </FormControl>
                    <Stack spacing={6} mt={5}>
                        <Button
                            colorScheme={"blue"}
                            variant={"solid"}
                            onClick={handleRecover}
                        >
                            Continue
                        </Button>
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
            <RecoverModal
                isOpen={isOpen}
                onClose={onClose}
                email={email}
            />
        </HStack>
    )
}

export default ForgotPasswordPage