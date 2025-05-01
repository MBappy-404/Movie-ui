"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { FaRegCirclePlay } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { BiMoviePlay } from "react-icons/bi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type Slide = {
  title: string;
  desc: string;
  image: string;
  trailer: string;
};

const slides: Slide[] = [
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image1.jpg",
    trailer: "#",
  },
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image2.jpg",
    trailer: "#",
  },
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image3.jpg",
    trailer: "#",
  },
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image4.jpg",
    trailer: "#",
  },
  {
    title: "Almost Adults",
    desc: "This comedy feature follows two best friends in their final year of college while they transition into adulthood. One embraces her sexuality and...",
    image: "/image5.jpg",
    trailer: "#",
  },
];

const HomeBanner = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div
      className="
        flex flex-col md:flex-row items-center min-h-[80vh] text-white 
        px-4 py-6 md:px-10 md:py-10 lg:px-20 lg:py-20 relative
      "
      style={{
        background:
          "linear-gradient(20deg, #181c2e 5%, transparent 90%), url('/bg_playlist.webp') no-repeat center/cover",
      }}
    >
      {/* Content */}
      <div className="w-full md:flex-1 z-10 mb-6 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold">Almost Adults</h1>
        <p className="text-base md:text-lg my-4 md:my-6 max-w-xl">
          This comedy feature follows two best friends in their final year of
          college while they transition into adulthood. One embraces her
          sexuality and...
        </p>
        <div className="flex gap-3 md:gap-5">
          <button className="px-4 py-2 md:px-6 md:py-3 cursor-pointer flex gap-2 items-center rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md hover:opacity-90 transition text-base md:text-lg">
            <FaRegCirclePlay className="text-lg md:text-xl" /> Play Now
          </button>
          <button className="bg-[#23243a] hover:bg-indigo-700 text-white w-10 h-10 md:w-14 md:h-14 rounded-xl text-xl md:text-2xl flex items-center justify-center transition">
            <LuPlus className="text-2xl md:text-3xl" />
          </button>
        </div>
      </div>
      {/* Swiper Section */}
      <div className="relative w-full md:w-[600px] h-[300px] md:h-[350px] flex justify-center">
        {/* Main Swiper */}
        <div className="relative w-full max-w-full h-full mx-auto">
          <Swiper
            modules={[Thumbs, Navigation]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            className="w-full h-full overflow-hidden"
            loop
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <a
                  href={slide.trailer}
                  className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white px-4 py-2 md:px-8 md:py-4 rounded-lg text-base md:text-lg gap-2 no-underline flex flex-col items-center"
                >
                  <BiMoviePlay className="mx-auto text-3xl md:text-5xl" />
                  <p className="text-base md:text-xl font-bold">
                    Watch Trailer!
                  </p>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Overlayed thumbnails: horizontal on mobile, vertical on desktop */}
          <div
            className="
            absolute left-1/2 -translate-x-1/2 bottom-[-80px] w-full h-[70px] flex items-center
            md:top-1/2 md:right-[-10%] md:left-auto md:bottom-auto md:-translate-y-1/2 md:w-[120px] md:h-[320px] md:flex-col
            z-20
          "
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              direction={"horizontal"}
              slidesPerView={4}
              spaceBetween={10}
              className="w-full h-full md:w-full md:h-full"
              breakpoints={{
                768: {
                  direction: "vertical",
                  slidesPerView: 3,
                },
              }}
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="
                      w-[70px] h-[70px] md:w-full md:h-[100px] object-cover rounded-lg opacity-70 cursor-pointer border-2 border-transparent transition-all duration-200
                      swiper-slide-thumb-active:border-indigo-500 swiper-slide-thumb-active:opacity-100
                    "
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
