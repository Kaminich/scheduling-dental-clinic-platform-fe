import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { Color } from "../../styles/styles"

const NewsItem = () => {
    return (
        <Card maxW='sm' bgColor={Color.blue_100}>
            <CardBody>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                    h={'185px'}
                    w={'full'}
                />
                <Stack mt='4' spacing='3'>
                    <Heading
                        size='md'
                        textAlign={'center'}
                        noOfLines={2}
                    >
                        News 1
                    </Heading>
                    <Text fontSize={14} fontWeight={400} color={'gray'} textAlign={'justify'} noOfLines={2}>
                        With Chakra UI, I wanted to sync the speed of development with the speed of design. I wanted the developer to be just as excited as the designer to create a screen.
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default NewsItem