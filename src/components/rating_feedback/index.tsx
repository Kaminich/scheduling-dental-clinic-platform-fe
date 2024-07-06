import { Card, Container, Divider, Flex, HStack, Progress, Stack, Text } from "@chakra-ui/react"
import { Rate } from "antd"
import FeedbackItem from "./components/feedback_item";
import { Color, Shadow } from "../../styles/styles";
import ApiClient from "../../services/apiClient";
import { useEffect, useState } from "react";

interface Prop {
    isModal: boolean;
    clinicId: number;
}

const RatingAndFeedback = ({ isModal, clinicId }: Prop) => {
    const [feedbacks, setFeedbacks] = useState([]);

    const getFeedbackByClinicId = async () => {
        const api = new ApiClient<any>('/feedback/clinic');
        try {
            const response = await api.getDetail(clinicId);
            console.log(response);
        } catch (error) {

        }
    }

    useEffect(() => {
        if (clinicId) {
            getFeedbackByClinicId();
        }
    }, [clinicId])

    return (
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
            <Card py={10} px={isModal ? 5 : 8} pl={isModal ? 10 : 20}>
                <HStack maxW={'full'} gap={isModal ? 0 : 10}>
                    <Stack flex={2.5} gap={1}>
                        <Flex align={'center'} gap={isModal ? 0 : 4}>
                            <Text>5</Text>
                            <Container ml={2} minW={'full'}>
                                <Progress colorScheme='yellow' value={20} borderRadius={10} />
                            </Container>
                        </Flex>
                        <Flex align={'center'} gap={isModal ? 0 : 4}>
                            <Text>4</Text>
                            <Container ml={2} minW={'full'}>
                                <Progress colorScheme='yellow' value={20} borderRadius={10} />
                            </Container>
                        </Flex>
                        <Flex align={'center'} gap={isModal ? 0 : 4}>
                            <Text>3</Text>
                            <Container ml={2} minW={'full'}>
                                <Progress colorScheme='yellow' value={20} borderRadius={10} />
                            </Container>
                        </Flex>
                        <Flex align={'center'} gap={isModal ? 0 : 4}>
                            <Text>2</Text>
                            <Container ml={2} minW={'full'}>
                                <Progress colorScheme='yellow' value={20} borderRadius={10} />
                            </Container>
                        </Flex>
                        <Flex align={'center'} gap={isModal ? 0 : 4}>
                            <Text>1</Text>
                            <Container ml={2} minW={'full'}>
                                <Progress colorScheme='yellow' value={20} borderRadius={10} />
                            </Container>
                        </Flex>
                    </Stack>
                    <Stack flex={1} align={'center'}>
                        <Text fontSize={56} fontWeight={600}>2.7</Text>
                        <Rate disabled allowHalf defaultValue={2.7} />
                        <Text>20 Feedbacks</Text>
                    </Stack>
                </HStack>
            </Card>
            <Divider mt={10} mb={6} borderColor={'#8080808f'} />
            <HStack gap={6} align={'flex-start'} mb={2}>
                <Stack gap={2}>
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
                    <Card py={4} px={8} mb={4} pt={6} shadow={Shadow.cardShadow}>
                        <FeedbackItem type="dental" clinicId={clinicId} />
                    </Card>
                    <Card py={4} px={8} mb={4} pt={6} shadow={Shadow.cardShadow}>
                        <FeedbackItem type="dental" clinicId={clinicId} />
                    </Card>
                </Stack>
            </HStack>
        </>
    )
}

export default RatingAndFeedback