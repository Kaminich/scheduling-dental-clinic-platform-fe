import { HStack, Heading, Stack, Text } from "@chakra-ui/react";
import Logo from "../../../logo";

const Footer = () => {

    return (
        <Stack
            // bgImg='https://preview.colorlib.com/theme/foodblog/img/footer-bg.jpg.webp'
            // bgRepeat='no-repeat'
            // bgPos='center'
            pt={2}
            pb={4}
            borderTop='1px solid gainsboro'
            color='black'
            maxW='full'
        >
            <HStack py="10px" justifyContent="space-evenly" maxW={'full'} mb={1}>
                <Stack justify={'flex-start'} fontSize='20px' fontWeight='300'>
                    <Logo />
                    <Text>Address: </Text>
                    <Text>Email: </Text>
                </Stack>
                <Stack gap={4} fontSize='16px' fontWeight='300'>
                    <Heading fontSize={'20px'}>Home</Heading>
                    <Text>Menu</Text>
                    <Text>Order</Text>
                    <Text>Contact</Text>
                </Stack>
                <Stack gap={4} fontSize='16px' fontWeight='300'>
                    <Heading fontSize={'20px'}>Home</Heading>
                    <Text>Menu</Text>
                    <Text>Order</Text>
                    <Text>Contact</Text>
                </Stack>
                <Stack gap={4} fontSize='16px' fontWeight='300'>
                    <Heading fontSize={'20px'}>Home</Heading>
                    <Text>Menu</Text>
                    <Text>Order</Text>
                    <Text>Contact</Text>
                </Stack>
            </HStack>
            <Text textAlign='center' fontSize='18px' fontWeight='400'>Copyright &#169; 2024 Dental Clinic</Text>
        </Stack>
    );
};

export default Footer;
