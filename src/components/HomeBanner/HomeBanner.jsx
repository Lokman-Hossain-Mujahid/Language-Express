import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import img1 from "/images/banner3.png"
import img2 from "/images/flags2.png"
import img3 from "/images/words2.png"

// import "./styles.css";

// import required modules
import { Pagination } from "swiper";
import { Zoom } from 'react-awesome-reveal';

const HomeBanner = () => {
    return (

        <div  className='relative -z-10'>
            <Zoom duration="1500">
                <div>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper absolute -z-10 h-[23vh] md:h-[78vh]"
                    >
                        <SwiperSlide className=''><img src={img1} alt="" /></SwiperSlide>
                        <SwiperSlide><img src={img2} alt="" /></SwiperSlide>
                        <SwiperSlide><img src={img3} alt="" /></SwiperSlide>

                    </Swiper>
                </div>
            </Zoom>
        </div>

    );
};

export default HomeBanner;