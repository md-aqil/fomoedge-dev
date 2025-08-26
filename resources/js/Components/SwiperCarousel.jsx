import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SwiperCarousel({
    slides,
    direction,
    breakpoints,
    speed,
    delay,
    slidesPerView,
}) {
    // const slides = Array.from({ length: count }, (_, i) => i);

    const standardBreakpoints = {
        sm: 640,
        md: 768,
        xl: 1024,
    };
    const mergedBreakpoints = {
        ...standardBreakpoints,
        ...breakpoints,
    };

    const mappedBreakpoints = {};
    Object.keys(mergedBreakpoints).forEach((alias) => {
        const value = mergedBreakpoints[alias];
        if (standardBreakpoints.hasOwnProperty(alias)) {
            mappedBreakpoints[standardBreakpoints[alias]] = {
                slidesPerView: value,
                spaceBetween: 20,
            };
        }
    });

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={slidesPerView ?? 1}
            direction={direction}
            autoplay={{
                delay: delay,
                disableOnInteraction: false,
            }}
            speed={speed}
            pagination={{
                clickable: true,
            }}
            // navigation={true}
            // breakpoints={breakpoints}
            breakpoints={mappedBreakpoints}
            modules={[Autoplay, Pagination, Navigation]}
        >
            {slides?.map((slide, i) => (
                <SwiperSlide key={i}>{slide}</SwiperSlide>
            ))}
        </Swiper>
    );
}
