import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import "../news.css";

export async function generateStaticParams() {
  const newsDirectory = path.join(process.cwd(), "public/news");
  const filenames = fs.readdirSync(newsDirectory);

  return filenames.map((filename) => ({
    id: filename.replace(".md", ""),
  }));
}

export default async function NewsDetailPage({ params }) {
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || "";

  const { id } = params;
  const filePath = path.join(process.cwd(), "public/news", `${id}.md`);

  if (!fs.existsSync(filePath)) {
    return <div className="text-center py-10 text-red-500">News not found.</div>;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="w-full">
      <Navbar isDark={true} />

      <div className="max-w-4xl mx-auto pt-16 md:pt-22">
        <div className="relative w-full h-80 md:h-96">
          <Image
            src={baseUrl + data.image}
            alt={data.title}
            width={600}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="text-center mt-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl px-8 font-bold">{data.title}</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">{data.date}</p>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-6 text-lg leading-relaxed">
        <div className="news-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <Link href="/news">
          <button className="px-6 py-3 border-2 border-gray-700 text-gray-500 rounded-full transition duration-300 ease-in-out hover:border-blue-800 hover:text-white hover:cursor-pointer">
            ← Back to News
          </button>
        </Link>
      </div>
    </div>
  );
}
