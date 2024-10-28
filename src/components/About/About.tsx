import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import styles from "./About.module.css";

export default async function About({
  src,
  alt,
  content,
  components,
}: {
  src: string;
  alt: string;
  content: string;
  components: any;
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
      <section className={styles.textWrapper}>
        <MDXRemote source={content} components={components} />
      </section>
    </main>
  );
}
