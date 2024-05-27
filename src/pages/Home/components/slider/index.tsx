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
            style={{ height: '70vh', padding: '0' }}>
            <Image
                alt={"Slider Image"}
                objectFit={"cover"}
                h={'70vh'}
                borderRadius={5}
                p={0}
                src={
                    "https://benhviencuadong.vn/wp-content/uploads/2022/08/kham-nha-khoa-3.jpg"
                }
            />
            <Image
                alt={"Slider Image"}
                objectFit={"cover"}
                h={'70vh'}
                borderRadius={5}
                p={0}
                src={
                    "https://baovietdental.com.vn/wp-content/uploads/2021/05/hinh2.jpg"
                }
            />
        </Carousel >
    )
}

export default Slider