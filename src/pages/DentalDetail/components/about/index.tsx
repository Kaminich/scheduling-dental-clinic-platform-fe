import { Card, HStack, Stack, Text } from "@chakra-ui/react"
import { Color, Shadow } from "../../../../styles/styles"
import WorkingHours from "../working_hours"
import DentalDetailBranch from "../branch"
import ClinicDetailResponse from "../../../../types/ClinicDetailResponse"

interface Prop {
    clinic: ClinicDetailResponse;
}

const DentalAbout = ({ clinic }: Prop) => {
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
                    {clinic.id && (
                        <WorkingHours clinicId={clinic.id} />
                    )}
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
                    {clinic.id && (
                        <DentalDetailBranch clinicId={clinic.id} />
                    )}
                </Stack>
            </Stack>
            {/* <Stack flex={1}>
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
                     <BlogsItem />
                    <BlogsItem />
                    <BlogsItem /> 
                    <Pagination
                        defaultPageSize={3}
                        current={page}
                        showLessItems={(4 <= page && page <= (300 / 3 - 3)) ? true : false}
                        showSizeChanger={false}
                        onChange={(value: number) => setPage(value)}
                        total={300}
                    />
                </Stack> 
            </Stack>*/}
        </HStack>
    )
}

export default DentalAbout