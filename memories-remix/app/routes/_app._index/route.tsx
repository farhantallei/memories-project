import React from "react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import Posts from "~/routes/_app._index/components/posts";
import FormPost from "~/routes/_app._index/components/form-post";
import { useLoaderData } from "@remix-run/react";
import { createPost, getPosts } from "~/services/post";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action(args: ActionFunctionArgs) {
  return await createPost(args);
}

export async function loader(args: LoaderFunctionArgs) {
  return await getPosts(args);
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
