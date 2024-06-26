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
import MessagePage from "../pages/Message";
import ViewSchedulePage from "../pages/ViewSchedule";
import ManageAppointmentPage from "../pages/ManageAppointment";
import MedicalRecordPage from "../pages/MedicalRecord";
import ApproveDentistPage from "../pages/DentalClinicSettings/ApproveDentist";
import ApproveStaffPage from "../pages/DentalClinicSettings/ApproveStaff";
import CreateDentistPage from "../pages/AccountSettings/CreateDentist";
import CreateStaffPage from "../pages/AccountSettings/CreateStaff";
import CreateBlogPage from "../pages/BlogSettings/CreateBlog";
import UpdateDentistPage from "../pages/AccountSettings/UpdateDentist";
import UpdateStaffPage from "../pages/AccountSettings/UpdateStaff";
import DentalClinicSettings from "../pages/DentalClinicSettings";
import DentalDetailSettingsPage from "../pages/DentalDetailSettings";
import DentistProfileDetailPage from "../pages/AccountSettings/DentistProfileDetail";
import StaffProfileDetailPage from "../pages/AccountSettings/StaffProfileDetail";

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
                path: "update-profile/:type",
                element: <UpdateProfilePage />
            },
            {
                path: "message",
                element: <MessagePage />
            },
            {
                path: "administrator/dentals/manage-dental/dental-detail",
                element: <DentalDetailSettingsPage />
            },
            {
                path: "administrator/dentals/dental-detail",
                element: <DentalDetailSettingsPage />
            },
            {
                path: "administrator/blogs/appprove-blog/blog-detail",
                element: <BlogDetailPage />
            },
            {
                path: "administrator/blogs/manage-blog/blog-detail",
                element: <BlogDetailPage />
            },
            {
                path: "administrator/blogs/blog-detail",
                element: <BlogDetailPage />
            },
            {
                path: "administrator/accounts/create-dentist",
                element: <CreateDentistPage />
            },
            {
                path: "administrator/accounts/create-staff",
                element: <CreateStaffPage />
            },
            {
                path: "administrator/accounts/dentist/:id",
                element: <DentistProfileDetailPage />
            },
            {
                path: "administrator/accounts/staff/:id",
                element: <StaffProfileDetailPage />
            },
            {
                path: "administrator/accounts/dentist/:id/update",
                element: <UpdateDentistPage />
            },
            {
                path: "administrator/accounts/staff/:id/update",
                element: <UpdateStaffPage />
            },
            {
                path: "manage-blog/blog-detail",
                element: <BlogDetailPage />
            },
            {
                path: "manage-blog/create-blog",
                element: <CreateBlogPage />
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
            { path: "dentists/:name", element: <DentistDetailPage /> },
            { path: "services", element: <ServicePage /> },
            { path: "blogs", element: <BlogPage /> },
            { path: "blog-detail", element: <BlogDetailPage /> },
            { path: "partner-register", element: <PartnerRegisterPage /> },
            { path: "appointment", element: <Appointment /> },
            { path: "medical-record", element: <MedicalRecordPage /> },
            { path: "rating-feedback", element: <RatingFeedbackPage /> },
            { path: "manage-appointment", element: <ManageAppointmentPage /> },
            { path: "manage-blog", element: <ManageBlogPage /> },
            { path: "view-schedule", element: <ViewSchedulePage /> },
        ],
    },
    {
        path: "/administrator",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Navigate to={'dashboard'} /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "accounts", element: <AccountSettings /> },
            { path: "dentals/approve-dental", element: <ApproveDentalClinicPage /> },
            { path: "dentals/manage-dental", element: <ManageDentalClinicPage /> },
            { path: "dentals/approve-dentist", element: <ApproveDentistPage /> },
            { path: "dentals/approve-staff", element: <ApproveStaffPage /> },
            { path: "feedbacks", element: <FeedbackSettingPage /> },
            { path: "blogs/approve-blog", element: <ApproveBlogPage /> },
            { path: "blogs/manage-blog", element: <ManageBlogPage /> },
            { path: "dentals", element: <DentalClinicSettings /> },
            { path: "services", element: <ManageDentalClinicPage /> },
            { path: "blogs", element: <ManageBlogPage /> },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
