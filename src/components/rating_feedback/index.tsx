import { Card, Container, Divider, Flex, HStack, Progress, Stack, Text } from "@chakra-ui/react"
import FeedbackItem from "./components/feedback_item";
import { Color, Shadow } from "../../styles/styles";
import { useEffect, useState } from "react";
import SummaryFeedbackResponse, { initialSummaryFeedbackResponse } from "../../types/SummaryFeedbackResponse";
import useFeedbacks from "../../hooks/useFeedbacks";
import Loading from "../loading";
import { Rate } from "antd";

interface Prop {
    clinicId: number;
}

const RatingAndFeedback = ({ clinicId }: Prop) => {
    const [ratingFeedback, setRatingFeedback] = useState<SummaryFeedbackResponse>(initialSummaryFeedbackResponse);
    const { data, isLoading } = useFeedbacks({ clinicId: clinicId });

    useEffect(() => {
        if (data) {
            setRatingFeedback(data);
        }
    }, [data])

    return (
        <>
            {!isLoading ? (
                <>
                    <Text
                        maxW={'sm'}
                        fontSize={20}
                        pl={4}
                        py={1}
                        mb={4}
                        fontWeight={500}
                        borderRadius={'full'}
                        bgGradient={Color.headingGradientMd}
                    >
                        Overview
                    </Text>
                    <Card py={10} px={8} pl={20}>
                        <HStack maxW={'full'} gap={10}>
                            <Stack flex={2.5} gap={1}>
                                {ratingFeedback.starRatings.reverse().map((rating, index) => (
                                    <Flex align={'center'} gap={4} key={index}>
                                        <Text>{rating.star}</Text>
                                        <Container ml={2} minW={'full'}>
                                            <Progress colorScheme='yellow' value={rating.count} borderRadius={10} />
                                        </Container>
                                    </Flex>
                                ))}
                            </Stack>
                            <Stack flex={1} align={'center'}>
                                <Text fontSize={56} fontWeight={600}>{ratingFeedback.averageRating}</Text>
                                <Rate defaultValue={ratingFeedback.averageRating} allowHalf disabled />
                                <Text>{ratingFeedback.totalFeedback} Feedbacks</Text>
                            </Stack>
                        </HStack>
                    </Card>
                    <Divider mt={10} mb={6} borderColor={'#8080808f'} />
                    <HStack gap={6} align={'flex-start'} mb={2}>
                        <Stack gap={2} w={'full'}>
                            <Text
                                maxW={'sm'}
                                fontSize={20}
                                pl={4}
                                py={1}
                                mb={4}
                                fontWeight={500}
                                borderRadius={'full'}
                                bgGradient={Color.headingGradientMd}
                            >
                                Feedback posts
                            </Text>
                            <Card py={4} px={8} mb={4} pt={6} shadow={Shadow.cardShadow} w={'full'}>
                                {ratingFeedback.feedbacks.map((feedback) => (
                                    <FeedbackItem key={feedback.feedbackId} feedback={feedback} />
                                ))}
                            </Card>
                        </Stack>
                    </HStack>
                </>
            ) : (
                <Stack m={'auto'}>
                    <Loading />
                </Stack>
            )}
        </>
    )
}

export default RatingAndFeedback