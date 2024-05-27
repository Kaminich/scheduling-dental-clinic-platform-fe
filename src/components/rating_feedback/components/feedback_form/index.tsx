import { Avatar, Button, Card, CardBody, CardFooter, Container, Divider, Flex, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Stack, Text, Textarea } from "@chakra-ui/react"
import { Rate } from "antd"
import { FaPencil } from "react-icons/fa6";
import { useState } from "react";
import { Color, Shadow } from "../../../../styles/styles";


const FeedbackForm = () => {
    const [showFeedback, setShowFeedback] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<string>('');
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [feedbackMissing, setFeedbackMissing] = useState<boolean>(false);
    const [ratingMissing, setRatingMissing] = useState<boolean>(false);

    const handlePost = () => {
        if (!feedback && !rating) {
            setFeedbackMissing(true);
            setRatingMissing(true);
        } else if (!feedback && rating) {
            setFeedbackMissing(true);
            setRatingMissing(false);
        } else if (!rating && feedback) {
            setRatingMissing(true);
            setFeedbackMissing(false);
        } else {
            console.log('haha');
            setFeedback('');
            setRating(undefined);
            setFeedbackMissing(false);
            setRatingMissing(false);
            setShowFeedback(false);
        }
    }

    return (
        <>
            <Text
                maxW={64}
                fontSize={20}
                pl={4}
                py={1}
                mb={4}
                fontWeight={500}
                borderRadius={'full'}
                bgGradient={Color.headingGradientMd}
            >
                Give feedback
            </Text>
            <Card
                minH={20}
                justify={'center'}
                shadow={Shadow.cardShadow}
            >
                {showFeedback ? (
                    <>
                        <Heading
                            textAlign={'center'}
                            fontSize={20}
                            fontWeight={600}
                            mt={6}
                        >
                            F-Dental
                        </Heading>
                        <CardBody>
                            <HStack gap={4} align={'flex-start'} mb={6}>
                                <Avatar size={'md'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                                <Text>Segun Adebayo</Text>
                            </HStack>
                            <Stack align={'center'} gap={8}>
                                <Stack>
                                    <Rate
                                        allowClear
                                        value={rating}
                                        onChange={(value: number) => setRating(value)}
                                        style={{ fontSize: '35px' }}
                                    />
                                    {ratingMissing && (
                                        <Text color={'red'} fontSize={14}>Rate your dental</Text>
                                    )}
                                </Stack>
                                <Stack minW={'full'}>
                                    <Textarea
                                        value={feedback}
                                        placeholder="Describe your experience at this dental"
                                        focusBorderColor='#E2E8F0'
                                        resize={'none'}
                                        maxH={32}
                                        minH={32}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                    {feedbackMissing && (
                                        <Text color={'red'} fontSize={14}>Describe your experience</Text>
                                    )}
                                </Stack>
                            </Stack>
                        </CardBody>
                        <CardFooter justify={'flex-end'} gap={4}>
                            <Button
                                colorScheme="blue"
                                variant={'outline'}
                                onClick={() => { setShowFeedback(false) }}
                            >
                                Close
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={handlePost}
                            >
                                Post
                            </Button>
                        </CardFooter>
                    </>
                ) : (
                    <Button
                        colorScheme="blue"
                        variant={'outline'}
                        mx={12}
                        onClick={() => setShowFeedback(true)}
                    >
                        <Flex align={'center'} gap={2}>
                            <FaPencil />
                            Write your feedback
                        </Flex>
                    </Button>
                )}
            </Card>
        </>
    )
}

export default FeedbackForm