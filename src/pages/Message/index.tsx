import { Flex, Text, Button, Avatar, Stack, Box, Textarea, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaPaperPlane } from 'react-icons/fa6';
import { Border, Color, Shadow } from '../../styles/styles';
import { BsSearch } from 'react-icons/bs';
import { formatTimePassed } from '../../utils/formatTimePassed';

interface MessageProps {
    text: string;
    isUser: boolean;
    timestamp: string;
}

interface Conversation {
    name: string;
    messages: MessageProps[];
    time: string;
}

const Message = ({ text, isUser }: MessageProps) => {
    return (
        <Flex justify={isUser ? "flex-end" : "flex-start"} mb={2}>
            {!isUser && (
                <Avatar
                    size="sm"
                    src="./image0.svg"
                    mr={2}
                />
            )}
            <Box
                px={4}
                py={2}
                bg={isUser ? "blue.500" : "gray.200"}
                color={isUser ? "white" : "black"}
                borderRadius="lg"
                maxW="70%"
            >
                {text}
            </Box>
        </Flex>
    );
};

const MessagePage = () => {
    const [conversations, setConversations] = useState<Conversation[]>([
        { name: 'John Doe', messages: [{ text: "How can I help you?", isUser: false, timestamp: new Date().toISOString() }], time: new Date().toISOString() },
        { name: 'Jane Smith', messages: [{ text: "Hello Jane!", isUser: true, timestamp: new Date().toISOString() }], time: new Date().toISOString() },
        { name: 'Alice Johnson', messages: [{ text: "Hi Alice, what's up?", isUser: true, timestamp: new Date().toISOString() }], time: new Date().toISOString() },
        // Add more initial conversations as needed
    ]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
    const [inputText, setInputText] = useState<string>("");
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    // const navigate = useNavigate();
    const ref = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState<string>('');
    const [unreadConversations, setUnreadConversations] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        scrollToBottom();
    }, [selectedConversation?.messages]);

    const handleScroll = () => {
        const chatBox = chatBoxRef.current;
        if (chatBox) {
            setShowScrollButton(chatBox.scrollHeight - chatBox.scrollTop > chatBox.clientHeight + 100);
        }
    };

    const scrollToBottom = () => {
        const chatBox = chatBoxRef.current;
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
            setShowScrollButton(false);
        }
    };

    const handleMessageSubmit = () => {
        const recipientName = selectedConversation.name;
        const updatedUnreadConversations = { ...unreadConversations };
        updatedUnreadConversations[recipientName] = false; // Mark current conversation as read

        setUnreadConversations(updatedUnreadConversations);
        if (inputText.trim() !== "" && selectedConversation) {
            const newMessage: MessageProps = { text: inputText, isUser: true, timestamp: new Date().toISOString() };
            const updatedConversations = conversations.map(conversation =>
                conversation.name === selectedConversation.name
                    ? { ...conversation, messages: [...conversation.messages, newMessage], time: newMessage.timestamp }
                    : conversation
            );
            setConversations(updatedConversations);
            const updatedSelectedConversation = {
                ...selectedConversation,
                messages: [...selectedConversation.messages, newMessage],
                time: newMessage.timestamp
            };
            setSelectedConversation(updatedSelectedConversation);
            setInputText("");
            setTimeout(() => {
                const botResponse: MessageProps = { text: "This is a response from the bot.", isUser: false, timestamp: new Date().toISOString() };
                const updatedConversationsWithBotResponse = updatedConversations.map(conversation =>
                    conversation.name === selectedConversation.name
                        ? { ...conversation, messages: [...conversation.messages, botResponse], time: botResponse.timestamp }
                        : conversation
                );
                setConversations(updatedConversationsWithBotResponse);
                setSelectedConversation(prevConversation =>
                    prevConversation.name === selectedConversation.name
                        ? { ...prevConversation, messages: [...prevConversation.messages, botResponse], time: botResponse.timestamp }
                        : prevConversation
                );
            }, 1000);
            inputRef.current?.focus();
        }
    };

    const handlePersonClick = (name: string) => {
        const conversation = conversations.find(conv => conv.name === name);
        if (conversation) {
            setSelectedConversation(conversation);
            const updatedUnreadConversations = { ...unreadConversations };
            updatedUnreadConversations[name] = false; // Mark conversation as read

            setUnreadConversations(updatedUnreadConversations);
        }
    };

    const getLastMessageText = (messages: MessageProps[]) => {
        if (messages.length === 0) return "";
        const lastMessage = messages[messages.length - 1];
        return lastMessage.isUser ? `You: ${lastMessage.text}` : lastMessage.text;
    };

    useEffect(() => {
        const initialUnread: { [key: string]: boolean } = {};
        conversations.forEach(conv => {
            initialUnread[conv.name] = true; // Mark all conversations as unread initially
        });
        setUnreadConversations(initialUnread);
    }, []);

    return (
        <Flex h="calc(100vh - 96px)">
            <Stack w={'360px'}>
                <Box bg={'white'} p={2} h={'calc(100vh - 96px)'} shadow={'md'}>
                    <Text fontSize="2xl" mb={4} mx={4}>Chats</Text>
                    <InputGroup mx={'auto'} my={4}>
                        <InputLeftElement children={<BsSearch />} />
                        <Input
                            ref={ref}
                            borderRadius={20}
                            bg={'white'}
                            placeholder="Search customer..."
                            onChange={(e) => {
                                setKeyword(e.target.value);
                            }}
                            value={keyword}
                        />
                    </InputGroup>
                    <Stack maxH={'calc(100% - 100px)'} overflowY={'auto'} gap={0} px={1}>
                        {conversations.map((conversation, index) => (
                            <HStack
                                key={index}
                                borderRadius={5}
                                justify={'space-between'}
                                w={'full'}
                                p={2}
                                px={3}
                                cursor={'pointer'}
                                _hover={{ bg: Color.blue_100 }}
                                gap={1}
                                onClick={() => handlePersonClick(conversation.name)}
                            >
                                <HStack align={'center'} gap={4}>
                                    <Avatar size={'lg'} name={conversation.name} src={`https://bit.ly/${conversation.name.replace(' ', '-').toLowerCase()}`} />
                                    <Stack justify={'center'} gap={0}>
                                        <Text noOfLines={1} fontSize={15} fontWeight={700}>{conversation.name}</Text>
                                        <HStack gap={1} fontWeight={unreadConversations[conversation.name] ? 'bold' : 'none'} color={unreadConversations[conversation.name] ? 'black' : 'gray'}>
                                            <Text fontSize={12} noOfLines={1}>{getLastMessageText(conversation.messages)}</Text>
                                            <Text fontSize={20} noOfLines={1}>&#183;</Text>
                                            <Text fontSize={12} minW={24}>{formatTimePassed(conversation.time)}</Text>
                                        </HStack>
                                    </Stack>
                                </HStack>
                                {unreadConversations[conversation.name] && (
                                    <Box w={3} h={3} borderRadius={'full'} bg={'lightskyblue'}></Box>
                                )}
                            </HStack>
                        ))}
                    </Stack>
                </Box>
            </Stack>
            <Stack flex={1} pos={'relative'}>
                <>
                    <Flex
                        bg="white"
                        px={4}
                        py={2}
                        align="center"
                        justify="space-between"
                        shadow={Shadow.cardShadowBottom}
                        borderLeft={Border.tableBorder}
                        borderColor={'#f1f1f1'}
                    >
                        <Flex align="center">
                            <Avatar name={selectedConversation.name} mr={2} />
                            <Text fontSize="xl">{selectedConversation.name}</Text>
                        </Flex>
                        <Button colorScheme="blue">Call</Button>
                    </Flex>
                    <Flex direction="column" justify="space-between" h="100%">
                        <Box
                            ref={chatBoxRef}
                            onScroll={handleScroll}
                            flex={1}
                            maxH={'calc(100vh - 240px)'}
                            overflowY="auto"
                            px={4}
                            pt={6}
                        >
                            {selectedConversation.messages.map((message, index) => (
                                <Message key={index} text={message.text} isUser={message.isUser} timestamp='' />
                            ))}
                            {showScrollButton &&
                                <Button
                                    pos={'absolute'}
                                    bottom={20}
                                    left={'50%'}
                                    transform="translate(-50%)"
                                    borderRadius={'full'}
                                    px={3}
                                    bg={'#92c9ff'}
                                    _hover={{ bg: '#add5fd' }}
                                    onClick={scrollToBottom}
                                >
                                    <FaArrowDown />
                                </Button>
                            }
                        </Box>
                        <Flex align="center" p={4} pr={2}>
                            <Textarea
                                ref={inputRef}
                                value={inputText}
                                placeholder="Type your message here..."
                                flex="1"
                                mr={2}
                                focusBorderColor='#E2E8F0'
                                resize={'none'}
                                maxH={20}
                                minH={'var(--input-height)'}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleMessageSubmit();
                                    }
                                }}
                            />
                            <Button
                                colorScheme="blue"
                                variant={'ghost'}
                                borderRadius={'full'}
                                px={3}
                                mr={0}
                                onClick={() => {
                                    handleMessageSubmit();
                                }}>
                                <FaPaperPlane />
                            </Button>
                        </Flex>
                    </Flex>
                </>
            </Stack>
        </Flex>
    );
};

export default MessagePage;
