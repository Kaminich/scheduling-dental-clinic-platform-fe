import { Image } from "@chakra-ui/react"
import { Carousel } from 'antd'

const Slider = () => {
    return (
        <Carousel
            autoplay
            autoplaySpeed={8000}
            speed={500}
            swipe={true}
            pauseOnHover={false}
            style={{ height: '75vh', padding: '0' }}>
            <Image
                alt={"Slider Image"}
                objectFit={"cover"}
                h={'75vh'}
                borderRadius={5}
                p={0}
                src={
                    "https://benhviencuadong.vn/wp-content/uploads/2022/08/kham-nha-khoa-3.jpg"
                }
            />
            <Image
                alt={"Slider Image"}
                objectFit={"fill"}
                h={'75vh'}
                borderRadius={5}
                p={0}
                src={
                    "https://res.cloudinary.com/dy1t2fqsc/image/upload/v1721275777/dental_clinic_interior_design-scaled_m9aloo.jpg"
                }
            />
            <Image
                alt={"Slider Image"}
                objectFit={"contain"}
                h={'75vh'}
                borderRadius={5}
                p={0}
                bg={'#a3dde8'}
                src={
                    "https://res.cloudinary.com/dy1t2fqsc/image/upload/v1721275829/asian-female-casual-t-shirt-posing_h0ihzf.jpg"
                }
            />
        </Carousel >
    )
}

export default Slider