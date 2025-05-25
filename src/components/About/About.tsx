"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FilmIcon,
  SparklesIcon,
  GlobeAltIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const AboutUs = () => {
  const features = [
    {
      title: "Cinematic Excellence",
      description: "Curated selection of award-winning films",
      icon: SparklesIcon,
    },
    {
      title: "Global Community",
      description: "Connecting movie lovers worldwide",
      icon: GlobeAltIcon,
    },
    {
      title: "4K Mastery",
      description: "Ultra-high-definition streaming",
      icon: VideoCameraIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero-style Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src="https://streamvid.jwsuperthemes.com/wp-content/uploads/2022/11/tyson-moultrie-BQTHOGNHo08-unsplash.jpg"
              alt="Cinematic Background"
              fill
              className="object-cover opacity-50"
              priority
            />
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00051f]/90 via-[#00051f]/50 to-[#00051f]/90" />

          <div className="absolute bottom-0 left-0 w-full h-[25%] bg-gradient-to-t from-[#00051f] to-transparent" />
        </div>

        <div className="relative justify-center z-10 flex items-center h-full px-8 md:px-20">
          <motion.div
            className="max-w-6xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="mb-8"
            >
              {/* <FilmIcon className="h-24 w-24 text-purple-400/90 drop-shadow-glow" /> */}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 mb-6 leading-tight"
            >
              Redefining Movie
              <br />
              Experiences
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="text-base md:text-xl max-w-4xl text-center   text-gray-300  font-light tracking-wide leading-relaxed"
            >
              At CineVerse, we combine cutting-edge technology with cinematic
              passion to deliver unparalleled movie discovery experiences. Our
              platform bridges the gap between film enthusiasts and the art of
              storytelling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 flex gap-6 justify-center"
            >
              <button className="px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 transition-opacity duration-300">
                Explore Library
              </button>
              <button className="px-8 py-4 cursor-pointer border border-white/20 rounded-xl font-bold text-white hover:bg-white/10 transition-colors duration-300">
                Our Mission
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/5 rounded-full"
              style={{
                width: Math.random() * 10 + 2 + "px",
                height: Math.random() * 10 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-gradient-to-b from-[#00051f] to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent mb-6">
              Why CineVerse?
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-3xl bg-[#ffffff]/05 backdrop-blur-xl border border-white/10 hover:border-purple-400/30 transition-all duration-500"
              >
                <div className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mb-6 inline-block"
                  >
                    <feature.icon className="h-14 w-14 text-purple-400/90" />
                  </motion.div>
                  <h4 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              { value: "10M+", label: "Daily Streams" },
              { value: "4K HDR", label: "Quality" },
              { value: "150+", label: "Countries" },
            ].map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-8 bg-[#ffffff]/05 backdrop-blur-lg rounded-2xl border border-white/10"
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 mb-4">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-lg font-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="h-full w-full pattern-grid-lg text-white/5" />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
