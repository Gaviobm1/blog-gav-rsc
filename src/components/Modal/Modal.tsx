"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "react-feather";
import { usePathname } from "next/navigation";
import styles from "./Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
