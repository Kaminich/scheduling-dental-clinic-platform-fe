import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"

const Logo = () => {
    return (
        <Flex align={'center'} cursor={'pointer'}>
            <Image
                src="/image0.svg"
                objectFit="contain"
                height="80px"
                width="80px"
            />
            <Stack gap={0} userSelect={'none'}>
                <Heading fontSize={'1.5rem'} mb={'-8px'}>F-Dental</Heading>
                <Text fontSize={'16px'} letterSpacing={4} fontWeight={700}>Platform</Text>
            </Stack>
        </Flex>
    )
}

export default Logo