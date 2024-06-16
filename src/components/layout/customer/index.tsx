import { Stack } from "@chakra-ui/react"
import Navbar from "../components/navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import ChatBox from '../../../components/chatbox';
import { useAuth } from "../../../hooks/useAuth"
import NotFoundPage from "../../../pages/NotFound"

const Layout = () => {
    const { pathname } = useLocation();
    const { role } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (role === 'Admin' || role === 'Owner') {
        return <NotFoundPage />
    }

    return (
        <>
            <Navbar />
            <Stack mt={'96px'} minH={'calc(100vh - 96px - 236.8px)'}>
                <Outlet />
            </Stack>
            <ChatBox />
            <Footer />
        </>
    )
}

export default Layout