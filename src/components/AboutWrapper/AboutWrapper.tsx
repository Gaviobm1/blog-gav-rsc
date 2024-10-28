import React from "react";
import styles from "./AboutWrapper.module.css";

export default function AboutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.wrapper}>{children}</div>;
}
