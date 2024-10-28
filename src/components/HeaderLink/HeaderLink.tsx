import React from "react";
import Link from "next/link";
import styles from "./HeaderLink.module.css";

export default function HeaderLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className={styles.mobileLink}>
      {children}
    </Link>
  );
}
