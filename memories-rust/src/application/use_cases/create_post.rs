use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;
use crate::presentation::handlers::post_handlers::NewPost;

pub struct CreatePostUseCase<T: PostRepository> {
    post_service: PostService<T>,
}

impl<T: PostRepository> CreatePostUseCase<T> {
    pub fn new(post_repo: T) -> Self {
        let post_service = PostService::new(post_repo);
        CreatePostUseCase {
            post_service
        }
    }

    pub async fn execute(&self, new_post: NewPost) -> Result<(), diesel::result::Error> {
        self.post_service.create_post(new_post).await
    }
}