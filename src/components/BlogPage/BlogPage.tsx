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
import { getBlogMDX } from "@/helpers/serverActions";

export default async function BlogPage({ id }: { id: number }) {
  const post = await getBlogMDX(id);
  if (post) {
    const { data, content } = post;
    const date = format(data.published, "PPPP");
    return (
      <main className={styles.wrapper}>
        <BlogHero date={date} title={data.title} />
        <BlogBody content={content} />
      </main>
    );
  }
}
