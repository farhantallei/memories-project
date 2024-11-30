import React from "react";
import type { MetaFunction } from "@remix-run/node";
import Posts from "~/routes/_app._index/components/posts";
import FormPost from "~/routes/_app._index/components/form-post";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function Route() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-8">
      <div className="md:w-2/3">
        <Posts />
      </div>
      <div className="md:w-1/3">
        <FormPost />
      </div>
    </div>
  );
}

export default Route;
