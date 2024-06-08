import { Box, HStack } from "@chakra-ui/react";
import Logo from "../../../logo";
import { Link } from "react-router-dom";
import Notification from "../notification";
import PersonalMenu from "../personal_menu";
import { Color } from "../../../../styles/styles";

const AdminNavbar = () => {


    return (
        <Box
            minW={'full'}
            pos={'fixed'}
            top={0}
            zIndex={10}
            bg={Color.blue_100}
        >
            <HStack
                p={2}
                justify='space-between'
                m={'auto'}
            >
                <Link to={'/admin'}>
                    <Logo />
                </Link>
                <HStack mr={20}>
                    <Notification />
                    <PersonalMenu type="ADMIN" />
                </HStack>

            </HStack>
        </Box>
    );
};

export default AdminNavbar;
