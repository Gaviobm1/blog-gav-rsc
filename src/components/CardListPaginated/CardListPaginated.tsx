import CardList from "../CardList/CardList";
import PageButtons from "../PageButtons/PageButtons";
import React, { Suspense } from "react";
import styles from "./CardListPaginated.module.css";
import { PageSearchParams } from "@/app/types";
import { prisma } from "../../../db/clients";
import { getPostCount, getBlogList } from "@/helpers/serverActions";

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
    getBlogList(toSkip, resultsPerPage),
  ]);

  const pages = Math.ceil(postCount / resultsPerPage);

  return (
    <div className={styles.wrapper}>
      <CardList data={posts} />
      {pages > 1 && <PageButtons current={current} pages={pages} />}
    </div>
  );
}
