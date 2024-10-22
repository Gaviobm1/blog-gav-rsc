import { GetObjectCommand } from "@aws-sdk/client-s3";
import matter from "gray-matter";
import BlogHero from "@/components/BlogHero/BlogHero";
import { streamToString, camelCaser } from "@/helpers/helpers";
import styles from "./BlogPage.module.css";
import { format } from "date-fns";
import BlogBody from "../BlogBody/BlogBody";
import { S3Params } from "../../app/types";
import { object } from "prop-types";
import { Readable } from "stream";
import { s3 } from "../../../db/clients";
import { getBlog } from "@/helpers/serverActions";

export default async function BlogPage({ file }: { file: string }) {
  if (file === "favicon.ico") {
    return;
  }
  const key =
    file
      .split("-")
      .map((word, index) => camelCaser(word, index))
      .join("") + ".mdx";

  const post = await getBlog(key);
  if (post) {
    const { data, content } = matter(post);
    const date = format(data.createdOn, "PPPP");
    return (
      <main className={styles.wrapper}>
        <BlogHero date={date} title={data.title} />
        <BlogBody content={content} />
      </main>
    );
  }
}
