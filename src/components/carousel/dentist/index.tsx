import OwlCarousel from "react-owl-carousel"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Container } from "@chakra-ui/react";
import DentistItem from "../../dentist_item";

const DentistCarousel = () => {

    // const { data } = useCategory({ type: 'get', id: 0 });
    // console.log(data);
    // const { data } = useCategory({ type: 'get', id: 0 })
    // const [categories, setCategories] = useState<Category[]>([]);

    // useEffect(() => {
    //     if (data?.Categories) {
    //         setCategories(data.Categories);
    //     }
    // }, [data]);

    // console.log(categories);

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

        </OwlCarousel>
    )
}


export default DentistCarousel
