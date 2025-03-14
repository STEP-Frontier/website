"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// 假设的新闻数据
const newsData = [
  {
    id: 1,
    title: "STEP 成功发射新型火箭",
    date: "2024-03-10",
    image: "/images/news1.jpg",
    summary: "我们的团队成功发射了最新的实验性火箭，并完成了高空测试。",
  },
  {
    id: 2,
    title: "小型卫星计划取得突破",
    date: "2024-02-25",
    image: "/images/news2.jpg",
    summary: "我们的卫星团队成功测试了新型通信系统，为未来任务奠定基础。",
  },
  {
    id: 3,
    title: "STEP 受邀参加全球航天会议",
    date: "2024-02-15",
    image: "/images/news3.jpg",
    summary: "我们的团队将在国际航天大会上分享最新研究成果。",
  },
  {
    id: 4,
    title: "软件团队完成火箭飞行模拟系统",
    date: "2024-01-30",
    image: "/images/news4.jpg",
    summary: "新的飞行模拟软件将提升火箭设计的精准度。",
  },
  {
    id: 5,
    title: "社团成员招募中！",
    date: "2024-01-20",
    image: "/images/news5.jpg",
    summary: "如果你对航天充满热情，快来加入我们，一起探索太空！",
  },
];

export default function News() {
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
          className="relative text-5xl font-bold"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto py-20">
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
                <h3 className="text-2xl font-bold text-white mt-4">{news.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{news.date}</p>
                <p className="text-lg text-gray-300 mt-2">{news.summary}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 右侧：置顶新闻 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Featured News</h2>
          {newsData.slice(0, 3).map((news) => (
            <motion.div
              key={news.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/news/${news.id}`} className="block">
                <h3 className="text-lg font-bold text-white">{news.title}</h3>
                <p className="text-gray-400 text-sm">{news.date}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
