"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Hero from "@/components/Hero";

const rocketProjects = [
  {
    name: "STEP-17 Progress",
    year: "2022",
    specs: [
      "全長: 2.293 m",
      "直径: 120 mm",
      "使用エンジン: HyperTEK K240",
      "予想到達高度: 374.1 m",
    ],
    description: "この機体は高高度打ち上げを見据えた技術実証機であり、強度を向上させる構造や浮力を補う展開式フロートなどを実装しています。また、分離機構については2020洋上打ち上げに用いたものを1段のみの分離機構として改良し、搭載しています。",
    results: "8月19日10時35分頃、秋田県能代市落合浜旧能代海水浴場にて打ち上げが行われました。\n機体は安定飛行し、打ち上げは成功しました。その後、頂点付近で分離機構が正常に作動しパラシュートが放出されることで機体は減速落下しました。なお、到達高度は約330 mでした。分離の成功はSTEPとして5年ぶりのこととなります。\n当日は強風によって様々な変更が必要となりましたが、これに迅速に対応することができました。このことからも、今回目指していた打上技術の継承を十分に達成できたと団体として考えています。同時に、様々な反省点や改善点を発見することができたので、次回以降のミッションで生かしていきたいと思います！",
    images: ["/images/rocket/projects/progress-1.jpg", "/images/rocket/projects/progress-2.jpg"]
  },
  {
    name: "BlueROSE",
    year: "2020",
    goal: "Testing new avionics system",
    specs: [
      "全長: 2.85 m",
      "直径: 120 mm",
      "使用エンジン: HyperTEK M1000",
      "予想到達高度: 約3 km超",
    ],
    description: "Astrocean社の洋上打上実験に参加し、学生主体団体として日本初のロケット洋上打上、及び学生団体の高度日本記録更新を目指します。この機体は2度パラシュートを放出する2段分離機構を搭載しており、STEP史上最長となります。",
    results: "2月24日正午ごろ、茨城県沖約80㎞の洋上より打ち上げが行われました。\n機体は安定飛行し、打ち上げは成功しました。\n機器トラブルによりデータは取得できませんでしたが、飛翔時間よりおよそ高度4㎞程度まで到達したと推測されます。\n",
    images: ["/images/rocket/projects/bluerose-1.jpg", "/images/rocket/projects/bluerose-2.jpg"]
  },
];

export default function Rocket() {
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
      <Hero 
      image_path="/images/rocket/rocket-hero.jpg"
      hero_title="ROCKET PROJECTS"
      black_opacity={0.4}
      center_or_top="top"
      />
      

      {/* 🔥 2. 各个火箭的详细页面 */}
      {rocketProjects.map((rocket, index) => (
        <section key={index} className="py-20 px-8 md:px-16 max-w-[90rem] mx-auto">
          {/* 🏆 项目标题 & 介绍 */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">{rocket.name}</h2>
            {/* <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4">{rocket.description}</p> */}
          </div>

          {/* 🔥 3. 左文右图 (火箭参数) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="lg:w-1/2 text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">機体概要</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-4 mb-4">{rocket.description}</p>
                <ul className="text-sm sm:text-base md:text-lg text-gray-300 space-y-1">
                  {rocket.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <Image
                  src={rocket.images[0]}
                  alt={`${rocket.name} image`}
                  width={600}
                  height={400}
                  className="shadow-lg w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-10 mt-20">
              <div className="lg:w-1/2 text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">実験結果</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">
                  {rocket.results.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>

              </div>
              <div className="lg:w-1/2">
                <Image
                  src={rocket.images[1]}
                  alt={`${rocket.name} experiment`}
                  width={600}
                  height={400}
                  className="shadow-lg w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </section>
      ))}

      <div className="m-[5rem]"></div>
    </div>
  );
}
