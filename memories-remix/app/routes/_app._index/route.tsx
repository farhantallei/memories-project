import React from "react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import Posts from "~/routes/_app._index/components/posts";
import FormPost from "~/routes/_app._index/components/form-post";
import { useLoaderData } from "@remix-run/react";
import {
  actions,
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "~/services/post";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { _action, ...data } = Object.fromEntries(formData);

  switch (_action) {
    case actions.CREATE_POST:
      return await createPost(data);
    case actions.DELETE_POST:
      return await deletePost(data);
    case actions.UPDATE_POST:
      return await updatePost(data);
    case actions.LIKE_POST:
      return await likePost(data);
  }
}

export async function loader() {
  return await getPosts();
}

function Route() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8">
      <div className="md:w-2/3">
        <Posts posts={data} />
      </div>
      <div className="md:w-1/3">
        <FormPost />
      </div>
    </div>
  );
}

export default Route;
