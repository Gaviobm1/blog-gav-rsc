import dynamic from "next/dynamic";
import SkeletonCardList from "@/Skeletons/SkeletonCardList/SkeletonCardList";
import { posts } from "@/data";
import { PageSearchParams } from "./types";

const CardList = dynamic(() => import("@/components/CardList/CardList"), {
  loading: () => <SkeletonCardList />,
});

export default function Home({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  return <CardList data={posts} />;
}
