"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  FilmIcon,
  TicketIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import NewsLetter from "./NewsLetter";

const faqItems = [
  {
    question: "How do I access premium movie content?",
    answer:
      "CineVerse offers tiered subscription plans with exclusive access to premium content. Upgrade your account through the membership section to enjoy 4K streaming, early releases, and ad-free viewing.",
    icon: SparklesIcon,
  },
  {
    question: "Can I download movies for offline viewing?",
    answer:
      "Yes! Our premium plans allow downloading of select titles for offline enjoyment. Look for the download icon on movie pages. Downloads are available for 48 hours after initial play.",
    icon: FilmIcon,
  },
  {
    question: "How often is new content added?",
    answer:
      "We update our library weekly with new releases and classic titles. Follow our 'New Arrivals' section and enable notifications to stay updated on latest additions.",
    icon: TicketIcon,
  },
  {
    question: "What devices support CineVerse streaming?",
    answer:
      "Stream seamlessly on all modern devices including Smart TVs, gaming consoles, iOS/Android devices, and web browsers. Check our supported devices page for full compatibility details.",
    icon: SparklesIcon,
  },
  {
    question: "How does the recommendation system work?",
    answer:
      "Our AI-powered system analyzes your viewing habits, ratings, and preferences to suggest tailored content. The more you watch and rate, the smarter our recommendations become.",
    icon: SparklesIcon,
  },
  {
    question: "Can I create multiple user profiles?",
    answer:
      "Premium subscribers can create up to 5 individual profiles with personalized recommendations and watch lists. Manage profiles through your account settings.",
    icon: SparklesIcon,
  },
];

const faqVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FAQ = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-[#00051f] to-[#0a0a0a]"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
    >
      <div className="container mx-auto px-4 ">
        <motion.div className="text-center mb-16" variants={faqVariants}>
          <h2 className="text-3xl text-left ml-2 md:ml-0 md:text-4xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 max-w-4xl mx-auto"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {faqItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                layout
                variants={faqVariants}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ffffff]/10 to-[#ffffff]/05 backdrop-blur-xl border transition-all duration-300 ${
                  isActive
                    ? "border-purple-400/40 scale-[1.02] shadow-lg shadow-purple-500/20 z-10"
                    : "border-white/10 hover:border-purple-400/30"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-start gap-4"
                >
                  <motion.div
                    className={`p-3 rounded-lg ${
                      isActive
                        ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30"
                        : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="h-6 w-6 text-purple-400" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 pr-8">
                      {item.question}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-gray-300 text-base leading-relaxed"
                        >
                          {item.answer}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    className="absolute top-6 right-6"
                    animate={{ rotate: isActive ? 180 : 0 }}
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 ${
                        isActive ? "text-purple-300" : "text-purple-400"
                      }`}
                    />
                  </motion.div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        <NewsLetter />
      </div>
    </motion.section>
  );
};

export default FAQ;
