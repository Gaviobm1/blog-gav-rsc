import BlogPage from "@/components/BlogPage/BlogPage";
import { BlogParam } from "../../../types";

export default function BlogPost({ params }: { params: BlogParam }) {
  const id = params?.id || 0;
  return <BlogPage id={id} />;
}
