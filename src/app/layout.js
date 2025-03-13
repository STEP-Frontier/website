import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import "./globals.css"; // 确保 Tailwind CSS 生效

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="bg-black text-white">
        <Navbar /> {/* ✅ 添加导航栏 */}
        <main>{children}</main>
        {/* <Footer /> ✅ 添加页脚（如果有） */}
      </body>
    </html>
  );
}
