import Link from "next/link";
import styles from "./Header.module.css";
import { Mail, Linkedin, User, GitHub, Upload } from "react-feather";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import Modal from "@/components/Modal/Modal";
import { DarkMode } from "@/app/types";

export default function Header({ theme }: { theme: DarkMode }) {
  return (
    <nav className={styles.headernav}>
      <div className={styles.navWrapper}>
        <Link href="/" className={styles.navlink}>
          <span className={styles.logo}>Gavin O&apos;Brien</span>
        </Link>
        <div className={styles.buttonWrapper}>
          <DarkModeButton theme={theme} />
          <Link href="/contact" className={styles.iconWrapper}>
            <Mail />
          </Link>
          <Link href="/about" className={styles.iconWrapper}>
            <User />
          </Link>
          <Link
            href="https://www.linkedin.com/in/gavinobrien90/"
            className={styles.iconWrapper}
          >
            <Linkedin />
          </Link>
          <Link
            href="https://github.com/Gaviobm1"
            className={styles.iconWrapper}
          >
            <GitHub />
          </Link>
          <Link href="/upload" className={styles.iconWrapper}>
            <Upload />
          </Link>
        </div>

        <div className={styles.mobileWrapper}>
          <DarkModeButton theme={theme} />
          <Modal />
        </div>
      </div>
    </nav>
  );
}
