import styled from "styled-components";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { CardProps, DerivedData } from "@/types/types.js";
import matter from "gray-matter";

export default function CardList({
  cardData,
}: {
  cardData: Array<DerivedData>;
}) {
  return (
    <div className={styles.wrapper}>
      <ol className={styles.list}>
        {cardData.map(({ id, title, href, abstract, content, date }) => {
          return (
            <Card
              key={id}
              title={title}
              href={`posts/${id}/${href}`}
              abstract={abstract}
              date={date}
            />
          );
        })}
      </ol>
    </div>
  );
}
