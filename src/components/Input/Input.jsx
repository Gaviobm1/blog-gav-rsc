import styles from "./Input.module.css";

export default function Input({ label, id, type = "text", ...delegated }) {
  return (
    <label htmlFor={id} className={styles.wrapper}>
      {label}
      <input
        type={type}
        id={id}
        name={id}
        {...delegated}
        className={styles.content}
      />
    </label>
  );
}
