import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css"; // 确保 Tailwind CSS 生效

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-black text-white">
        <Navbar /> 
        <main>{children}</main>
        <Footer /> 
      </body>
    </html>
  );
}
