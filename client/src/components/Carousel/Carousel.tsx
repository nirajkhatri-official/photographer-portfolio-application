import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button, Flex, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Carousel = ({ data }: { data: string[] }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const showPrevNextButton = data?.length > 1;
  return (
    <Flex flexDir={"column"} gap={"16px"}>
      <Flex h={"500px"} w={"500px"}>
        <Swiper
          autoplay
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={setSwiperInstance}
        >
          {data?.map((photo) => {
            return (
              <SwiperSlide>
                <Image
                  objectFit={"cover"}
                  src={`${BACKEND_URL}${photo}`}
                  h={"100%"}
                  w={"100%"}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Flex>
      {showPrevNextButton && (
        <Flex justify={"space-between"}>
          <Button
            fontSize={"14px"}
            size={"sm"}
            onClick={() => swiperInstance?.slidePrev()}
          >
            Prev
          </Button>
          <Button
            fontSize={"14px"}
            size={"sm"}
            onClick={() => swiperInstance.slideNext()}
          >
            Next
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Carousel;
