import CardList from "../CardList/CardList";
import PageButtons from "../PageButtons/PageButtons";
import React, { Suspense } from "react";
import styles from "./CardListPaginated.module.css";
import { PageSearchParams, PostType } from "@/app/types";
import { getPostCount, getAllPosts } from "@/helpers/serverActions";

export default async function CardListPaginated({
  searchParams,
  resultsPerPage,
}: {
  searchParams: PageSearchParams;
  resultsPerPage: number;
}) {
  const current = Number(searchParams.page) || 1;
  const toSkip = (current - 1) * resultsPerPage;
  const [postCount, posts] = await Promise.all([
    getPostCount(),
    getAllPosts(toSkip, resultsPerPage),
  ]);

  const pages = Math.ceil(postCount / resultsPerPage);

  return (
    <div className={styles.wrapper}>
      <CardList cardData={posts} />
      {pages > 1 && <PageButtons current={current} pages={pages} />}
    </div>
  );
}
