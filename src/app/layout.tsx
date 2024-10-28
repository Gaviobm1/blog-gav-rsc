import React from "react";
import { raleway, recursive } from "./fonts";
import "./globals.css";
import Wrapper from "@/components/Wrapper/Wrapper";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Modal from "@/components/Modal/Modal";
import { cookies } from "next/headers";
import { links } from "@/data";
import { DarkMode } from "../types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gavin O'Brien",
  icons: { icon: "/images/logo.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = cookies().get("theme");
  function getTheme(): DarkMode {
    return cookie?.value === "light" ? "light" : "dark";
  }
  const theme = getTheme();
  return (
    <html lang="en" data-color-theme={theme}>
      <body className={`${raleway.variable} ${recursive.variable}`}>
        <Wrapper>
          <Header theme={theme} />
          {children}
          <Footer />
        </Wrapper>
      </body>
    </html>
  );
}
