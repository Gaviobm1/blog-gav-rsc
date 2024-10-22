import BlogPage from "@/components/BlogPage/BlogPage";
import { BlogParam } from "../../types";

export default function BlogPost({ params }: { params: BlogParam }) {
  const blogSlug = params?.blogSlug || "";
  return <BlogPage file={blogSlug} />;
}
