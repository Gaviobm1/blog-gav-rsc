import styled from "styled-components";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { CardProps } from "@/app/types.js";

export default function CardList({ data }: { data: Array<CardProps> }) {
  return (
    <div className={styles.wrapper}>
      <ol className={styles.list}>
        {data.map(({ title, abstract, href, created_on }, index: number) => (
          <Card
            title={title}
            href={href}
            key={index}
            abstract={abstract}
            created_on={created_on}
          />
        ))}
      </ol>
    </div>
  );
}
