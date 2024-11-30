import { Form } from "@remix-run/react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { LinkIcon } from "lucide-react";

function FormPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <Form className="space-y-2">
      <div>
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Konten</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="imageUrl">URL Gambar</Label>
        <div className="relative">
          <Input
            id="imageUrl"
            type="url"
            value={imageUrl}
            className="peer ps-9"
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <LinkIcon size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>
      <Button type="submit">Buat Post</Button>
    </Form>
  );
}

export default FormPost;
