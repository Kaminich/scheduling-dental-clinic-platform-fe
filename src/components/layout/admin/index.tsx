import { Box, HStack, Stack } from "@chakra-ui/react"
import { Outlet, useLocation } from "react-router"
import AdminNavbar from "../components/admin_navbar"
import SideBar from "../components/sidebar"
import { useEffect, useState } from "react"

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <AdminNavbar type="admin" />
            <HStack align='flex-start' mt={'96px'}>
                <Box flex={1}>
                    <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                </Box>
                <Stack
                    py={2}
                    flex={1}
                    flexBasis={'full'}
                    alignSelf='flex-start'
                    ml={collapsed ? 24 : 270}
                    transition="margin-left 0.3s ease-in-out"
                >
                    <Stack m={'auto'} w={'90%'}>
                        <Outlet />
                    </Stack>
                </Stack>
            </HStack>
        </>
    )
}

export default AdminLayout