import { Avatar, HStack, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { Rate } from "antd"
import { useEffect, useRef, useState } from "react";
import { FaFlag } from "react-icons/fa6";
import ReportFeedbackModal from "../../../modal/report_feedback";
import { useAuth } from "../../../../hooks/useAuth";
import SendFeedbackResponse from "../../../../types/SendFeedbackResponse";

interface Prop {
    feedback: SendFeedbackResponse;
}

const FeedbackItem = ({ feedback }: Prop) => {
    const [showFullText, setShowFullText] = useState<boolean>(false);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isAuthenticated } = useAuth();
    const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
    const textRef = useRef<HTMLDivElement>(null);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    useEffect(() => {
        if (textRef.current) {
            setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
        }
    }, [feedback.comment]);

    return (
        <Stack gap={4} mb={3} pos={'relative'} w={'full'}>
            {isAuthenticated && (
                <HStack
                    pos={'absolute'}
                    right={-2}
                    top={-2}
                    color={'gray'}
                    _hover={{ color: 'gray.600' }}
                    cursor={'pointer'}
                    onClick={onOpen}
                >
                    <FaFlag />
                    <Text fontSize={14}>Report</Text>
                </HStack>
            )}
            <HStack gap={4}>
                <Avatar size={'md'} src={feedback.customerAvatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} />
                <Stack gap={0}>
                    <Text fontWeight={'medium'}>{feedback.customerFullName}</Text>
                    <Text fontSize={16} color={'blue'}>{feedback.branchName} ({feedback.branchCity})</Text>
                </Stack>
            </HStack>
            <Rate disabled allowHalf defaultValue={feedback.rating} style={{ fontSize: '15px' }} />
            <Stack gap={0}>
                <Text
                    ref={textRef}
                    noOfLines={!showFullText ? 3 : undefined}
                    overflow="hidden"
                    maxH={!showFullText ? "5em" : "none"}
                >
                    {feedback.comment}
                </Text>
                {isOverflowing && (
                    <Text
                        size="sm"
                        color="blue"
                        cursor="pointer"
                        fontSize={15}
                        onClick={toggleShowFullText}
                    >
                        {showFullText ? "Show less" : "Read more"}
                    </Text>
                )}
            </Stack>
            <ReportFeedbackModal
                isOpen={isOpen}
                onClose={onClose}
                feedbackId={feedback.feedbackId}
                reportedCustomer={feedback.customerFullName}
            />
        </Stack>
    )
}

export default FeedbackItem