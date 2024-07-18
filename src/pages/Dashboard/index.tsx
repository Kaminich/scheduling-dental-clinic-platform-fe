import { Card, CardBody, CardHeader, HStack, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCalendar, FaHospital, FaNewspaper, FaStar, FaUser } from "react-icons/fa6";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { changeTabTitle } from "../../utils/changeTabTitle";
import { useAuth } from "../../hooks/useAuth";
import ApiClient from "../../services/apiClient";
import AdminDashboardResponse, { initialAdminDashboardResponse } from "../../types/AdminDashboardResponse";
import OwnerDashboardResponse, { initialOwnerDashboardResponse } from "../../types/OwnerDashboardResponse";
import Loading from "../../components/loading";

const Dashboard = () => {
    const { role } = useAuth();
    const toast = useToast();
    const [adminDashboard, setAdminDashboard] = useState<AdminDashboardResponse>(initialAdminDashboardResponse);
    const [ownerDashboard, setOwnerDashboard] = useState<OwnerDashboardResponse>(initialOwnerDashboardResponse);
    const [loading, setLoading] = useState<boolean>(false);
    const [clinicData, setClinicData] = useState([
        {
            "name": "Active",
            "color": "green",
            "value": 0
        },
        {
            "name": "Inactive",
            "color": "red",
            "value": 0
        },
        {
            "name": "Pending",
            "color": "yellow",
            "value": 0
        },
    ]);

    const [appointmentData, setAppointmentData] = useState([
        {
            "name": "Done",
            "color": "green",
            "value": 0
        },
        {
            "name": "Canceled",
            "color": "red",
            "value": 0
        },
        {
            "name": "Pending",
            "color": "yellow",
            "value": 0
        },
    ]);

    const dataAdmin = [
        {
            "name": "Customers",
            "Customers": adminDashboard.numberOfCustomers,
        },
        {
            "name": "Dentists",
            "Dentists": adminDashboard.numberOfClinicDentists,
        },
        {
            "name": "Staffs",
            "Staffs": adminDashboard.numberOfClinicStaffs,
        },
        {
            "name": "Owners",
            "Owners": adminDashboard.numberOfClinicOwners,
        },
    ]

    const dataOwner = [
        {
            "name": "Dentists",
            "Dentists": ownerDashboard.numberOfClinicDentists,
        },
        {
            "name": "Staffs",
            "Staffs": ownerDashboard.numberOfClinicStaffs,
        },
    ]

    const tabletWidth = 820;
    const isTabletWidth = window.innerWidth <= tabletWidth;
    const outerRadius = isTabletWidth ? 100 : 130;
    const innerRadius = isTabletWidth ? 55 : 85;

    const getDashboardData = async () => {
        setLoading(true);
        if (role === 'Admin') {
            const api = new ApiClient<any>('/accounts/admin/dashboard');
            try {
                const response = await api.getAuthen();
                console.log(response);

                if (response.success) {
                    setAdminDashboard(response.data)
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response.data.message || 'An error has occured',
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        } else {
            const api = new ApiClient<any>('/accounts/owner/dashboard');
            try {
                const response = await api.getAuthen();
                if (response.success) {
                    setOwnerDashboard(response.data)
                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response.data.message || 'An error has occured',
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        changeTabTitle('Dashboard');
    }, []);

    useEffect(() => {
        getDashboardData();
    }, [role]);

    useEffect(() => {
        if (adminDashboard) {
            setClinicData(prevClinicData =>
                prevClinicData.map(data => {
                    switch (data.name) {
                        case 'Active':
                            return { ...data, value: adminDashboard.numberOfActiveDentalClinic || 0 };
                        case 'Inactive':
                            return { ...data, value: adminDashboard.numberOfInactiveDentalClinic || 0 };
                        case 'Pending':
                            return { ...data, value: adminDashboard.numberOfPendingDentalClinic || 0 };
                        default:
                            return data;
                    }
                })
            );
        }
    }, [adminDashboard]);

    useEffect(() => {
        if (ownerDashboard) {
            setAppointmentData(prevAppointmentData =>
                prevAppointmentData.map(data => {
                    switch (data.name) {
                        case 'Done':
                            return { ...data, value: ownerDashboard.numberOfDoneAppointments || 0 };
                        case 'Canceled':
                            return { ...data, value: ownerDashboard.numberOfCanceledAppointments || 0 };
                        case 'Pending':
                            return { ...data, value: ownerDashboard.numberOfPendingAppointments || 0 };
                        default:
                            return data;
                    }
                })
            );
        }
    }, [ownerDashboard]);

    if (role === 'Admin') {
        return (
            <Stack w={'full'} align='center' mx='auto' mt={10}>
                {!loading ? (
                    <>
                        <HStack w='full' gap={10}>
                            <Card flex={1}>
                                <CardHeader>
                                    <HStack justify='space-between'>
                                        <Text>Users</Text>
                                        <FaUser />
                                    </HStack>
                                </CardHeader>
                                <CardBody fontSize={'3rem'}>{adminDashboard.numberOfClinicUsers}</CardBody>
                            </Card>
                            <Card flex={1}>
                                <CardHeader>
                                    <HStack justify='space-between'>
                                        <Text>Dental Clinics</Text>
                                        <FaHospital />
                                    </HStack>
                                </CardHeader>
                                <CardBody fontSize={'3rem'}>{adminDashboard.numberOfDentalClinic}</CardBody>
                            </Card>
                            <Card flex={1}>
                                <CardHeader>
                                    <HStack justify='space-between'>
                                        <Text>Blogs</Text>
                                        <FaNewspaper />
                                    </HStack>
                                </CardHeader>
                                <CardBody fontSize={'3rem'}>{adminDashboard.numberOfBlogs}</CardBody>
                            </Card>
                        </HStack>
                        <HStack mt={10} w='full'>
                            <Card flex={1.5} w={'full'} gap={5}>
                                <CardBody>
                                    <ResponsiveContainer width="100%" height={450}>
                                        <BarChart data={dataAdmin}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend iconSize={20} />
                                            <Bar dataKey="Customers" fill="#8884d8" />
                                            <Bar dataKey="Dentists" fill="green" />
                                            <Bar dataKey="Staffs" fill="blue" />
                                            <Bar dataKey="Owners" fill="teal" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardBody>
                            </Card>
                            <Card flex={1}>
                                <Heading fontSize={'x-large'} my={3} textAlign={'center'}>Clinics Statistic</Heading>
                                <CardBody>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <PieChart>
                                            <Pie data={clinicData} dataKey="value" nameKey="name" cx="46%" cy="45%" outerRadius={outerRadius} startAngle={90} endAngle={-360} label>
                                                {
                                                    clinicData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                                                }
                                            </Pie>
                                            <Legend chartHeight={360} iconSize={20} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardBody>
                            </Card>
                        </HStack>
                    </>
                ) : (
                    <Stack m={'auto'}>
                        <Loading />
                    </Stack>
                )}
            </Stack>
        )
    } else {
        return (
            <Stack w={'full'} align='center' mx='auto' mt={10}>
                {!loading ? (
                    <>
                        <HStack w='full' gap={10}>
                            <Card flex={1}>
                                <CardHeader>
                                    <HStack justify='space-between'>
                                        <Text>Users</Text>
                                        <FaUser />
                                    </HStack>
                                </CardHeader>
                                <CardBody fontSize={'3rem'}>{ownerDashboard.numberOfClinicUsers}</CardBody>
                            </Card>
                            <Card flex={1}>
                                <CardHeader>
                                    <HStack justify='space-between'>
                                        <Text>Appointment</Text>
                                        <FaCalendar />
                                    </HStack>
                                </CardHeader>
                                <CardBody fontSize={'3rem'}>{ownerDashboard.numberOfAppointments}</CardBody>
                            </Card>
                            <Card flex={1}>
                                <CardHeader>
                                    <HStack justify='space-between'>
                                        <Text>Feedback</Text>
                                        <FaStar />
                                    </HStack>
                                </CardHeader>
                                <CardBody fontSize={'3rem'}>{ownerDashboard.numberOfClinicFeedbacks}</CardBody>
                            </Card>
                        </HStack>
                        <HStack mt={10} w='full' gap={{ md: 3, lg: 10 }}>
                            <Card flex={{ md: 1, lg: 2 }} w={'full'}>
                                <CardBody>
                                    <ResponsiveContainer width="100%" height={450}>
                                        <BarChart data={dataOwner}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend iconSize={20} />
                                            <Bar dataKey="Dentists" fill="green" />
                                            <Bar dataKey="Staffs" fill="blue" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardBody>
                            </Card>
                            <Card flex={1}>
                                <Heading fontSize={'x-large'} my={3} textAlign={'center'}>Appointments Statistic</Heading>
                                <CardBody>
                                    <ResponsiveContainer width="100%" height={400}>
                                        <PieChart>
                                            <Pie data={appointmentData} dataKey="value" nameKey="name" cx="46%" cy="45%" outerRadius={outerRadius} innerRadius={innerRadius} startAngle={90} endAngle={-360} label>
                                                {
                                                    appointmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                                                }
                                            </Pie>
                                            <Legend chartHeight={360} iconSize={20} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardBody>
                            </Card>
                        </HStack>
                    </>
                ) : (
                    <Stack m={'auto'}>
                        <Loading />
                    </Stack>
                )}
            </Stack>
        )
    }
}

export default Dashboard;