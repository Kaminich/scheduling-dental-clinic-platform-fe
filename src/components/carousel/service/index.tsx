import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect, useState } from "react";
import useCategory from "../../../hooks/useCategory";
import ServiceItem from "../../service_item";
import CategoryViewListResponse from "../../../types/CategoryViewListResponse";

const ServiceCarousel = () => {
    const { data } = useCategory();
    const [categories, setCategories] = useState<CategoryViewListResponse[]>([]);

    useEffect(() => {
        if (data?.Categories) {
            setCategories(data.Categories);
        }
    }, [data]);

    return (
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
                    categoryImage={category.categoryImage}
                    categoryName={category.categoryName}
                />
            ))}
        </OwlCarousel>
    );
};

export default ServiceCarousel;
