import { HStack, Stack, Text } from "@chakra-ui/react";
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
                    <Text>Address: Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương</Text>
                    <Text>Email: fdental@gmail.com</Text>
                </Stack>
                <HStack gap={8} fontSize='16px' fontWeight='300'>
                    <Text>About</Text>
                    <Text>Dental Clinic</Text>
                    <Text>Dentist</Text>
                    <Text>Service</Text>
                    <Text>Blog</Text>
                </HStack>
            </HStack>
            <Text textAlign='center' fontSize='18px' fontWeight='400'>Copyright &#169; 2024 Dental Clinic</Text>
        </Stack>
    );
};

export default Footer;
