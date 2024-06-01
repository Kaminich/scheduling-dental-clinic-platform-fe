import { SimpleGrid } from "@chakra-ui/react"
import BlogsItem from "../../components/blogs_item"
import ServiceItem from "../../components/service_item"

const ServicePage = () => {
    return (
        <SimpleGrid columns={4} spacingX={7} spacingY={8} w={'6xl'} m={'auto'} my={10}>
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
        </SimpleGrid>
    )
}

export default ServicePage