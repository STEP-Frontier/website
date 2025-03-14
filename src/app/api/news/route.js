import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  const newsDir = path.join(process.cwd(), "public/news");
  const filenames = fs.readdirSync(newsDir);

  const newsData = filenames.map((filename) => {
    const filePath = path.join(newsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      id: filename.replace(".md", ""), // 提取 id（去掉 .md 后缀）
      title: data.title,
      date: data.date,
      image: data.image,
      summary: data.summary || "No summary available.", // 防止 summary 为空
    };
  });

  return Response.json(newsData.sort((a, b) => new Date(b.date) - new Date(a.date)));
}
