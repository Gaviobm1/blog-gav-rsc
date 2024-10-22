import localFont from "next/font/local";

const recursive = localFont({
  src: "/fonts/Recursive_VF_1.085.woff2",
  variable: "--recursive",
  weight: "100 900",
});

const raleway = localFont({
  src: [
    { path: "/fonts/RalewayNormal.woff2", weight: "100 900", style: "normal" },
    { path: "/fonts/RalewayItalic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--raleway",
});

export { recursive, raleway };
