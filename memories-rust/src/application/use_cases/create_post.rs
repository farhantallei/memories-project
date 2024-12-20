use diesel::result::Error;
use crate::application::dto::new_post::NewPostDto;
use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;

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

    pub async fn execute(&self, new_post: NewPostDto) -> Result<(), Error> {
        self.post_service.create(new_post).await
    }
}