"use client";
import { useState, useEffect } from "react";
import newsData from "@/newsData.json"; 
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";

import { url } from "@/util/url-converter";

export default function News() {
  const featuredNewsIds = ["2"];
  const featuredNews = newsData.filter((news) => featuredNewsIds.includes(news.id));

  const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="w-full">
      {/* 🔥 1. Hero Section */}
      <Hero 
        image_path={url("/images/news/news-hero.jpg")}
        hero_title="NEWS"
        black_opacity={0.3}
        center_or_top="top"
      />

      {/* 🔥 2. 两列布局 */}
      <div className="max-w-7xl mx-auto md:px-16 pt-20 xl:px-0 pb-20 flex flex-col-reverse lg:grid lg:grid-cols-3">
        
        {/* 📌 普通新闻列表 */}
        <div className="md:col-span-2 space-y-6">
          {sortedNews.map((news, index) => (
            <motion.div
              key={news.id}
              className="p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/news/${news.id}`} className="block">
                <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-gray-700 rounded-lg flex justify-center items-center overflow-hidden">
                  <Image 
                    src={url(news.image)}
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
                viewport={{ once: true }}
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
