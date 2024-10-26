"use client";
import React from "react";
import styles from "./ContactForm.module.css";
import Form from "../Form/Form";
import Input from "../Input/Input";
import TypeArea from "../TypeArea/TypeArea";
import Button from "../Button/Button";
import { sendEmail } from "@/helpers/helpers";

export default function ContactForm() {
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
