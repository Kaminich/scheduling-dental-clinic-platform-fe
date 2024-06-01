import { Avatar, Box, Button, Card, Flex, HStack, Stack, Text, Textarea } from '@chakra-ui/react';
import { ConfigProvider, FloatButton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaPaperPlane, FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

interface MessageProps {
    text: string;
    isUser: boolean;
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

const ChatBox = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageProps[]>([
        { text: "How can I help you?", isUser: false }
    ]);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
        if (inputText.trim() !== "") {
            const newMessage: MessageProps = { text: inputText, isUser: true };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInputText("");
            // Simulating a response from a bot or another user after 1 second
            setTimeout(() => {
                const botResponse: MessageProps = { text: "This is a response from the bot.", isUser: false };
                setMessages(prevMessages => [...prevMessages, botResponse]);
            }, 1000);
            inputRef.current?.focus();
        }
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        controlHeightLG: 48,
                        colorPrimary: '#3db3e6',
                    },
                }}
            >
                <FloatButton.Group shape="circle">
                    <FloatButton
                        icon={' '}
                        onClick={() => {
                            setVisible(!visible);
                            setFocus(false)
                        }}
                    />
                </FloatButton.Group>
            </ConfigProvider>
            {visible && (
                <Stack
                    justify="flex-end"
                    pos={'fixed'}
                    bottom={7}
                    right={20}
                    bg={'white'}
                    borderRadius={10}
                    border={'1px solid gray'}
                    zIndex={99}
                    maxH={'md'}
                    gap={0}
                    maxW={'sm'}
                    minW={'sm'}
                >
                    <Card
                        p={2}
                        pt={'6px'}
                        pl={5}
                        borderRadius={0}
                        borderTopRadius={10}
                        flexDir={'row'}
                        align={'center'}
                        justify={'space-between'}
                        bg={focus ? 'white' : '#3db3e6'}
                    >
                        <HStack>
                            <Avatar
                                name='F-Dental'
                                size={'sm'}
                                src='./image0.svg'
                                bg={'white'}
                            />
                            <Text>F-Dental</Text>
                        </HStack>
                        <Button
                            borderRadius={'full'}
                            variant={'ghost'}
                            px={3}
                            _hover={{ bg: '#8080801a' }}
                            onClick={() => {
                                setVisible(false);
                                setFocus(false)
                            }}
                        >
                            <FaXmark />
                        </Button>
                    </Card>
                    {isLogin ? (
                        <>
                            <Box
                                ref={chatBoxRef}
                                onScroll={handleScroll}
                                flex="1"
                                maxH={'md'}
                                overflowY="auto"
                                px={4}
                                pt={6}
                                minH={'xs'}
                            >
                                {messages.map((message, index) => (
                                    <Message key={index} text={message.text} isUser={message.isUser} />
                                ))}
                                {showScrollButton &&
                                    <Button
                                        pos={'absolute'}
                                        bottom={20}
                                        right={'50%'}
                                        transform="translateX(50%)"
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
                                    onFocus={() => setFocus(true)}
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
                        </>
                    ) : (
                        <>
                            <Stack
                                flex="1"
                                maxH={'md'}
                                overflowY="auto"
                                px={4}
                                pt={6}
                                minH={'xs'}
                                justify={'center'}
                            >
                                <Stack mx={5} align={'center'} gap={4}>
                                    <Text>You must login to chat with consultant</Text>
                                    <Button
                                        maxW={24}
                                        p={5}
                                        borderRadius={8}
                                        colorScheme="twitter"
                                        fontSize={16}
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </Button>
                                </Stack>
                            </Stack>
                            <Flex align="center" p={4} pr={2}>
                                <Textarea
                                    placeholder="Type your message here..."
                                    flex="1"
                                    mr={2}
                                    borderColor={'gray'}
                                    _hover={{ borderColor: 'gray' }}
                                    resize={'none'}
                                    maxH={20}
                                    minH={'var(--input-height)'}
                                    disabled
                                />
                                <Button
                                    colorScheme="blue"
                                    variant={'ghost'}
                                    borderRadius={'full'}
                                    px={3}
                                    mr={0}
                                    isDisabled
                                >
                                    <FaPaperPlane />
                                </Button>
                            </Flex>
                        </>
                    )}
                </Stack>
            )}
        </>
    )
}

export default ChatBox