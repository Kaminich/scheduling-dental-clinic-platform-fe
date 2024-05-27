import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import Layout from "../components/layout";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import DentalPage from "../pages/Dental";
import DentistPage from "../pages/Dentist";
import DentalDetailPage from "../pages/DentalDetail";
import DentistDetailPage from "../pages/DentistDetail";

type NonIndexRoute = {
    path: string;
    element: JSX.Element;
    children?: NonIndexRoute[];
};

type IndexRoute = {
    path: string;
    element: JSX.Element;
    children?: NonIndexRoute[];
};

const routes = [
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "home", element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "dental", element: <DentalPage /> },
            { path: "dental-detail", element: <DentalDetailPage /> },
            { path: "dentist", element: <DentistPage /> },
            { path: "dentist-detail", element: <DentistDetailPage /> },
        ],
    }
];

const router = createBrowserRouter(routes);

export default router;
