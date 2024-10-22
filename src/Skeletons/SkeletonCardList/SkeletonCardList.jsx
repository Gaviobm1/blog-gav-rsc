import SkeletonCard from "../SkeletonCard/SkeletonCard";
import styles from "./SkeletonCardList.module.css";
import { range } from "@/helpers/helpers";

export default function SkeletonCardList() {
  return (
    <div className={styles.wrapper}>
      {range(1, 3).map((num) => (
        <SkeletonCard key={num} />
      ))}
    </div>
  );
}
