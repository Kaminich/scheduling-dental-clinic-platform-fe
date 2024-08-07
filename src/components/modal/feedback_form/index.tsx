import { Avatar, Button, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useToast } from "@chakra-ui/react"
import { Rate } from "antd"
import { useEffect, useState } from "react";
import useUserProfile from "../../../hooks/useUserProfile";
import ApiClient from "../../../services/apiClient";
import BranchDetailResponse, { initialBranchDetailResponse } from "../../../types/BranchDetailResponse";

interface Prop {
    isOpen: boolean;
    onClose: () => void;
    branchclinicId: number;
}

const FeedbackFormModal = ({ isOpen, onClose, branchclinicId }: Prop) => {
    const [feedback, setFeedback] = useState<string>('');
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [feedbackMissing, setFeedbackMissing] = useState<boolean>(false);
    const [ratingMissing, setRatingMissing] = useState<boolean>(false);
    const [branch, setBranch] = useState<BranchDetailResponse>(initialBranchDetailResponse);
    const toast = useToast();
    const { data } = useUserProfile();

    const getBranchDetail = async () => {
        const api = new ApiClient<any>('branch');
        try {
            const response = await api.getDetail(branchclinicId);
            if (response.success) {
                setBranch(response.data);
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePost = async () => {
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
            const api = new ApiClient<any>('/feedback');
            const data = {
                rating,
                comment: feedback,
                branchclinicId
            }
            try {
                const response = await api.create(data);
                if (response.success) {
                    setFeedback('');
                    setRating(undefined);
                    setFeedbackMissing(false);
                    setRatingMissing(false);
                    onClose();
                    toast({
                        title: "Success",
                        description: response.message,
                        status: "success",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });

                } else {
                    toast({
                        title: "Error",
                        description: response.message,
                        status: "error",
                        duration: 2500,
                        position: 'top',
                        isClosable: true,
                    });
                }
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "An error occurred",
                    status: "error",
                    duration: 2500,
                    position: 'top',
                    isClosable: true,
                });
            }
        }
    }

    useEffect(() => {
        if (branchclinicId) {
            getBranchDetail();
        }
    }, [branchclinicId])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Rating and Feedback</ModalHeader>
                <ModalCloseButton borderRadius={'full'} />
                <ModalBody maxH={'md'} overflowY={'auto'}>
                    <Heading
                        textAlign={'center'}
                        fontSize={20}
                        fontWeight={600}
                    >
                        F-Dental
                    </Heading>
                    <HStack gap={4} align={'flex-start'} mb={6}>
                        <Avatar size={'md'} src={data?.avatar || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'} />
                        <Stack gap={0}>
                            <Text fontWeight={500}>{data?.fullName}</Text>
                            <Text fontSize={14} color={'blue.500'}>{`${branch.branchName} (${branch.city})`}</Text>
                        </Stack>
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
                                borderColor={'gainsboro'}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                            />
                            {feedbackMissing && (
                                <Text color={'red'} fontSize={14}>Describe your experience</Text>
                            )}
                        </Stack>
                    </Stack>
                </ModalBody>
                <ModalFooter gap={4}>
                    <Button
                        colorScheme="blue"
                        onClick={handlePost}
                    >
                        Post
                    </Button>
                    <Button colorScheme='blue' variant='outline' mr={3} onClick={() => {
                        onClose();
                        setRatingMissing(false);
                        setFeedbackMissing(false)
                    }}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default FeedbackFormModal