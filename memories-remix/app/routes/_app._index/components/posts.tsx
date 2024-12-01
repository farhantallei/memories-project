import Post from "~/routes/_app._index/components/post";
import { PostRes } from "~/services/post";

function Posts({ posts }: { posts: PostRes[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
