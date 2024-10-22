import React from "react";

export interface S3Params {
  Bucket: string | undefined;
  Key: string | undefined;
}

export type DarkMode = "light" | "dark";

export interface CardProps {
  title: string;
  abstract: string;
  href: string;
  created_on: Date;
}
export interface PageSearchParams {
  page: string;
}

export interface BlogParam {
  blogSlug: string;
}

export interface IconProps {
  href?: string;
  children: React.ReactNode;
}
