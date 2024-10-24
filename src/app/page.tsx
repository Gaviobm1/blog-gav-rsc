import dynamic from "next/dynamic";
import SkeletonCardList from "@/Skeletons/SkeletonCardList/SkeletonCardList";
import { PageSearchParams } from "./types";
import CardListPaginated from "@/components/CardListPaginated/CardListPaginated";

const CardList = dynamic(() => import("@/components/CardList/CardList"), {
  loading: () => <SkeletonCardList />,
});

export default function Home({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  return <CardListPaginated searchParams={searchParams} resultsPerPage={3} />;
}
