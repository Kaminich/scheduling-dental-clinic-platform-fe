import { Box, Button, HStack } from "@chakra-ui/react";
import Logo from "../../../logo";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../notification";
import PersonalMenu from "../personal_menu";
import { Color } from "../../../../styles/styles";
import { FaChevronLeft } from "react-icons/fa6";

interface Prop {
    type: string;
}

const AdminNavbar = ({ type }: Prop) => {
    const navigate = useNavigate();

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
                <HStack>
                    {type === 'system' && (
                        <Button
                            variant={'ghost'}
                            ml={10}
                            py={8}
                            onClick={() => navigate(-1)}
                        >
                            <FaChevronLeft />
                        </Button>
                    )}
                    <Link to={'/admin'}>
                        <Logo />
                    </Link>
                </HStack>
                {type === 'admin' && (
                    <HStack mr={20}>
                        <Notification />
                        <PersonalMenu type="ADMIN" />
                    </HStack>
                )}
            </HStack>
        </Box>
    );
};

export default AdminNavbar;
