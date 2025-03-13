"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
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
            我们是一个专注于航天技术的社团，致力于推动科技发展并探索无限可能。
          </p>
        </motion.div>
      </section>

      {/* 🔥 3. 交错布局的 Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* 🚀 左文右图 */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300">
              我们的目标是推动航天工程和技术的前沿，培养下一代航天科学家和工程师。
            </p>
          </div>
          <div className="md:w-1/2">
            <Image src="/images/mission.jpg" alt="Our Mission" width={600} height={400} className="rounded-lg shadow-lg" />
          </div>
        </motion.div>

        {/* 🚀 右文左图 */}
        <motion.div
          className="flex flex-col md:flex-row-reverse items-center gap-10 mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Projects</h2>
            <p className="text-lg text-gray-300">
              我们设计、制造和测试高性能火箭与卫星，以实践科学与技术的结合。
            </p>
          </div>
          <div className="md:w-1/2">
            <Image src="/images/projects.jpg" alt="Our Projects" width={600} height={400} className="rounded-lg shadow-lg" />
          </div>
        </motion.div>
      </section>

      {/* 🔥 4. 团队介绍 */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 🔥 示例团队成员 */}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Image src="/images/member1.jpg" alt="Team Member" width={150} height={150} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold">Alice</h3>
            <p className="text-gray-400">Lead Engineer</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Image src="/images/member2.jpg" alt="Team Member" width={150} height={150} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold">Bob</h3>
            <p className="text-gray-400">Mission Director</p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Image src="/images/member3.jpg" alt="Team Member" width={150} height={150} className="rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold">Charlie</h3>
            <p className="text-gray-400">Software Engineer</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
