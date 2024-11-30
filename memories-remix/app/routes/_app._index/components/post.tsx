function Post() {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
      <div className="flex-shrink-0">
        <img
          src="https://kzmn748xy52wgcdf5gz8.lite.vusercontent.net/placeholder.svg?height=100&width=100"
          alt="title"
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Title</h2>
        <p className="text-gray-600 line-clamp-2">Message</p>
      </div>
    </div>
  );
}

export default Post;
