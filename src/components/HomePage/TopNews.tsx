"use client";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const slideVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const TopNews = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
      className="pb-20 lg:px-20"
    >
       <motion.h2
        className="text-3xl ml-2 md:ml-0 md:text-4xl font-bold text-white mb-8"
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 100 },
          },
        }}
      >
       Top News
      </motion.h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        speed={600}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
        }}
      >
        {topNews.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              variants={slideVariants}
              className="flex gap-5 text-white p-4 cursor-pointer rounded-lg group"
            >
              {/* Image wrapper with motion */}
              <motion.div
                className="w-[40%] overflow-hidden"
                whileHover="hover"
                initial="visible"
              >
                <motion.img
                  src={item.newsImage}
                  alt={item.newsTitle}
                  variants={imageVariants}
                  className="w-full h-full object-cover"
                  transition={{ duration: 0.4 }}
                />
              </motion.div>

              {/* Text Content */}
              <motion.div className="w-[60%]" variants={textVariants}>
                <motion.h3
                  className="text-xl font-semibold"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.newsTitle}
                </motion.h3>

                <motion.p
                  className="text-base text-gray-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.newsDescription}
                </motion.p>

                <motion.div
                  className="text-sm mt-4 flex flex-wrap gap-2 text-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[item.newsDate, "•", item.writer, "•", item.category].map(
                    (text, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ color: "#ffffff" }}
                        transition={{ duration: 0.2 }}
                      >
                        {text}
                      </motion.span>
                    )
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default TopNews;
