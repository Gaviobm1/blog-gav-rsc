import { FormEventHandler } from "react";
import styles from "./Form.module.css";
import { FormProps } from "@/app/types";

export default function Form({ children, onSubmit, ...delegated }: FormProps) {
  return (
    <form className={styles.wrapper} onSubmit={onSubmit} {...delegated}>
      {children}
    </form>
  );
}
