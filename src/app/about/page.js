"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const departments = [
  {
    name: "機体班",
    description: "機体設計",
    image: "/images/structure.jpg"
  },
  {
    name: "電装班",
    description: "回路設計とプログラミング",
    image: "/images/avionics.jpg"
  },
  {
    name: "エンジン班",
    description: "エンジンの管理",
    image: "/images/engine.jpg"
  },
  {
    name: "衛星班",
    description: "CanSatの開発",
    image: "/images/cansat.jpg"
  },

];

export default function About() {
  const [opacity, setOpacity] = useState(1);

  const [members, setMembers] = useState([]);
//   const currentYear = new Date().getFullYear();
  const currentYear = 2025;
  
  useEffect(() => {
    async function fetchMembers() {
      const res = await fetch("/api/about");
      const data = await res.json();
      setMembers(data);
    }
    fetchMembers();
  }, []);

  const groupedByYear = members.reduce((acc, member) => {
    const grade = currentYear - member.year + 1; // 计算年级
    if (grade > 4) return acc; 
    if (!acc[grade]) acc[grade] = [];
    acc[grade].push(member);
    return acc;
  }, {});

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
          ABOUT US
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

      {/* 🔥 2. 关于我们的介绍 */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg text-gray-300">
            私たち、筑波大学宇宙技術プロジェクト STEP は、航空宇宙工学と技術の研究開発を行う学生団体です。
          </p>
        </motion.div>
      </section>

      {/* 🔥 3. 交错布局的 Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* 🚀 左文右图 */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">代表挨拶</h2>
            <p className="text-lg text-gray-300">
              昨日4時まで起きてたので今めっちゃ眠いです
            </p>
          </div>
          <div className="md:w-1/2">
            <Image src="/images/representative.jpg" alt="Representative" width={600} height={400} className="rounded-lg shadow-lg" />
          </div>
        </motion.div>
      </section>

      {/* 🔥 各部门的活动 */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          部门活动
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Image src={dept.image} alt={dept.name} width={300} height={200} className="rounded-lg mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{dept.name}</h3>
              <p className="text-lg text-gray-300 mt-2">{dept.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 Our Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Team
        </motion.h2>

        {/* 🚀 主体部分：左边成员列表 + 右边团队照片 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* 📌 左边：成员列表 */}
          <div className="md:w-1/2">
            <div className="space-y-10">
              {Object.keys(groupedByYear)
                .sort((a, b) => parseInt(b) - parseInt(a)) // 年级降序排列
                .map((year) => (
                  <motion.div
                    key={year}
                    className="bg-gray-1000 p-6 rounded-lg"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-white">{year}年生</h3>
                    <ul className="mt-4 space-y-2">
                      {groupedByYear[year].map((member, index) => (
                        <li key={index} className="text-lg text-gray-300">
                          <span className="font-semibold text-white">{member.name}</span> - {member.department}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* 📌 右边：团队合照 */}
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              className="relative w-full max-w-md"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Image 
                src="/images/team-photo.jpg"
                alt="Team Photo"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
