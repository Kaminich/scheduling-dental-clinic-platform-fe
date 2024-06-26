import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { Button, Box, HStack, Stack, Text } from '@chakra-ui/react';
import { FaBriefcaseMedical, FaChartSimple, FaFlag, FaHospital, FaHospitalUser, FaHouseMedicalCircleCheck, FaNewspaper, FaPenToSquare, FaTooth, FaUserDoctor, FaUserGear, FaUserNurse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Color } from '../../../../styles/styles';
import useUserProfile from '../../../../hooks/useUserProfile';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const adminMenuItems: MenuItem[] = [
    getItem(
        <Link to={'dashboard'} style={{ fontSize: '17px' }}>Dashboard</Link>
        , '1'
        , <FaChartSimple />
    ),
    getItem(
        <Link to={'accounts'} style={{ fontSize: '17px' }}>Account Settings</Link>
        , '2'
        , <FaUserGear />
    ),

    getItem(
        <Text fontSize='17px'>Dental Clinic Settings</Text>
        , 'sub1'
        , <FaHospital />,
        [
            getItem(
                <Link to={'dentals/approve-dental'} style={{ fontSize: '17px' }}>Approve Dental Clinic</Link>
                , '3'
                , <FaHouseMedicalCircleCheck />
            ),
            getItem(
                <Link to={'dentals/manage-dental'} style={{ fontSize: '17px' }}>Manage Dental Clinic</Link>

                , '4'
                , <FaPenToSquare />
            ),
            getItem(
                <Link to={'dentals/approve-dentist'} style={{ fontSize: '17px' }}>Approve Dentist</Link>

                , '5'
                , <FaUserDoctor />
            ),
            getItem(
                <Link to={'dentals/approve-staff'} style={{ fontSize: '17px' }}>Approve Clinic Staff</Link>

                , '6'
                , <FaUserNurse />
            ),
        ]
    ),
    getItem(
        <Link to={'reports'} style={{ fontSize: '17px' }}>Report Settings</Link>
        , '7'
        , <FaFlag />,
    ),
    getItem(
        <Text fontSize='17px'>Blog Settings</Text>
        , 'sub2'
        , <FaNewspaper />,
        [
            getItem(
                <Link to={'blogs/approve-blog'} style={{ fontSize: '17px' }}>Approve Blog</Link>
                , '8'
                , <FaHouseMedicalCircleCheck />
            ),
            getItem(
                <Link to={'blogs/manage-blog'} style={{ fontSize: '17px' }}>Manage Blog</Link>

                , '9'
                , <FaPenToSquare />
            ),
        ]
    ),
];

const clinicOwnerMenuItems: MenuItem[] = [
    getItem(
        <Link to={'dashboard'} style={{ fontSize: '17px' }}>Dashboard</Link>
        , '1'
        , <FaChartSimple />
    ),
    getItem(
        <Link to={'accounts'} style={{ fontSize: '17px' }}>Account Settings</Link>
        , '2'
        , <FaUserGear />
    ),

    getItem(
        <Link to={'dentals'} style={{ fontSize: '17px' }}>Dental Clinic Settings</Link>
        , '3'
        , <FaHospital />,
    ),
    getItem(
        <Link to={'branches'} style={{ fontSize: '17px' }}>Clinic Branch Settings</Link>
        , '4'
        , <FaHospitalUser />,
    ),
    getItem(
        <Link to={'categories'} style={{ fontSize: '17px' }}>Categories Settings</Link>
        , '5'
        , <FaBriefcaseMedical />,
    ),
    getItem(
        <Link to={'services'} style={{ fontSize: '17px' }}>Services Settings</Link>
        , '6'
        , <FaTooth />,
    ),
    getItem(
        <Link to={'blogs'} style={{ fontSize: '17px' }}>Blogs Settings</Link>
        , '7'
        , <FaNewspaper />,
    ),
];

interface SideBarProps {
    collapsed: boolean;
    toggleCollapsed: () => void;
}

const SideBar = ({ collapsed, toggleCollapsed }: SideBarProps) => {

    const { data } = useUserProfile();

    return (
        <Box bg={Color.blue_100} pt={2} pos={'fixed'} zIndex={10}>
            <HStack justify='flex-end' mr={4}>
                <Button
                    colorScheme='blue'
                    variant={'outline'}
                    mt={0}
                    mb={2}
                    onClick={toggleCollapsed}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </HStack>
            <Stack>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                itemHeight: 55,
                                subMenuItemBg: Color.blue_100
                            },
                        },
                    }}
                >
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        inlineCollapsed={collapsed}
                        items={data?.role === 'ADMIN' ? adminMenuItems : clinicOwnerMenuItems}
                        // items={adminMenuItems}
                        style={{
                            border: 'none',
                            height: `calc(100vh - 152px)`,
                            background: Color.blue_100,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            maxHeight: `calc(100vh - 152px)`
                        }}
                    />
                </ConfigProvider>
            </Stack>
        </Box>
    );
};

export default SideBar;