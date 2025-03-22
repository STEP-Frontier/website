"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Section({ title, content, image, reverse, learnMoreLink}) {
  return (
    <motion.div
      className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center px-6 py-20`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="md:w-1/2 md:mb-0 mb-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-300">{content}</p>
        {learnMoreLink && (
          <div className="text-center md:text-left">
          <Link href={learnMoreLink}>
            
          <button className="mt-4 px-6 sm:px-7 md:px-8 py-1 border-2 border-gray-700 text-gray-500 text-xs sm:text-sm md:text-base rounded-full transition duration-300 ease-in-out hover:border-blue-800 hover:text-white hover:cursor-pointer">
            Learn More
          </button>
          
        </Link>
        </div>
        )}
      </div>
      <div className="md:m-5"></div>
      <div className="md:w-1/2">
        <img src={image} alt={title} className="w-full rounded-lg shadow-lg" />
      </div>
    </motion.div>
  );
}
