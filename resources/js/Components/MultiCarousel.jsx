import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function MultiCarousel({ data, speed, pauseOnHover = false }) {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={1000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            customTransition="transform 0.5s linear"
            dotListClass=""
            draggable={false}
            focusOnSelect={false}
            infinite={true}
            itemClass=""
            keyBoardControl={false}
            minimumTouchDrag={80}
            pauseOnHover={pauseOnHover}
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024,
                    },
                    items: 8,
                    partialVisibilityGutter: 40,
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0,
                    },
                    items: 3,
                    partialVisibilityGutter: 30,
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464,
                    },
                    items: 5,
                    partialVisibilityGutter: 30,
                },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay={false}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable={false}
            transitionDuration={500}
        >
            {data?.map((item) => (
                <div key={item?.id} className="px-5 text-center justify-center">
                    <div className="w-full h-16 sm:h-20 flex items-center">
                        <img
                            src={item?.path}
                            className="h-full w-full mx-auto object-contain"
                            alt=""
                        />
                    </div>
                    {item?.name ? (
                        <div className="pt-1 text-sm font-semibold">
                            {item?.name}
                        </div>
                    ) : null}
                </div>
            ))}
        </Carousel>
    );
}
