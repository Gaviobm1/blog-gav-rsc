import About from "@/components/About/About";
import AboutWrapper from "@/components/AboutWrapper/AboutWrapper";
import * as fs from "fs/promises";
import path from "path";

export default async function AboutPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), "public", "Text", "AboutMe", "aboutMe.mdx"),
    "utf8"
  );
  const components = {
    AboutWrapper,
  };
  return (
    <About
      src="/images/about_me.jpg"
      content={content}
      alt=""
      components={components}
    />
  );
}
