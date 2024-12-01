import { PostRes } from "~/services/post";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "~/components/ui/badge";
import {
  EditIcon,
  TagIcon,
  ThumbsUpIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";

function Post({ post }: { post: PostRes }) {
  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <img
        src={post.selected_file}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-4">{post.message}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <UserIcon size={16} className="text-gray-500" />
          <span className="ml-2 text-gray-600">{post.creator}</span>
        </div>
        <div className="flex flex-wrap">
          {post.tags.map((tag, index) => (
            <Badge key={index} className="mr-2 mb-2" variant="secondary">
              <TagIcon size={12} className="mr-1" /> {tag}
            </Badge>
          ))}
        </div>
      </div>
      <small className="text-gray-500">
        {formatDistanceToNow(
          new Date(post.created_at.secs_since_epoch * 1000),
          { addSuffix: true }
        )}
      </small>
      <div className="mt-4 flex justify-between space-x-2">
        <Button className="py-0 pe-0" variant="outline">
          <ThumbsUpIcon
            className="me-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Like
          <span className="relative ms-3 inline-flex h-full items-center justify-center rounded-full px-3 text-xs font-medium text-muted-foreground before:absolute before:inset-0 before:left-0 before:w-px before:bg-input">
            {post.like_count}
          </span>
        </Button>
        <div className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse ml-auto">
          <Button
            className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
            variant="outline"
            size="icon"
            aria-label="Edit"
          >
            <EditIcon size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
          <Button
            className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
            variant="outline"
            size="icon"
            aria-label="Delete"
          >
            <Trash2Icon size={16} strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Post;
