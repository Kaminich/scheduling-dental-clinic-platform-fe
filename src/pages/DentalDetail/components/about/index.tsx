import { Card, HStack, Stack, Text } from "@chakra-ui/react"
import { Color, Shadow } from "../../../../styles/styles"
import NewsItem from "../../../../components/news_item"
import WorkingHours from "../working_hours"
import DentalDetailBranch from "../branch"
import { Pagination } from "antd"
import { useState } from "react"

const DentalAbout = () => {
    const [page, setPage] = useState<number>(0);
    return (
        <HStack align={'flex-start'} gap={10}>
            <Stack flex={2} gap={8}>
                <Stack>
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
                        About
                    </Text>
                    <Card mb={4} py={6} px={8} shadow={Shadow.cardShadow}>
                        <Text>
                            The Scheduling Dental Clinics Platform presents a compelling business opportunity by addressing the problem of inefficient dental appointment scheduling. Existing methods are often manual, leading to scheduling conflicts and missed opportunities. In contrast, the platform offers a comprehensive solution with features like real-time scheduling, automated reminders, and integration with clinic management systems. By streamlining appointment scheduling, the platform improves productivity, reduces no-shows, and enhances patient satisfaction. This product aligns with market trends of digital healthcare solutions and supports corporate strategic goals by optimizing resource utilization and offering a user-friendly experience. Overall, it provides an efficient and user-friendly solution for dental clinics, improving productivity, patient satisfaction, and resource utilization
                        </Text>
                    </Card>
                </Stack>
                <Stack>
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
                        Working Hours
                    </Text>
                    <WorkingHours />
                </Stack>
                <Stack>
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
                        Branch
                    </Text>
                    <DentalDetailBranch />
                </Stack>
            </Stack>
            <Stack flex={1}>
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
                    News
                </Text>
                <Stack gap={6} align={'center'}>
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                    <Pagination
                        defaultPageSize={3}
                        current={page}
                        showLessItems={(4 <= page && page <= (300 / 3 - 3)) ? true : false}
                        showSizeChanger={false}
                        onChange={(value: number) => setPage(value)}
                        total={300}
                    />
                </Stack>
            </Stack>
        </HStack>
    )
}

export default DentalAbout