"use server";
import { cookies } from "next/headers";
import { prisma } from "../../db/clients";
import { deriveRecordInfo } from "./helpers";
import { DerivedData } from "@/types/types";
import { redirect } from "next/navigation";
import emailjs from "@emailjs/browser";
import { z } from "zod";

async function sendEmail(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const contactSchema = z.object({
    subject: z.string().min(1),
    user_name: z.string().min(1),
    user_email: z.string().email(),
    message: z.string().min(1),
  });

  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
  });

  const form = e.target as HTMLFormElement;

  const formData = new FormData(form);

  const subject = formData.get("subject");
  const user_name = formData.get("user_name");
  const user_email = formData.get("user_email");
  const message = formData.get("message");

  const params = {
    subject,
    user_name,
    user_email,
    message,
  };

  contactSchema.parse(params);

  try {
    await emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "",
        params
      )
      .then((data) => {
        console.log(`Successfully sent: ${data.status} ${data.text}`);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
    redirect("/");
  } catch (err) {
    console.log(err);
  }
}

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

export {
  sendEmail,
  createBlogMDX,
  getAllPosts,
  getBlogMDX,
  getPostCount,
  setCookie,
};
