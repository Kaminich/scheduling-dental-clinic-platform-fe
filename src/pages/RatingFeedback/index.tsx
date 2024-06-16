import { Card, HStack, Stack, Text } from "@chakra-ui/react"
import { Color, Shadow } from "../../styles/styles";
import FeedbackItem from "../../components/rating_feedback/components/feedback_item";
import { useEffect } from "react";
import { changeTabTitle } from "../../utils/changeTabTitle";

const RatingFeedbackPage = () => {

    useEffect(() => {
        changeTabTitle('Rating and Feedback');
    }, []);

    return (
        <>
            <HStack m={'auto'} my={6} w={'6xl'}>
                <Stack gap={4}>
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
                    <Stack gap={5}>
                        <Card py={4} px={8} mb={4} pt={6} shadow={Shadow.cardShadow}>
                            <FeedbackItem type="personal" />
                        </Card>
                        <Card py={4} px={8} mb={4} pt={6} shadow={Shadow.cardShadow}>
                            <FeedbackItem type="personal" />
                        </Card>
                    </Stack>
                </Stack>
            </HStack>
        </>
    )
}

export default RatingFeedbackPage