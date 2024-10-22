import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "react-feather";
import Link from "next/link";
import styles from "./Modal.module.css";

export default function Modal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.mobileButton}>
        <Menu />
      </Dialog.Trigger>
      <Dialog.Overlay className={styles.overlay}>
        <Dialog.Content>
          <Dialog.Close className={styles.mobileButton}>
            <X />
          </Dialog.Close>
          <Link href="/contact">Get in touch</Link>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}
