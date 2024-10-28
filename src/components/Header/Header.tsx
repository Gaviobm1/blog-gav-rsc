import Link from "next/link";
import styles from "./Header.module.css";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import Modal from "@/components/Modal/Modal";
import HeaderLink from "../HeaderLink/HeaderLink";
import { links } from "@/data";
import { DarkMode } from "@/types/types";

export default function Header({ theme }: { theme: DarkMode }) {
  return (
    <nav className={styles.headerNav}>
      <div className={styles.navWrapper}>
        <Link href="/">
          <span className={styles.logo}>Gavin O&apos;Brien</span>
        </Link>
        <div className={styles.desktopWrapper}>
          <DarkModeButton theme={theme} />
          {links.map(({ href, text }) => {
            return (
              <HeaderLink href={href} key={href}>
                {text}
              </HeaderLink>
            );
          })}
        </div>
        <div className={styles.tabletWrapper}>
          <DarkModeButton theme={theme} />
          {links.map(({ href, icon }) => {
            return (
              <HeaderLink href={href} key={href}>
                {icon}
              </HeaderLink>
            );
          })}
        </div>
        <div className={styles.mobileWrapper}>
          <DarkModeButton theme={theme} />
          <Modal>
            {links.map(({ href, text, icon }) => {
              return (
                <HeaderLink href={href} key={href}>
                  {icon}
                  {text}
                </HeaderLink>
              );
            })}
          </Modal>
        </div>
      </div>
    </nav>
  );
}
