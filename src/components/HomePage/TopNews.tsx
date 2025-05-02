"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const topNews = [
  {
    id: 1,
    newsImage: "/news1.jpg",
    newsTitle: "Movies That Will Make Your Holidays The Best",
    newsDescription:
      "Discover heartwarming and exciting movies that will turn your holidays into a magical and memorable experience.",
    newsDate: "April 26, 2024",
    writer: "Jane Doe",
    category: "Drama",
  },
  {
    id: 2,
    newsImage: "/news2.jpg",
    newsTitle: "Must Watch Web Series On CineVerse",
    newsDescription:
      "Explore the top trending web series on CineVerse that you simply can't miss — from thrillers to heartfelt dramas.",
    newsDate: "April 26, 2024",
    writer: "Jane Doe",
    category: "Entertainment",
  },
  {
    id: 3,
    newsImage: "/news3.jpg",
    newsTitle: "Best Movies To Cheer Your Mood Up In 2022",
    newsDescription:
      "Feeling down? These uplifting movies from 2022 are guaranteed to boost your spirits and bring a smile to your face.",
    newsDate: "April 26, 2024",
    writer: "Jane Doe",
    category: "Entertainment",
  },
  {
    id: 4,
    newsImage: "/news3.jpg",
    newsTitle: "Best Movies To Cheer Your Mood Up In 2022",
    newsDescription:
      "Feeling down? These uplifting movies from 2022 are guaranteed to boost your spirits and bring a smile to your face.",
    newsDate: "April 26, 2024",
    writer: "Jane Doe",
    category: "Entertainment",
  },
];

const TopNews = () => {
  return (
    <div className="pb-20 pt-10 lg:px-20">
      <h1 className="text-4xl font-bold text-white mb-14">Top News</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 4000 }}
      >
        {topNews.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex gap-5 text-white p-4 rounded-lg group">
              {/* Image wrapper for zoom effect */}
              <div className="w-[40%] overflow-hidden">
                <img
                  src={item.newsImage}
                  alt={item.newsTitle}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Text Content */}
              <div className="w-[60%]">
                <h3 className="text-xl font-semibold">{item.newsTitle}</h3>
                <p className="text-base text-gray-400 mt-2">
                  {item.newsDescription}
                </p>
                <div className="text-sm mt-4 flex flex-wrap gap-2 text-gray-100">
                  <span>{item.newsDate}</span>
                  <span>•</span>
                  <span>{item.writer}</span>
                  <span>•</span>
                  <span>{item.category}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopNews;
