import { Card, HStack, Stack, Text } from "@chakra-ui/react"
import { Color, Shadow } from "../../../../styles/styles"
import BlogsItem from "../../../../components/blogs_item"
import WorkingHours from "../working_hours"
import DentalDetailBranch from "../branch"
import { Pagination } from "antd"
import { useState } from "react"
import ClinicDetailResponse from "../../../../types/ClinicDetailResponse"

interface Prop {
    clinic: ClinicDetailResponse;
}

const DentalAbout = ({ clinic }: Prop) => {
    const [page, setPage] = useState<number>(0);
    console.log(clinic.id);

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
                            {clinic.description}
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
                    <DentalDetailBranch clinicId={clinic.id} />
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
                    {/* <BlogsItem />
                    <BlogsItem />
                    <BlogsItem /> */}
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