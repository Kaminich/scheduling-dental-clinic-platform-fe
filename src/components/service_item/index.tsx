import { Card, CardBody, Heading, Image, Stack } from "@chakra-ui/react"
import { Color } from "../../styles/styles"

interface Prop {
    categoryImage: string;
    categoryName: string;
}

const ServiceItem = ({ categoryImage, categoryName }: Prop) => {
    return (
        <Card maxW='sm'>
            <CardBody pb={0}>
                <Stack align={'center'}>
                    <Image
                        src={categoryImage || 'https://i.pinimg.com/736x/08/1a/ed/081aed2e7ddc029f940021ddb22145fc.jpg'}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                        w={233}
                        h={155}
                        objectFit={'cover'}
                    />
                    <Heading
                        size='md'
                        py={4}
                        _hover={{ color: Color.hoverBlue }}
                    >
                        {categoryName}
                    </Heading>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default ServiceItem