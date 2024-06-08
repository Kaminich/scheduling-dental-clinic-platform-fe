import { Card, CardBody, CardFooter, CardHeader, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBowlFood, FaBreadSlice, FaCartShopping, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Dashboard = () => {
    const navigate = useNavigate();


    const [overallData, setOverallData] = useState<any>({
        user_count: 0,
        menu_count: 0,
        order_count: 0,
        food_count: 0
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [orderData, setOrderData] = useState([
        {
            "name": "Active",
            "color": "green",
            "value": 0
        },
        {
            "name": "Closed",
            "color": "red",
            "value": 0
        },
        {
            "name": "Expired",
            "color": "gray",
            "value": 0
        },
    ]);

    const tabletWidth = 820;
    const isTabletWidth = window.innerWidth <= tabletWidth;
    const outerRadius = isTabletWidth ? 100 : 130;
    const innerRadius = isTabletWidth ? 55 : 85;

    const data = [
        {
            "name": "Users",
            "Miền Nam": 4000,
            "Miền Bắc": 2400
        },
        {
            "name": "Orders",
            "Miền Nam": 3000,
            "Miền Bắc": 1398
        },
        {
            "name": "Visitors",
            "Miền Nam": 2000,
            "Miền Bắc": 9800
        },
        {
            "name": "Page D",
            "Miền Nam": 2780,
            "Miền Bắc": 3908
        },
    ]

    useEffect(() => {
        setLoading(true);

        axios
            .get(
                `${import.meta.env.VITE_SERVER_URL
                }/api/admin/overall_statistic`,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem(
                                "access_token"
                            ),
                    },
                }
            )
            .then(({ data }) => {
                setOverallData({
                    user_count: data.data[0].user_count,
                    menu_count: data.data[0].menu_count,
                    order_count: data.data[0].order_count,
                    food_count: data.data[0].food_count
                })
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
            });

        axios
            .get(
                `${import.meta.env.VITE_SERVER_URL
                }/api/admin/order_statistic`,
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem(
                                "access_token"
                            ),
                    },
                }
            )
            .then(({ data }) => {
                console.log(data.data[0]);
                setOrderData([
                    {
                        "name": "Active",
                        "color": "green",
                        "value": data.data[0].active_order_count
                    },
                    {
                        "name": "Closed",
                        "color": "red",
                        "value": data.data[0].closed_order_count
                    },
                    {
                        "name": "Expired",
                        "color": "gray",
                        "value": data.data[0].expired_order_count
                    },
                ])
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
            });

    }, [])

    return (

        <Stack w={'full'} align='center' mx='auto' mt={10}>
            <HStack w='full' gap={10} flexDir={{ md: 'column', lg: 'row' }}>
                <HStack flex={1} w={'full'} gap={10}>
                    <Card flex={1}>
                        <CardHeader>
                            <HStack justify='space-between'>
                                <Text>Users</Text>
                                <FaUser />
                            </HStack>
                        </CardHeader>
                        <CardBody fontSize={'3rem'}>{overallData.user_count}</CardBody>
                        <CardFooter py={3} bgColor={'#FF9096'}>Increase by</CardFooter>
                    </Card>
                    <Card flex={1}>
                        <CardHeader>
                            <HStack justify='space-between'>
                                <Text>Menus</Text>
                                <FaBreadSlice />
                            </HStack>
                        </CardHeader>
                        <CardBody fontSize={'3rem'}>{overallData.menu_count}</CardBody>
                        <CardFooter py={3} bgColor={"#3CD2BE"}>Increase by</CardFooter>
                    </Card>
                </HStack>
                <HStack flex={1} w={'full'} gap={10}>
                    <Card flex={1}>
                        <CardHeader>
                            <HStack justify='space-between'>
                                <Text>Food</Text>
                                <FaBowlFood />
                            </HStack>
                        </CardHeader>
                        <CardBody fontSize={'3rem'}>{overallData.food_count}</CardBody>
                        <CardFooter py={3} bgColor={"#3E9EE9"}>Increase by</CardFooter>
                    </Card>
                    <Card flex={1}>
                        <CardHeader>
                            <HStack justify='space-between'>
                                <Text>Orders</Text>
                                <FaCartShopping />
                            </HStack>
                        </CardHeader>
                        <CardBody fontSize={'3rem'}>{overallData.order_count}</CardBody>
                        <CardFooter py={3} bgColor={"#CAD13D"}>Increase by</CardFooter>
                    </Card>
                </HStack>
            </HStack>
            <HStack mt={10} w='full' gap={{ md: 3, lg: 10 }}>
                <Card flex={{ md: 1, lg: 2 }} w={'full'}>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={450}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend iconSize={20} />
                                <Bar dataKey="Miền Nam" fill="#8884d8" />
                                <Bar dataKey="Miền Bắc" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
                <Card flex={1}>
                    <Heading fontSize={'x-large'} my={3} textAlign={'center'}>Order Statistic</Heading>
                    <CardBody>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie data={orderData} dataKey="value" nameKey="name" cx="46%" cy="45%" outerRadius={outerRadius} innerRadius={innerRadius} startAngle={90} endAngle={-360} label>
                                    {
                                        orderData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                                    }
                                </Pie>
                                <Legend chartHeight={360} iconSize={20} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardBody>
                </Card>
            </HStack>
        </Stack>
    )
}

export default Dashboard;