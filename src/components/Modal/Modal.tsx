import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "react-feather";
import Link from "next/link";
import styles from "./Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.mobileButton}>
        <Menu />
      </Dialog.Trigger>
      <Dialog.Overlay className={styles.overlay}>
        <Dialog.Content className={styles.menu}>
          <Dialog.Close className={styles.closeButton}>
            <X />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}
