import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./BlogBody.module.css";

export default function BlogBody({ content }: { content: string }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <MDXRemote source={content} />
      </div>
    </div>
  );
}
