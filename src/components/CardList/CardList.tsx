import styled from "styled-components";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { CardProps, PostType } from "@/app/types.js";
import matter from "gray-matter";

export default function CardList({ data }: { data: Array<PostType> }) {
  console.log(data);
  return (
    <div className={styles.wrapper}>
      <ol className={styles.list}>
        {data.map(({ post, id, href, published }) => {
          const { data } = matter(post);
          return (
            <Card
              key={id}
              title={data.title}
              href={`posts/${id}/${href}`}
              abstract={data.abstract}
              published={published}
            />
          );
        })}
      </ol>
    </div>
  );
}
