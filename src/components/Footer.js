"use client";
import { FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          {/* 📌 地址 */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">Our Address</h3>
            <p className="text-xs sm:text-sm md:text-base">筑波大学 宇宙技術プロジェクト STEP</p>
            <p className="text-xs sm:text-sm md:text-base">1-1-1 Tennodai, Tsukuba, Ibaraki, Japan</p>
          </div>

          {/* 📌 联系方式 */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">Contact</h3>
            <p className="text-xs sm:text-sm md:text-base">Email: <a href="mailto:step.tsukuba@gmail.com" className="hover:text-white transition">step.tsukuba@gmail.com</a></p>
          </div>

          {/* 📌 社交媒体 */}
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://x.com/Tsukuba_STEP" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-2xl">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/tsukuba_step?igsh=MWs2N2dubDk4YWZpcQ==" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-2xl">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* 📌 底部版权信息 */}
        <div className="mt-10 text-center text-[0.625rem] sm:text-xs md:text-sm text-gray-400">
          © {new Date().getFullYear()} STEP - Tsukuba Space TEchnology Project. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
