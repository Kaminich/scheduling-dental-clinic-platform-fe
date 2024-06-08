import { Avatar, Button, HStack, Heading, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa6";

const Notification = () => {
    return (
        <Menu autoSelect={false}>
            <MenuButton>
                <Button
                    bg={'#dedede'}
                    _hover={{ bg: '#dedede' }}
                    borderRadius={'full'}
                    px={2}
                    py={5}
                    mr={0}
                    size={'lg'}
                >
                    <FaBell />
                </Button>
            </MenuButton>
            <MenuList minW={'sm'} maxW={'sm'} ml={20}>
                <Heading mx={5} my={2} fontSize={24}>Notification</Heading>
                <Stack>
                    <MenuItem
                        maxW={'95%'}
                        borderRadius={10}
                        p={3}
                        mx={2}
                        fontSize={17}
                        fontWeight={600}
                    >
                        <HStack align={'flex-start'} gap={4}>
                            <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                            <Stack justify={'space-between'} minH={'65px'}>
                                <Text noOfLines={3} fontSize={15} lineHeight={1.2} fontWeight={700}>Notification 1</Text>
                                <Text fontSize={12} color={'blue'}>12 hours ago</Text>
                            </Stack>
                        </HStack>
                    </MenuItem>
                    <MenuItem
                        maxW={'95%'}
                        borderRadius={10}
                        p={3}
                        mx={2}
                        fontSize={17}
                        fontWeight={600}
                    >
                        <HStack align={'flex-start'} gap={4}>
                            <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                            <Stack justify={'space-between'} minH={'65px'}>
                                <Text noOfLines={3} fontSize={15} lineHeight={1.2} fontWeight={700}>Notification 1</Text>
                                <Text fontSize={12} color={'blue'}>12 hours ago</Text>
                            </Stack>
                        </HStack>
                    </MenuItem>
                </Stack>
            </MenuList>
        </Menu>
    )
}

export default Notification