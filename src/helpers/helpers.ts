import { Readable } from "stream";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma, s3 } from "../../db/clients";
import matter, { GrayMatterFile } from "gray-matter";

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
          href: href,
          published: createdOn,
        },
      }),
    ]);
  } catch (err) {
    throw err;
  }
}

export { camelCaser, range, streamToString };
