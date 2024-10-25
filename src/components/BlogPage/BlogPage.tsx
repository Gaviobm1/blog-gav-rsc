import BlogHero from "@/components/BlogHero/BlogHero";
import styles from "./BlogPage.module.css";
import { format } from "date-fns";
import BlogBody from "../BlogBody/BlogBody";

import { getBlogMDX } from "@/helpers/serverActions";

export default async function BlogPage({ id }: { id: number }) {
  const post = await getBlogMDX(id);
  if (post) {
    const { title, date, content } = post;
    return (
      <main className={styles.wrapper}>
        <BlogHero date={date} title={title} />
        <BlogBody content={content} />
      </main>
    );
  }
}
