"use server";
import { cookies } from "next/headers";
import { prisma } from "../../db/clients";
import { deriveRecordInfo } from "./helpers";
import matter from "gray-matter";
import { DerivedData } from "@/app/types";

async function createBlogMDX(formData: FormData) {
  const post = String(formData.get("blogcontent"));
  const published = new Date();
  await prisma.posts.create({
    data: {
      post,
      published,
    },
  });
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
