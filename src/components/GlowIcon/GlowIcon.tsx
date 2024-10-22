import Link from "next/link";
import React from "react";
import styles from "./GlowIcon.module.css";
import { IconProps } from "@/app/types";

export default function GlowIcon({ children }: IconProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>{children}</div>
      <div className={`${styles.iconWrapper} ${styles.glowicon}`}>
        {children}
      </div>
    </div>
  );
}
