import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { Button, Box, HStack, Stack, Text } from '@chakra-ui/react';
import { FaChartSimple, FaCommentMedical, FaHouseMedical, FaHouseMedicalCircleCheck, FaNewspaper, FaPenToSquare, FaUserDoctor, FaUserGear, FaUserNurse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { Color } from '../../../../styles/styles';

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

const items: MenuItem[] = [
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
                <Link to={'/menu/create'} style={{ fontSize: '17px' }}>Approve Dental Clinic</Link>
                , '3'
                , <FaHouseMedicalCircleCheck />
            ),
            getItem(
                <Link to={'/menu/manage'} style={{ fontSize: '17px' }}>Manage Dental Clinic</Link>

                , '4'
                , <FaPenToSquare />
            ),
            getItem(
                <Link to={'/menu/manage'} style={{ fontSize: '17px' }}>Approve Dentist</Link>

                , '4'
                , <FaUserDoctor />
            ),
            getItem(
                <Link to={'/menu/manage'} style={{ fontSize: '17px' }}>Approve Clinic Staff</Link>

                , '4'
                , <FaUserNurse />
            ),
        ]
    ),
    getItem(
        <Text fontSize='17px'>Feedback Settings</Text>
        , 'sub2'
        , <FaCommentMedical />,
    ),
    getItem(
        <Text fontSize='17px'>Blog Settings</Text>
        , 'sub2'
        , <FaNewspaper />,
    ),
];

interface SideBarProps {
    collapsed: boolean;
    toggleCollapsed: () => void;
}

const SideBar = ({ collapsed, toggleCollapsed }: SideBarProps) => {

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
                        items={items}
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