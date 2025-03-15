"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 300; // 300px 后箭头完全消失
      let newOpacity = 1 - window.scrollY / maxScroll;
      if (newOpacity < 0) newOpacity = 0; // 防止负数
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} // 50% 透明黑色
      ></div>
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          STEPへようこそ
        </motion.h1>
        <motion.p
          className="mt-4 text-sm sm:text-base md:text-lg max-w-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Space TEchnology Project
        </motion.p>
        <motion.div className="absolute bottom-10 animate-bounce" style={{ opacity }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.5"
                height="20.2"
                fill="white"  // ✅ 让箭头变成白色
                className="svg-arrow-down"
            >
                <path d="M0 12.4l7.8 7.8 7.7-7.8-1-1-6 6V0H7v17.4l-6-6z"></path>
            </svg>
        </motion.div>

      </div>
    </div>
  );
}
