"use client";
import React from "react";
import styles from "./ContactForm.module.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import TypeArea from "../TypeArea/TypeArea";
import Button from "../Button/Button";
import emailjs from "@emailjs/browser";
import { redirect } from "next/navigation";

export default function ContactForm() {
  async function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
    });
    const subject = formData.get("subject");
    const user_name = formData.get("user_name");
    const user_email = formData.get("user_email");
    const message = formData.get("message");

    const params = {
      subject,
      user_name,
      user_email,
      message,
    };
    try {
      await emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "",
          params
        )
        .then((data) => {
          console.log(`Successfully sent: ${data.status} ${data.text}`);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
      redirect("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form onSubmit={sendEmail}>
      <Input
        id="subject"
        label="Subject"
        placeholder="Possible collaboration"
      />
      <Input id="user_name" label="Name" placeholder="Juan Sánchez" />
      <Input
        id="user_email"
        label="Your Email"
        placeholder="juan@awesome.net"
        type="email"
      />
      <TypeArea
        id="message"
        label="Message"
        placeholder="Hi! I'm getting in touch because..."
      />
      <Button type="submit">Send</Button>
    </Form>
  );
}
