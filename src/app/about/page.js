"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Hero from "@/components/Hero";

import { url } from "@/util/url-converter";

const departments = [
  {
    name: "機体班",
    description: "ロケット本体と分離機構を作成する班であり、飛翔シミュレーションも行っている",
    image: "/images/about/structure.jpg"
  },
  {
    name: "電装班",
    description: "ロケット管理用の回路やエンジンの地上燃焼試験用の回路を作成する",
    image: "/images/about/avionics.jpg"
  },
  {
    name: "エンジン班",
    description: "打ち上げ時の地上支援装置の運用や、ハイブリットエンジンの管理を行う",
    image: "/images/about/engine.jpg"
  },
  {
    name: "衛星班",
    description: "模擬人工衛星CanSatを作成し、コンテストに出場する",
    image: "/images/about/eisei.jpg"
  },
];

const currentYear = 2025; // 这里你可以用 `new Date().getFullYear()` 让它变成动态的

export default function About() {
  const [members, setMembers] = useState([]);
  const [representativeText, setRepresentativeText] = useState("");

  const groupedByYear = members.reduce((acc, member) => {
    const stayDown = member.stay_down ?? 0;
    const OB = member.ob ?? 0; 
    const transfer = member.transfer ?? 1; 

    const grade = currentYear - member.year - stayDown + transfer;
    if (OB) return acc;
    if (!acc[grade]) acc[grade] = [];
    acc[grade].push(member);
    return acc;
  }, {});

  useEffect(() => {
    async function fetchMembers() {
      const res = await fetch("/data/members.json"); 
      const data = await res.json();
      setMembers(data);
    }
    fetchMembers();
  }, []);

  useEffect(() => {
    async function fetchText() {
      const res = await fetch("/data/representative.txt"); 
      const text = await res.text();
      setRepresentativeText(text);
    }
    fetchText();
  }, []);


  return (
    <div className="w-full">
      {/* 🔥 1. Hero Section */}
      <Hero 
      image_path="/images/about/about-hero.jpg"
      hero_title="ABOUT US"
      black_opacity={0.5}
      center_or_top="center"
      />

      {/* 🔥 2. Introduction */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <motion.div
        //   className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300">
            私たち、筑波大学宇宙技術プロジェクト STEP は、航空宇宙工学と技術の研究開発を行う学生団体です。
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-4">
            2006年5月に筑波大学の工学を専攻にする学生有志を中心として設立され、技術者になるためのトレーニングの場として、ロケットや人工衛星といった宇宙に関する技術を題材にしたものづくりを中心とした活動を展開しています。
          </p>
          <ul className="text-sm sm:text-base md:text-lg text-gray-300 text-left mt-6 space-y-2 inline-block">
                <li>① 実際の製作技術の習得</li>
                <li>② ものづくりをチームで行う上で裁かれるプロジェクト体制の運用を経験すること</li>
                <li>③ コミュニケーション能力やプレゼンテーション技術など個人能力向上</li>
          </ul>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-4">
          といった，机上で学ぶことのできない総合的実践力を楽しみながら養うことを目的に活動しています。
          </p>
        </motion.div>
      </section>

      {/* 🔥 3. Representative */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">代表挨拶</h2>
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <p className="text-sm sm:text-base md:text-lg text-gray-300 whitespace-pre-line">
                {representativeText}
              </p>
            </div>
            <div className="lg:w-1/2">
              <Image src={url("/images/about/representative.jpg")} alt="Representative" width={600} height={400} className="rounded-lg shadow-lg w-full object-cover" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 🔥 各班の活動 */}
      <section className="max-w-7xl mx-auto sm:px-8 md:px-16 py-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          各班の活動
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-2 gap-10">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              className="bg-gray-1000 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[400px] bg-gray-700 rounded-lg flex justify-center items-center overflow-hidden mb-4">
                <Image src={url(dept.image)} alt={dept.name} width={600} height={350} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white">{dept.name}</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 ml-0 sm:ml-6 md:ml-12 mr-0 sm:mr-6 md:mr-12">{dept.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 Our Team Section */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Our Team
        </motion.h2>

        {/* 🚀 Left members, Right photos */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* 📌 Member list */}
          <div className="lg:w-1/3">
            <div className="mb-10">
              {Object.keys(groupedByYear)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map((year) => (
                  <motion.div
                    key={year}
                    className="bg-gray-1000 p-6 rounded-lg"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white">{year}年生</h3>
                    <ul className="mt-4 space-y-2">
                      {groupedByYear[year].map((member, index) => (
                        <li key={index} className="text-sm sm:text-base md:text-lg text-gray-300">
                          <span className="font-semibold text-white">{member.name}</span> - {member.department}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* 📌 Photos */}
          <div className="lg:w-2/3 grid grid-cols-1">
            {["/images/about/team-photo-1.jpg", "/images/about/team-photo-2.jpg"].map((src, index) => (
              <motion.div
                key={index}
                className="relative w-full md:p-12 mb-16 md:mb-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <Image 
                  src={url(src)}
                  alt={`Team Photo ${index + 1}`}
                  width={200}
                  height={200}
                  className=" shadow-lg w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
