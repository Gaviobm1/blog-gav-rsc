import Link from "next/link";
import styles from "./Card.module.css";
import { Suspense } from "react";
import SkeletonCard from "@/Skeletons/SkeletonCard/SkeletonCard";
import { CardProps } from "@/types/types";

export default function Card({ title, abstract, href, date }: CardProps) {
  return (
    <Suspense fallback={<SkeletonCard />}>
      <article className={styles.wrapper}>
        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.published}>Published on: {date}</p>
        <p className={styles.abstract}>{abstract}</p>
        <Link className={styles.explicitLink} href={href}>
          {" "}
          Continue reading
        </Link>
      </article>
    </Suspense>
  );
}
