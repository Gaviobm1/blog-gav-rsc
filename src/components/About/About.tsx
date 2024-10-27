import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import styles from "./About.module.css";

export default async function About({
  src,
  alt,
  title,
  content,
}: {
  src: string;
  alt: string;
  title: string;
  content: string;
}) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.pictureWrapper}>
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className={styles.backglow}
        />
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className={styles.image}
        />
      </div>
      <section>
        <h1>{title}</h1>
        <MDXRemote source={content} />
      </section>
    </main>
  );
}
