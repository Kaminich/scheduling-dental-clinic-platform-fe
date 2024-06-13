import { Card, CardBody, Heading, Text, Stack, Button } from "@chakra-ui/react";
import { Color } from "../../styles/styles";
import { Link } from "react-router-dom";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const NotFoundPage = () => {
    const { role } = useAuth();
    const [navigate, setNavigate] = useState<string>('');

    useEffect(() => {
        changeTabTitle('404 Error');
    }, []);

    useEffect(() => {
        if (role === 'Admin') {
            setNavigate('/admin');
        } else if (role === 'Owner') {
            setNavigate('/owner');
        } else if (role === 'Staff') {
            setNavigate('/staff');
        } else if (role === 'Dentist') {
            setNavigate('/dentist');
        } else {
            setNavigate('/');
        }
    }, [role]);

    return (
        <Stack align={'center'} justify={'center'} h={'100vh'} bg={Color.blue_100}>
            <Card borderRadius={20}>
                <CardBody p={10} px={36}>
                    <Stack align={'center'} gap={6}>
                        <Heading fontSize={200} color={'blue.100'} textShadow={'black 0px 0px 2px'}>404</Heading>
                        <Heading mb={2}>Oops! Page Not Found</Heading>
                        <Text>Sorry, the page you're looking for doesn't exist.</Text>
                        <Link to={navigate}>
                            <Button colorScheme="blue">
                                Go back to Home
                            </Button>
                        </Link>
                    </Stack>
                </CardBody>
            </Card>
        </Stack>
    );
};

export default NotFoundPage;
