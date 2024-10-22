"use client";
import Image from "next/image";

export default function ClientImage({ ...delegated }) {
  return <Image {...delegated} />;
}
