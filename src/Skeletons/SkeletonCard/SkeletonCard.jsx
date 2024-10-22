import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading} />
      <div className={styles.abstract} />
      <div className={styles.explicitlink} />
    </div>
  );
}
