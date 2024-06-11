import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { Button, Box, HStack, Stack, Text } from '@chakra-ui/react';
import { FaChartSimple, FaCommentMedical, FaHouseMedical, FaHouseMedicalCircleCheck, FaNewspaper, FaPenToSquare, FaTooth, FaUserDoctor, FaUserGear, FaUserNurse } from 'react-icons/fa6';
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
        , <FaHouseMedical />,
        [
            getItem(
                <Link to={'dental-setting/approve-dental'} style={{ fontSize: '17px' }}>Approve Dental Clinic</Link>
                , '3'
                , <FaHouseMedicalCircleCheck />
            ),
            getItem(
                <Link to={'dental-setting/manage-dental'} style={{ fontSize: '17px' }}>Manage Dental Clinic</Link>

                , '4'
                , <FaPenToSquare />
            ),
            getItem(
                <Link to={'/menu/manage'} style={{ fontSize: '17px' }}>Approve Dentist</Link>

                , '5'
                , <FaUserDoctor />
            ),
            getItem(
                <Link to={'/menu/manage'} style={{ fontSize: '17px' }}>Approve Clinic Staff</Link>

                , '6'
                , <FaUserNurse />
            ),
        ]
    ),
    getItem(
        <Text fontSize='17px'>Feedback Settings</Text>
        , '7'
        , <FaCommentMedical />,
    ),
    getItem(
        <Text fontSize='17px'>Blog Settings</Text>
        , '8'
        , <FaNewspaper />,
    ),
];

const clinicOwnerMenuItems: MenuItem[] = [
    getItem(
        <Link to={'dashboard'} style={{ fontSize: '17px' }}>Dashboard</Link>
        , '1'
        , <FaChartSimple />
    ),
    getItem(
        <Link to={'accounts'} style={{ fontSize: '17px' }}>Dental Clinic Settings</Link>
        , '2'
        , <FaUserGear />
    ),

    getItem(
        <Text fontSize='17px'>Dental Clinic Settings</Text>
        , '3'
        , <FaHouseMedical />,
    ),
    getItem(
        <Text fontSize='17px'>Dentists Settings</Text>
        , '4'
        , <FaUserDoctor />,
    ),
    getItem(
        <Text fontSize='17px'>Services Settings</Text>
        , '5'
        , <FaTooth />,
    ),
    getItem(
        <Text fontSize='17px'>Blogs Settings</Text>
        , '6'
        , <FaNewspaper />,
    ),
];

interface SideBarProps {
    collapsed: boolean;
    toggleCollapsed: () => void;
}

const SideBar = ({ collapsed, toggleCollapsed }: SideBarProps) => {

    const { data } = useUserProfile();
    const windowHeight = window.innerHeight;

    return (
        <Box bg={Color.blue_100} pt={2} pos={'fixed'} zIndex={9999}>
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
                        // items={data?.role === 'ADMIN' ? adminMenuItems : clinicOwnerMenuItems}
                        items={adminMenuItems}
                        style={{
                            border: 'none',
                            height: `calc(${windowHeight}px - 152px)`,
                            background: Color.blue_100,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            maxHeight: `calc(${windowHeight}px - 152px)`
                        }}
                    />
                </ConfigProvider>
            </Stack>
        </Box>
    );
};

export default SideBar;