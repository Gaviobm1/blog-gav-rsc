"use server";
import { camelCaser, streamToString } from "./helpers";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { cookies } from "next/headers";
import { Readable } from "stream";
import { prisma, s3 } from "../../db/clients";

async function uploadBlog(formData: FormData) {
  try {
    const title = String(formData.get("title"));
    const key =
      title
        .split(" ")
        .map((word: string, index: number) => {
          return camelCaser(word, index);
        })
        .join("") + ".mdx";
    const href = title
      .split(" ")
      .map((word: string) => word.toLowerCase())
      .join("-");
    const createdOn = new Date();
    const frontMatter = `---\ntitle: ${title}\ncreatedOn: ${createdOn}\n---`;
    const blogContent = String(formData.get("blogcontent"));

    const abstract = blogContent.slice(0, 240);

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: frontMatter + "\n\n" + blogContent,
      ContentType: "text/mdx",
    };
    await Promise.all([
      s3.send(new PutObjectCommand(params)),
      prisma.posts.create({
        data: {
          key: key,
          href: href,
          title: title,
          abstract: abstract,
          created_on: createdOn,
        },
      }),
    ]);
  } catch (err) {
    throw err;
  }
}

async function getBlog(key: string) {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    };

    const data = await s3.send(new GetObjectCommand(params));
    if (data.Body instanceof Readable) {
      return streamToString(data.Body);
    } else {
      return undefined;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getBlogList(toSkip: number, toTake: number) {
  const data = await prisma.posts.findMany({
    skip: toSkip,
    take: toTake,
    select: {
      title: true,
      href: true,
      abstract: true,
      created_on: true,
    },
  });
  await prisma.$disconnect();
  return data;
}

async function getPostCount() {
  const count = await prisma.posts.count();
  await prisma.$disconnect();
  return count;
}

async function setCookie(nextTheme: string) {
  const maxAge = 60 * 60 * 24 * 1000;
  cookies().set("theme", nextTheme, { maxAge: maxAge });
}

export { uploadBlog, getBlogList, getPostCount, setCookie, getBlog };
