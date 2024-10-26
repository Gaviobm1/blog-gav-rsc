"use server";
import { cookies } from "next/headers";
import { prisma } from "../../db/clients";
import { deriveRecordInfo } from "./helpers";
import { z } from "zod";
import { DerivedData } from "@/app/types";
import { redirect } from "next/navigation";

async function createBlogMDX(formData: FormData) {
  const blogSchema = z.string().min(1);
  const post = String(formData.get("blogcontent"));
  console.log(blogSchema.parse(post));
  const published = new Date();
  await prisma.posts.create({
    data: {
      post,
      published,
    },
  });
  redirect("/");
}

async function getBlogMDX(id: number): Promise<DerivedData> {
  const record = await prisma.posts.findUnique({
    where: {
      id: id,
    },
  });
  if (record) {
    return deriveRecordInfo(record);
  }
  throw new Error("Record not found");
}

async function getAllPosts(
  toSkip: number,
  resultsPerPage: number
): Promise<DerivedData[]> {
  const records = await prisma.posts.findMany({
    skip: toSkip,
    take: resultsPerPage,
  });
  if (records) {
    return records.map((record) => deriveRecordInfo(record));
  }
  throw new Error("Record not found");
}

async function getPostCount() {
  return await prisma.posts.count();
}

async function setCookie(nextTheme: string) {
  const maxAge = 60 * 60 * 24 * 1000;
  cookies().set("theme", nextTheme, { maxAge: maxAge });
}

export { createBlogMDX, getAllPosts, getBlogMDX, getPostCount, setCookie };
