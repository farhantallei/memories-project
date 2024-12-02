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

export const actions = {
  CREATE_POST: "create-post",
  DELETE_POST: "delete-post",
  UPDATE_POST: "update-post",
}

export async function getPosts() {
  try {
    const posts = await fetch(`${process.env.SERVER_URL}/posts`);

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
    v.trim(),
    v.nonEmpty("Nama tidak boleh kosong")
  ),
  title: v.pipe(
    v.string("Judul tidak valid"),
    v.trim(),
    v.nonEmpty("Judul tidak boleh kosong")
  ),
  message: v.pipe(
    v.string("Konten tidak valid"),
    v.trim(),
    v.nonEmpty("Konten tidak boleh kosong")
  ),
  tags: v.pipe(
    v.string("Tag tidak valid"),
    v.trim(),
    v.transform((v) =>
      v
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    )
  ),
  selected_file: v.pipe(
    v.string("URL Gambar tidak valid"),
    v.trim(),
    v.url("URL Gambar tidak valid")
  ),
});

export async function createPost(data: { [p: string]: FormDataEntryValue }) {
  const result = v.safeParse(postSchema, data);

  if (result.success) {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.output),
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
    tags: issues.nested?.tags,
    selected_file: issues.nested?.selected_file,
  };
  return ["error", error] as const;
}

export async function updatePost(data: { [p: string]: FormDataEntryValue }) {
  if (!data.id) {
    return ["error"] as const;
  }

  const result = v.safeParse(postSchema, data);

  if (result.success) {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/posts/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result.output),
        }
      );

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
    tags: issues.nested?.tags,
    selected_file: issues.nested?.selected_file,
  };
  return ["error", error] as const;
}

export async function deletePost(data: { [p: string]: FormDataEntryValue }) {
  if (!data.id) {
    return ["error"] as const;
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/posts/${data.id}`, {
      method: "DELETE",
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
