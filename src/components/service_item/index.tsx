import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react"
import { Color } from "../../styles/styles"
import { Link } from "react-router-dom"

const ServiceItem = () => {
    return (
        <Link to={'/blog-detail'}>
            <Card maxW='sm'>
                <CardBody pb={0}>
                    <Stack align={'center'}>
                        <Image
                            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                        />
                        <Heading
                            size='md'
                            py={4}
                            _hover={{ color: Color.hoverBlue }}
                        >
                            Service
                        </Heading>
                    </Stack>
                </CardBody>
            </Card>
        </Link>
    )
}

export default ServiceItem