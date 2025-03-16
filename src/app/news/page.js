"use client";
import { useState, useEffect } from "react";
import newsData from "@/newsData.json"; // ✅ 直接导入 JSON 数据
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


export default function News() {
  const featuredNewsIds = ["2"];
  const featuredNews = newsData.filter((news) => featuredNewsIds.includes(news.id));

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
    <div className="w-full">
      {/* 🔥 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center" 
        style={{ backgroundImage: "url('/images/news/news-hero.jpg')" }}>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        ></div>
        <motion.h1
          className="relative text-3xl sm:text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          NEWS
        </motion.h1>
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
      </section>

      {/* 🔥 2. 两列布局 */}
      <div className="max-w-7xl mx-auto md:px-16 pt-20 xl:px-0 pb-20 flex flex-col-reverse lg:grid lg:grid-cols-3">
        
        {/* 📌 普通新闻列表 */}
        <div className="md:col-span-2 space-y-6">
          {newsData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((news, index) => (
            <motion.div
              key={news.id}
              className="p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }} // 让 framer-motion 处理悬停动画
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={`/news/${news.id}`} className="block">
                <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-gray-700 rounded-lg flex justify-center items-center overflow-hidden">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    width={600} 
                    height={350} 
                    className="w-full h-full object-cover"
                  />
                </div>
            
                <div className="w-full">
                  <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mt-4">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-[0.625rem] sm:text-xs md:text-sm mt-2">{news.date}</p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2">
                    {news.summary}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* 📌 Featured News 在手机端显示在上方，桌面端在右侧 */}
        <div className="space-y-6 p-6">
          <h2 className="text-2xl font-bold text-white">Featured News</h2>
          {featuredNews.length === 0 ? (
            <p className="text-gray-400">No featured news available</p>
          ) : (
            featuredNews.map((news) => (
              <motion.div
                key={news.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <Link href={`/news/${news.id}`} className="block">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">{news.title}</h3>
                  <p className="text-gray-400 text-[0.625rem] sm:text-xs md:text-sm">{news.date}</p>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
