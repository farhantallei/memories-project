import { PostRes } from "~/services/post";

function Post({ post }: { post: PostRes }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border">
      <div className="flex-shrink-0">
        <img
          src={post.selected_file}
          alt={post.title}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-gray-600 line-clamp-2">{post.message}</p>
      </div>
    </div>
  );
}

export default Post;
