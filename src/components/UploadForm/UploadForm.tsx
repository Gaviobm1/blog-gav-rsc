import Form from "../Form/Form";
import Input from "../Input/Input";
import TypeArea from "../TypeArea/TypeArea";
import Button from "../Button/Button";
import { createBlogMDX } from "@/helpers/serverActions";

export default function UploadForm() {
  return (
    <Form action={createBlogMDX}>
      <Input id="title" label="Title" />
      <TypeArea id="blogcontent" label="Blog" />
      <Button>Upload</Button>
    </Form>
  );
}
