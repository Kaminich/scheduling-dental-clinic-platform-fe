import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import Layout from "../components/layout/customer";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import DentalPage from "../pages/Dental";
import DentistPage from "../pages/Dentist";
import DentalDetailPage from "../pages/DentalDetail";
import DentistDetailPage from "../pages/DentistDetail";
import BlogDetailPage from "../pages/BlogDetail";
import BlogPage from "../pages/Blog";
import PartnerRegisterPage from "../pages/PartnerRegister";
import ProfilePage from "../pages/Profile";
import UpdateProfilePage from "../pages/UpdateProfile";
import Appointment from "../pages/Appointment";
import RatingFeedbackPage from "../pages/RatingFeedback";
import ServicePage from "../pages/Service";
import AdminLayout from "../components/layout/admin";
import NotFoundPage from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import AccountSettings from "../pages/AccountSettings";
import ApproveDentalClinicPage from "../pages/DentalClinicSettings/ApproveDentalClinic";
import ManageDentalClinicPage from "../pages/DentalClinicSettings/ManageDentalClinic";

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
        path: '*',
        element: <NotFoundPage />,
    },
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
            { index: true, element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "dentals", element: <DentalPage /> },
            { path: "dental-detail", element: <DentalDetailPage /> },
            { path: "dentists", element: <DentistPage /> },
            { path: "dentist-detail", element: <DentistDetailPage /> },
            { path: "services", element: <ServicePage /> },
            { path: "blogs", element: <BlogPage /> },
            { path: "blog-detail", element: <BlogDetailPage /> },
            { path: "partner-register", element: <PartnerRegisterPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "update-profile/:type", element: <UpdateProfilePage /> },
            { path: "appointment", element: <Appointment /> },
            { path: "rating-feedback", element: <RatingFeedbackPage /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to={'dashboard'} /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "accounts", element: <AccountSettings /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "update-profile/:type", element: <UpdateProfilePage /> },
            { path: "dental-setting/approve-dental", element: <ApproveDentalClinicPage /> },
            { path: "dental-setting/manage-dental", element: <ManageDentalClinicPage /> },
        ],
    }
];

const router = createBrowserRouter(routes);

export default router;
