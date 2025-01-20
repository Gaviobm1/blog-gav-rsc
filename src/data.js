import { Home, Mail, Linkedin, User, GitHub, Upload } from "react-feather";

const links = [
  { href: "/", text: "Home", icon: <Home /> },
  { href: "/about", text: "About me", icon: <User /> },
  {
    href: "https://www.linkedin.com/in/gavinobrien90/",
    text: "Linkedin",
    icon: <Linkedin />,
  },
  { href: "https://github.com/Gaviobm1", text: "GitHub", icon: <GitHub /> },
];

export { links };
