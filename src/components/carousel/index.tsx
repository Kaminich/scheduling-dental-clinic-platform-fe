import OwlCarousel from "react-owl-carousel"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ServiceItem from "../service_item";
import DentistItem from "../dentist_item";
import { Container } from "@chakra-ui/react";

interface Prop {
    type: string
}

const CustomCarousel = ({ type }: Prop) => {

    return (
        <OwlCarousel
            items={4}
            autoplay
            autoplayTimeout={4000}
            loop
            dots={false}
            mouseDrag={false}
            margin={20}
        >
            {type === 'service' ? (
                <>
                    <ServiceItem />
                    <ServiceItem />
                    <ServiceItem />
                    <ServiceItem />
                    <ServiceItem />
                    <ServiceItem />
                </>
            ) : (
                <>
                    <Container h={'380px'} pt={1} m={0} px={1}>
                        <DentistItem type={2} />
                    </Container>
                    <Container h={'380px'} pt={1} m={0} px={1}>
                        <DentistItem type={2} />
                    </Container>
                    <Container h={'380px'} pt={1} m={0} px={1}>
                        <DentistItem type={2} />
                    </Container>
                    <Container h={'380px'} pt={1} m={0} px={1}>
                        <DentistItem type={2} />
                    </Container>
                    <Container h={'380px'} pt={1} m={0} px={1}>
                        <DentistItem type={2} />
                    </Container>
                    <Container h={'380px'} pt={1} m={0} px={1}>
                        <DentistItem type={2} />
                    </Container>
                </>
            )}

        </OwlCarousel>
    )
}


export default CustomCarousel
