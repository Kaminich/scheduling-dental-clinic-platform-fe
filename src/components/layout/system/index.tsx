import { Stack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import AdminNavbar from "../components/admin_navbar"
import { useAuth } from "../../../hooks/useAuth"
import NotFoundPage from "../../../pages/NotFound"

const SystemLayout = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <NotFoundPage />
    }

    return (
        <>
            <AdminNavbar type="system" />
            <Stack mt={'96px'} minH={`calc(100vh - 96px)`}>
                <Outlet />
            </Stack>
        </>
    )
}

export default SystemLayout