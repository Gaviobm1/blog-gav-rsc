import styles from "./BlogHero.module.css";

export default async function BlogHero({
  date,
  title,
}: {
  date: string;
  title: string;
}) {
  return (
    <div className={styles.wrapper}>
      <section className={styles.glow}></section>
      <section className={styles.hero}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>Published: {date}</p>
      </section>
    </div>
  );
}
