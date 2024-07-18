// import { Avatar, Box, Button, HStack, Heading, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
// import { useRef, useState } from "react";
// import { BsSearch } from "react-icons/bs";
// import { FaFacebookMessenger } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import { Border } from "../../../../styles/styles";

// const MessageMenu = () => {
//     const ref = useRef<HTMLInputElement>(null);
//     const [keyword, setKeyword] = useState<string>('');
//     const [unread, setUnread] = useState<boolean>(true);

//     return (
//         <Menu autoSelect={false} isLazy>
//             <MenuButton>
//                 <Button
//                     bg={'#dedede'}
//                     _hover={{ bg: '#dedede' }}
//                     borderRadius={'full'}
//                     px={2}
//                     py={5}
//                     mr={0}
//                     size={'lg'}
//                 >
//                     <FaFacebookMessenger />
//                 </Button>
//             </MenuButton>
//             <MenuList minW={'sm'} maxW={'sm'} ml={20}>
//                 <Heading mx={5} my={2} fontSize={24}>Chats</Heading>
//                 <InputGroup mx={'auto'} w={'90%'} my={4}>
//                     <InputLeftElement children={<BsSearch />} />
//                     <Input
//                         ref={ref}
//                         borderRadius={20}
//                         bg={'#f1f1f1'}
//                         placeholder="Search customer..."
//                         onChange={(e) => {
//                             setKeyword(e.target.value);
//                         }}
//                         value={keyword}
//                     />
//                 </InputGroup>
//                 <Stack>
//                     <Stack maxH={'md'} overflowY={'auto'}>
//                         <MenuItem
//                             maxW={'95%'}
//                             borderRadius={10}
//                             p={3}
//                             mx={2}
//                             fontSize={17}
//                             fontWeight={600}
//                         >
//                             <HStack justify={'space-between'} w={'full'}>
//                                 <HStack align={'center'} gap={4}>
//                                     <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
//                                     <Stack justify={'center'} gap={0}>
//                                         <Text noOfLines={1} fontSize={15} fontWeight={700}>Full Name</Text>
//                                         <HStack gap={1} fontWeight={unread ? 'bold' : 'none'} color={unread ? 'black' : 'gray'}>
//                                             <Text fontSize={12} noOfLines={1}>Cool kid</Text>
//                                             <Text fontSize={20} noOfLines={1}>&#183;</Text>
//                                             <Text fontSize={12} minW={20}>12 hours ago</Text>
//                                         </HStack>
//                                     </Stack>

//                                 </HStack>
//                                 {unread && (
//                                     <Box w={3} h={3} borderRadius={'full'} bg={'lightskyblue'}></Box>
//                                 )}
//                             </HStack>
//                         </MenuItem>
//                         <MenuItem
//                             maxW={'95%'}
//                             borderRadius={10}
//                             p={3}
//                             mx={2}
//                             fontSize={17}
//                             fontWeight={600}
//                         >
//                             <HStack align={'center'} gap={4}>
//                                 <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
//                                 <Stack justify={'center'} gap={0}>
//                                     <Text noOfLines={1} fontSize={15} fontWeight={700}>Full Name</Text>
//                                     <HStack gap={1}>
//                                         <Text fontSize={12} color={'grey'} noOfLines={1}>12 hours ago hours ago hours ago hours ago</Text>
//                                         <Text fontSize={20} color={'grey'} noOfLines={1}>&#183;</Text>
//                                         <Text fontSize={12} color={'grey'} minW={20}>12 hours ago</Text>
//                                     </HStack>
//                                 </Stack>
//                             </HStack>
//                         </MenuItem>
//                         <MenuItem
//                             maxW={'95%'}
//                             borderRadius={10}
//                             p={3}
//                             mx={2}
//                             fontSize={17}
//                             fontWeight={600}
//                         >
//                             <HStack align={'center'} gap={4}>
//                                 <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
//                                 <Stack justify={'center'} gap={0}>
//                                     <Text noOfLines={1} fontSize={15} fontWeight={700}>Full Name</Text>
//                                     <HStack gap={1}>
//                                         <Text fontSize={12} color={'grey'} noOfLines={1}>12 hours ago hours ago hours ago hours ago</Text>
//                                         <Text fontSize={20} color={'grey'} noOfLines={1}>&#183;</Text>
//                                         <Text fontSize={12} color={'grey'} minW={20}>12 hours ago</Text>
//                                     </HStack>
//                                 </Stack>
//                             </HStack>
//                         </MenuItem>
//                         <MenuItem
//                             maxW={'95%'}
//                             borderRadius={10}
//                             p={3}
//                             mx={2}
//                             fontSize={17}
//                             fontWeight={600}
//                         >
//                             <HStack align={'center'} gap={4}>
//                                 <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
//                                 <Stack justify={'center'} gap={0}>
//                                     <Text noOfLines={1} fontSize={15} fontWeight={700}>Full Name</Text>
//                                     <HStack gap={1}>
//                                         <Text fontSize={12} color={'grey'} noOfLines={1}>12 hours ago hours ago hours ago hours ago</Text>
//                                         <Text fontSize={20} color={'grey'} noOfLines={1}>&#183;</Text>
//                                         <Text fontSize={12} color={'grey'} minW={20}>12 hours ago</Text>
//                                     </HStack>
//                                 </Stack>
//                             </HStack>
//                         </MenuItem>
//                         <MenuItem
//                             maxW={'95%'}
//                             borderRadius={10}
//                             p={3}
//                             mx={2}
//                             fontSize={17}
//                             fontWeight={600}
//                         >
//                             <HStack align={'center'} gap={4}>
//                                 <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
//                                 <Stack justify={'center'} gap={0}>
//                                     <Text noOfLines={1} fontSize={15} fontWeight={700}>Full Name</Text>
//                                     <HStack gap={1}>
//                                         <Text fontSize={12} color={'grey'} noOfLines={1}>12 hours ago hours ago hours ago hours ago</Text>
//                                         <Text fontSize={20} color={'grey'} noOfLines={1}>&#183;</Text>
//                                         <Text fontSize={12} color={'grey'} minW={20}>12 hours ago</Text>
//                                     </HStack>
//                                 </Stack>
//                             </HStack>
//                         </MenuItem>
//                         <MenuItem
//                             maxW={'95%'}
//                             borderRadius={10}
//                             p={3}
//                             mx={2}
//                             fontSize={17}
//                             fontWeight={600}
//                         >
//                             <HStack align={'center'} gap={4}>
//                                 <Avatar size={'lg'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
//                                 <Stack justify={'center'} gap={0}>
//                                     <Text noOfLines={1} fontSize={15} fontWeight={700}>Full Name</Text>
//                                     <HStack gap={1}>
//                                         <Text fontSize={12} color={'grey'} noOfLines={1}>12 hours ago hours ago hours ago hours ago</Text>
//                                         <Text fontSize={20} color={'grey'} noOfLines={1}>&#183;</Text>
//                                         <Text fontSize={12} color={'grey'} minW={20}>12 hours ago</Text>
//                                     </HStack>
//                                 </Stack>
//                             </HStack>
//                         </MenuItem>
//                     </Stack>
//                     <HStack justify={'center'} color={'blue'} borderTop={Border.tableBorder} w={'full'} pt={2}>
//                         <Link to={'/message'}>View all chats</Link>
//                     </HStack>
//                 </Stack>
//             </MenuList>
//         </Menu>
//     )
// }

// export default MessageMenu