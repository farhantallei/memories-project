import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import * as v from "valibot";

type Post = {
  id: number;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selected_file: string;
  like_count: number;
  created_at: {
    secs_since_epoch: number;
    nanos_since_epoch: number;
  };
};

export type PostRes = Post;
export type PostReq = Omit<Post, "id" | "like_count" | "created_at">;

export async function getPosts({}: LoaderFunctionArgs) {
  try {
    const posts = await fetch(`${process.env.SERVER_URL}/posts/`);

    if (posts.ok) {
      return (await posts.json()) as Post[];
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

const postSchema = v.object({
  creator: v.pipe(
    v.string("Nama tidak valid"),
    v.nonEmpty("Nama tidak boleh kosong")
  ),
  title: v.pipe(
    v.string("Judul tidak valid"),
    v.nonEmpty("Judul tidak boleh kosong")
  ),
  message: v.pipe(
    v.string("Konten tidak valid"),
    v.nonEmpty("Konten tidak boleh kosong")
  ),
  selected_file: v.pipe(
    v.string("URL Gambar tidak valid"),
    v.url("URL Gambar tidak valid")
  ),
});

export async function createPost({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData.entries());

  const result = v.safeParse(postSchema, updates);

  if (result.success) {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...result.output, tags: [] }),
      });

      if (!response.ok) {
        return ["error"] as const;
      }

      return ["success"] as const;
    } catch (err) {
      console.error(err);
      return ["error"] as const;
    }
  }

  const issues = v.flatten<typeof postSchema>(result.issues);

  const error = {
    creator: issues.nested?.creator,
    title: issues.nested?.title,
    message: issues.nested?.message,
    selected_file: issues.nested?.selected_file,
  };
  return ["error", error] as const;
}