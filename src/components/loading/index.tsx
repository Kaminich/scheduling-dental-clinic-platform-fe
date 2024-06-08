import { Flex, Spinner, Text } from "@chakra-ui/react"

const Loading = () => {
    return (
        <Flex
            h={{ base: '35vh', md: '25vh', lg: '85vh' }}
            gap={10}
            align='center'
            justify='center'
        >
            <Spinner w='50px' h='50px' />
            <Text fontSize='20px'>Loading</Text>
        </Flex>
    )
}

export default Loading