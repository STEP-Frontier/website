import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "STEP - Space TEchnology Project",
  description: "筑波大学宇宙技術プロジェクト STEP の公式ホームページ",
  other: {
    "google-site-verification": "7jOD2pULwZglerFU6d4GpFLg7Rb8WO_TVLZh7J404Ik",
  },
};

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
