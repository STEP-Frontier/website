const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const newsDirectory = path.join(process.cwd(), "public/news");
const outputFilePath = path.join(process.cwd(), "src/newsData.json");

// 读取 `news` 目录下的所有 `.md` 文件
const filenames = fs.readdirSync(newsDirectory);

const newsData = filenames.map((filename) => {
  const filePath = path.join(newsDirectory, filename);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);

  return {
    id: filename.replace(".md", ""),
    title: data.title,
    date: data.date,
    image: data.image,
    summary: data.summary,
  };
});

// 将 `news` 数据写入 `news.json`
fs.writeFileSync(outputFilePath, JSON.stringify(newsData, null, 2));

console.log("✅ News data generated successfully: public/news.json");
