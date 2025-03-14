import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public/members.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const members = JSON.parse(fileContent);

  return Response.json(members);
}
