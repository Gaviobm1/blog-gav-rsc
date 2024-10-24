import styles from "./TypeArea.module.css";

export default function TypeArea({ label, id, ...delegated }) {
  return (
    <label htmlFor={id} className={styles.wrapper}>
      {label}
      <textarea
        name={id}
        id={id}
        className={styles.content}
        {...delegated}
      ></textarea>
    </label>
  );
}
