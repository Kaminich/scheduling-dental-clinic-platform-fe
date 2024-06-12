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
import SystemLayout from "../components/layout/system";
import ManageBlogPage from "../pages/BlogSettings/ManageBlog";
import ApproveBlogPage from "../pages/BlogSettings/ApproveBlog";
import FeedbackSettingPage from "../pages/FeedbackSettings";
import ClinicDentailSettings from "../pages/ClinicDetailSettings";

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
        element: <SystemLayout />,
        children: [
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "admin/dentals/manage-dental/dental-detail",
                element: <ClinicDentailSettings />
            },
            {
                path: "update-profile/:type",
                element: <UpdateProfilePage />
            },
            {
                path: "admin/blogs/appprove-blog/blog-detail",
                element: <BlogDetailPage type="admin" />
            },
            {
                path: "admin/blogs/manage-blog/blog-detail",
                element: <BlogDetailPage type="admin" />
            },
        ],
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
            { path: "blog-detail", element: <BlogDetailPage type="customer" /> },
            { path: "partner-register", element: <PartnerRegisterPage /> },
            { path: "appointment", element: <Appointment /> },
            { path: "rating-feedback", element: <RatingFeedbackPage /> },
        ],
    },
    {
        path: "/staff",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
        ],
    },
    {
        path: "/dentist",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to={'dashboard'} /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "accounts", element: <AccountSettings /> },
            { path: "dentals/approve-dental", element: <ApproveDentalClinicPage /> },
            { path: "dentals/manage-dental", element: <ManageDentalClinicPage /> },
            { path: "feedbacks", element: <FeedbackSettingPage /> },
            { path: "blogs/approve-blog", element: <ApproveBlogPage /> },
            { path: "blogs/manage-blog", element: <ManageBlogPage /> },
        ],
    },
    {
        path: "/clinic-owner",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to={'dashboard'} /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "accounts", element: <AccountSettings /> },
            { path: "dentals", element: <ManageDentalClinicPage /> },
            { path: "services", element: <ManageDentalClinicPage /> },
            { path: "blogs", element: <ManageBlogPage /> },
        ],
    }
];

const router = createBrowserRouter(routes);

export default router;
