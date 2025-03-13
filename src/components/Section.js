"use client";
import { motion } from "framer-motion";

export default function Section({ title, content, image, reverse }) {
  return (
    <motion.div
      className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center px-6 py-20`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-300">{content}</p>
      </div>
      <div className="md:w-1/2">
        <img src={image} alt={title} className="w-full rounded-lg shadow-lg" />
      </div>
    </motion.div>
  );
}
