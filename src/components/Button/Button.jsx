"use client";
import styled from "styled-components";

const SIZES = {
  sm: {
    "--font-size": "1rem",
    "--border-radius": "4px",
    "--box-shadow": "inset 0px -2px 4px hsl(0deg 100% 0% / 0.3)",
  },
  m: {
    "--font-size": "1.5rem",
    "--border-radius": "4px",
    "--box-shadow": "inset 0px -2px 4px hsl(0deg 100% 0% / 0.3)",
  },
  lg: {
    "--font-size": "1.8rem",
    "--border-radius": "8px",
    "--box-shadow": "inset 0px -2px 4px hsl(0deg 100% 0% / 0.3)",
  },
};

export default function Button({ children, size = "m", ...delegated }) {
  const styles = SIZES[size];
  return (
    <Base style={styles} {...delegated}>
      <Clickable>{children}</Clickable>
    </Base>
  );
}

const Clickable = styled.span`
  display: block;
  transform: translateY(-20%);
  background-color: var(--button-clickable);
  margin: -0.5rem;
  border-radius: var(--border-radius);
  padding: 0.5rem;
  transition: transform 600ms;
`;

const Base = styled.button`
  font-size: var(--font-size);
  color: var(--button-text);
  background-color: var(--button-base);
  border: none;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 25%;

  &:hover ${Clickable}, &:focus ${Clickable} {
    transform: translateY(-25%);
    transition: transform 200ms;
  }

  &:active ${Clickable} {
    transform: translateY(-5%);
    transition: transform 200ms;
  }

  &:not(:hover) ${Clickable}, &:not(:focus) ${Clickable} {
    transform: translateY(-20%);
  }
`;
