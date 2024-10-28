import React, { FormEventHandler } from "react";

export interface S3Params {
  Bucket: string | undefined;
  Key: string | undefined;
}

export type DarkMode = "light" | "dark";

export interface CardProps {
  title: string;
  abstract: string;
  href: string;
  date: string;
}

export interface PostType {
  id: number;
  post: string;
  published: Date;
}

export interface DerivedData {
  id: number;
  title: string;
  href: string;
  abstract: string;
  content: string;
  date: string;
}

export interface PageSearchParams {
  page: string;
}

export interface BlogParam {
  id: number;
}

export interface IconProps {
  href?: string;
  children: React.ReactNode;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: FormEventHandler<HTMLFormElement>;
}
