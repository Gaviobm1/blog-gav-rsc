import styles from "./BlogTypeArea.module.css";

export default function BlogTypeArea({ label, id, ...delegated }) {
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
