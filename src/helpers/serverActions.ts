"use server";
import { cookies } from "next/headers";
import { prisma } from "../../db/clients";
import { format } from "date-fns";
import matter from "gray-matter";

async function createBlogMDX(formData: FormData) {
  const title = String(formData.get("title"));
  const href = title.toLowerCase().split(" ").join("-");
  const blogContent = String(formData.get("blogcontent"));
  const published = new Date();
  const abstract = blogContent.slice(0, 240);
  const frontMatter = `---
  title: "${title}"
  abstract: '${abstract}'
  published: "${published}"
  ---`;
  const post = frontMatter + "\n" + blogContent;

  await prisma.posts.create({
    data: {
      post,
      href,
      published,
    },
  });
}

async function getBlogMDX(id: number) {
  const record = await prisma.posts.findUnique({
    where: {
      id: id,
    },
    select: {
      post: true,
      published: true,
      href: true,
    },
  });
  if (record) {
    const { post, href, published } = record;
    if (post) {
      const { data, content } = matter(post);
      return { data, content, href, published };
    }
  }
}

async function getAllPosts(toSkip: number, resultsPerPage: number) {
  return await prisma.posts.findMany({
    skip: toSkip,
    take: resultsPerPage,
  });
}

async function getPostCount() {
  return await prisma.posts.count();
}

async function setCookie(nextTheme: string) {
  const maxAge = 60 * 60 * 24 * 1000;
  cookies().set("theme", nextTheme, { maxAge: maxAge });
}

export { createBlogMDX, getAllPosts, getBlogMDX, getPostCount, setCookie };
