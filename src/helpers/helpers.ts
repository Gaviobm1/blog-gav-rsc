import { Readable } from "stream";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma, s3 } from "../../db/clients";
import matter, { GrayMatterFile } from "gray-matter";
import { PostType, DerivedData } from "@/app/types";
import { format } from "date-fns";
import emailjs from "@emailjs/browser";
import { redirect } from "next/navigation";
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

function deriveRecordInfo(record: PostType): DerivedData {
  const { id, post, published } = record;
  if (post) {
    const { data, content } = matter(post);
    const abstract = content.slice(0, 240);
    const href = data.title.toLowerCase().split(" ").join("-");
    const title = data.title;
    const date = format(published, "PPPP");
    return { id, title, content, href, abstract, date };
  }
  throw new Error("Failed to get record");
}

function camelCaser(word: string, index: number) {
  let firstLetter;
  if (index) {
    firstLetter = word[0].toUpperCase();
  } else {
    firstLetter = word[0].toLowerCase();
  }
  if (word.length > 1) {
    const otherLetters = word.slice(1);
    return firstLetter + otherLetters;
  } else {
    return firstLetter;
  }
}

function range(start: number, end: number) {
  const arr = [];

  for (let i = start; i <= end; i += 1) {
    arr.push(i);
  }
  return arr;
}

const streamToString = (stream: Readable): Promise<string> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
};

async function getBlog(key: string) {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    };

    const data = await s3.send(new GetObjectCommand(params));
    if (data.Body instanceof Readable) {
      const body = await streamToString(data.Body);
      return matter(body);
    } else {
      return undefined;
    }
  } catch (err) {
    console.error(err);
  }
}

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
          post: frontMatter + blogContent,
          published: createdOn,
        },
      }),
    ]);
  } catch (err) {
    throw err;
  }
}

export { camelCaser, range, streamToString, deriveRecordInfo, sendEmail };
