import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect, useState } from "react";
import Category from "../../../types/Category";
import useCategory from "../../../hooks/useCategory";
import ServiceItem from "../../service_item";

const ServiceCarousel = () => {
    const { data } = useCategory({ type: 'get', id: 0 });
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (data?.Categories) {
            setCategories(data.Categories);
        }
    }, [data]);

    return (
        <>
            <OwlCarousel
                key={categories.length}
                items={4}
                autoplay
                autoplayTimeout={4000}
                loop
                dots={false}
                mouseDrag={false}
                margin={20}
            >
                {categories.map((category) => (
                    <ServiceItem
                        key={category.id}
                        categoryName={category.categoryName}
                    />
                ))}
            </OwlCarousel>
        </>
    );
};

export default ServiceCarousel;
