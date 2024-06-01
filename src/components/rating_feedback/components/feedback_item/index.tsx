import { Avatar, HStack, Stack, Text } from "@chakra-ui/react"
import { Rate } from "antd"
import { useState } from "react";
import { Link } from "react-router-dom";
import { Color } from "../../../../styles/styles";

interface Prop {
    type: string,
}

const FeedbackItem = ({ type }: Prop) => {
    const [showFullText, setShowFullText] = useState<boolean>(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <Stack gap={4} mb={3}>
            <HStack gap={4}>
                <Avatar size={'md'} name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                <Stack gap={0}>
                    <Text fontWeight={'medium'}>Segun Adebayo</Text>
                    {type === 'personal' && (
                        <Link to={'/dental-detail'}>
                            <Text fontSize={16} color={'blue'} _hover={{ color: Color.hoverBlue }}>F-Dental</Text>
                        </Link>
                    )}
                </Stack>
            </HStack>
            <Rate disabled allowHalf defaultValue={5} style={{ fontSize: '15px' }} />
            <Stack gap={0}>
                <Text
                    noOfLines={!showFullText ? 3 : undefined}
                    overflow="hidden"
                    maxH={!showFullText ? "5em" : "none"}
                >
                    I've been using the Smartwatch X2 for about a month now, and overall, I'm quite impressed with its performance. The sleek design caught my eye initially, and it didn't disappoint in terms of functionality either.

                    Design: The Smartwatch X2's design is sleek and modern. I appreciate its lightweight build, making it comfortable to wear all day long. The touchscreen display is responsive, and the customizable watch faces add a nice touch of personalization.

                    Features: This smartwatch is packed with features. From tracking my daily steps and heart rate to monitoring my sleep patterns, it covers all the basics effectively. The notification alerts for calls, messages, and app notifications are handy, keeping me connected without having to constantly check my phone.

                    Battery Life: Battery life is decent. With moderate usage, I typically get around two days of use before needing to recharge. It would have been great to see a longer battery life, but considering the features packed into this device, it's understandable.

                    Performance: The Smartwatch X2 performs well overall. The fitness tracking features are accurate, providing detailed insights into my activity levels. The Bluetooth connectivity is stable, and I haven't experienced any issues with syncing data to the companion app on my smartphone.

                    Price: At its price point, the Smartwatch X2 offers great value for money. It provides the essential features you'd expect from a smartwatch without breaking the bank.

                    Conclusion: In conclusion, the Smartwatch X2 is a solid choice for anyone looking for a reliable and affordable smartwatch. While it may not have all the bells and whistles of high-end models, it gets the job done without compromising on quality. I'd recommend it to anyone in the market for a budget-friendly wearable device.

                    Overall, I'm quite satisfied with my purchase and would give the Smartwatch X2 a solid 4 out of 5 stars.
                </Text>
                <Text
                    size="sm"
                    color="blue"
                    cursor={'pointer'}
                    fontSize={15}
                    onClick={toggleShowFullText}
                >
                    {showFullText ? "Show less" : "Read more"}
                </Text>
            </Stack>
        </Stack>
    )
}

export default FeedbackItem