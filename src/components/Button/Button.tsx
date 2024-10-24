import styles from "./Button.module.css";

export default function Button({
  children,
  type = "submit",
}: {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset" | undefined;
}) {
  return (
    <div className={styles.btnWrapper}>
      <button className={`${styles.btn} ${styles.glow}`} />
      <button type={type} className={styles.btn}>
        {children}
      </button>
    </div>
  );
}
