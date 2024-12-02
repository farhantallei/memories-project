use diesel::result::Error;
use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;

pub struct LikePostUseCase<T: PostRepository> {
    post_service: PostService<T>,
}

impl<T: PostRepository> LikePostUseCase<T> {
    pub fn new(post_repo: T) -> Self {
        let post_service = PostService::new(post_repo);
        Self { post_service }
    }

    pub async fn execute(&self, id: i32) -> Result<Option<()>, Error> {
        self.post_service.like(id).await
    }
}