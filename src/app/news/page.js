"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const featuredNewsIds = ["2"];

export default function News() {
    const [newsData, setNewsData] = useState([]);
    
    const featuredNews = newsData.filter((news) => featuredNewsIds.includes(news.id));

    // 🚀 组件加载时请求 API
    useEffect(() => {
        async function fetchNews() {
        const res = await fetch("/api/news"); // 🔹 向 API 请求数据
        const data = await res.json();
        setNewsData(data);
        }
        fetchNews();
    }, []);

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
        style={{ backgroundImage: "url('/images/about-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto p-16 py-20">
        {/* 左侧：新闻列表 */}
        <div className="md:col-span-2 space-y-6">
          {newsData.map((news, index) => (
            <motion.div
              key={news.id}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/news/${news.id}`} className="block">
                <Image src={news.image} alt={news.title} width={600} height={350} className="rounded-lg" />
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mt-4">{news.title}</h3>
                <p className="text-gray-400 text-[0.625rem] sm:text-xs md:text-sm mt-2">{news.date}</p>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2">{news.summary}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 右侧：置顶新闻 */}
        <div className="space-y-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Featured News</h2>
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
