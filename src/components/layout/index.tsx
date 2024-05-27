import { Stack } from "@chakra-ui/react"
import Navbar from "./components/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/footer"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import ChatBox from '../../components/chatbox';

const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Navbar />
            <Stack mt={'96px'}>
                <Outlet />
            </Stack>
            <ChatBox />
            <Footer />
        </>
    )
}

export default Layout