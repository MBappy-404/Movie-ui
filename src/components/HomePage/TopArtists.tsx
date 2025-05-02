"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type TArtistSlide = {
  id: number;
  artistName: string;
  image: string;
};

const artistsSlides: TArtistSlide[] = [
  {
    id: 1,
    artistName: "Alaya Pacheco",
    image: "/artist1.jpg",
  },
  {
    id: 2,
    artistName: "Sarah Neal",
    image: "/artist2.jpg",
  },
  {
    id: 3,
    artistName: "Emma Narburgh",
    image: "/artist3.jpg",
  },
  {
    id: 4,
    artistName: "Richard Cant",
    image: "/artist4.jpg",
  },
  {
    id: 5,
    artistName: "David Horovitch",
    image: "/artist5.jpg",
  },
  {
    id: 6,
    artistName: "Emily Carey",
    image: "/artist6.jpg",
  },
  {
    id: 7,
    artistName: "Harry Styles",
    image: "/artist7.jpg",
  },
  {
    id: 8,
    artistName: "Jefferson Hall",
    image: "/artist8.jpg",
  },
  {
    id: 9,
    artistName: "Brooke Mulford",
    image: "/artist9.jpg",
  },
];

const TopArtists = () => {
  return (
    <div className="md:w-[90%] w-[95%] mx-auto py-20">
      <h1 className="text-4xl font-bold text-white">Top Artists</h1>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 12,
          },
          1400: {
            slidesPerView: 7,
            spaceBetween: 14,
          },
        }}
        style={{ padding: "40px 0" }}
      >
        {artistsSlides.map((artist) => (
          <SwiperSlide key={artist.id}>
            <div className="flex flex-col  items-center justify-center cursor-pointer transition-transform duration-300 hover:-translate-y-5">
              <Image
                src={artist.image}
                alt={artist.artistName}
                height={180}
                width={180}
                className="rounded-full border-2 border-violet-500 shadow-lg shadow-violet-400/30 object-cover w-[180px] h-[180px] bg-[#181a2a] transition-shadow duration-300 hover:shadow-violet-500/80"
              />
              <div className="mt-4 text-white font-bold text-lg text-center tracking-wide">
                {artist.artistName}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopArtists;
