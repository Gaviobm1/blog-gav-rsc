"use client";
import { Sun, Moon } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DarkModeButton.module.css";
import React from "react";
import { DarkMode } from "@/types/types";
import { setCookie } from "@/helpers/serverActions";

export default function DarkModeButton({ theme }: { theme: DarkMode }) {
  const [mode, setMode] = React.useState(theme);
  React.useEffect(() => {
    setCookie(mode);
  }, [mode]);

  function changeMode() {
    mode === "light" ? setMode("dark") : setMode("light");
  }

  return (
    <button className={styles.wrapper} onClick={changeMode}>
      <AnimatePresence mode="wait">
        {mode === "light" ? (
          <motion.div
            layout
            key="moon"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Moon style={{ margin: "auto" }} />
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              key="sun"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Sun style={{ margin: "auto" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </button>
  );
}
