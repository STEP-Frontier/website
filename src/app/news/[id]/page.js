import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Image from "next/image";
import "../news.css";

export default async function NewsDetailPage({ params }) {
  // 👇 这里从 params 解构出 id
  const { id } = params;

  const filePath = path.join(process.cwd(), "public/news", `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-80 md:h-96 mb-8">
        <Image
          src={data.image}
          alt={data.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="absolute bottom-5 left-5 text-[1.75rem] md:text-[2.0rem] lg:text-[2.25rem] font-bold">
          {data.title}
        </h1>
      </div>

      {/* News Meta Info */}
      <p className="text-sm text-gray-400 mb-2">Article ID: {id}</p>
      <p className="text-sm text-gray-400 mb-6">Published on: {data.date}</p>

      {/* News Content */}
      <div
        className="news-content text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
