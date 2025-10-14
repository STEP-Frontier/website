"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { url } from "@/util/url-converter";

export default function Hero({
  image_path = url("/images/hero.jpg"),
  hero_title = "STEPへようこそ",
  subtitle = false,
  black_opacity = 0.3,
  center_or_top = "center"
}) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 300;
      let newOpacity = 1 - window.scrollY / maxScroll;
      if (newOpacity < 0) newOpacity = 0;
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bg_pos =
    center_or_top === "top"
      ? "bg-top"
      : "bg-center";

  return (
    <div
      className={`relative h-screen bg-cover ${bg_pos}`}
      style={{ backgroundImage: `url('${image_path}')` }}
    >
      {/* 黑色遮罩 */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${black_opacity})` }}
      ></div>

      {/* 内容区域 */}
      <div className="relative flex flex-col h-full items-center justify-center text-center text-white">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {hero_title}
        </motion.h1>

        {/* 副标题（可选） */}
        {subtitle && (
          <motion.p
            className="mt-4 text-sm sm:text-base md:text-lg max-w-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* 下方箭头 */}
        <motion.div className="absolute bottom-10 animate-bounce" style={{ opacity }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.5"
            height="20.2"
            fill="white"
            className="svg-arrow-down"
          >
            <path d="M0 12.4l7.8 7.8 7.7-7.8-1-1-6 6V0H7v17.4l-6-6z"></path>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
