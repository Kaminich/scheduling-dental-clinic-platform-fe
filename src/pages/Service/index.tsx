import { SimpleGrid } from "@chakra-ui/react"
import ServiceItem from "../../components/service_item"
import { useEffect } from "react";
import { changeTitle } from "../../utils/changeTabTitle";

const ServicePage = () => {

    useEffect(() => {
        changeTitle('Service');
    }, []);

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