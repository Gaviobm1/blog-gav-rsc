import React from "react";
import Link from "next/link";
import styles from "./MobileLink.module.css";

export default function MobileLink({
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
