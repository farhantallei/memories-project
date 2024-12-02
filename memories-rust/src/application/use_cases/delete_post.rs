use diesel::result::Error;
use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;

pub struct DeletePostUseCase<T: PostRepository> {
    post_service: PostService<T>,
}

impl<T: PostRepository> DeletePostUseCase<T> {
    pub fn new(post_repo: T) -> Self {
        let post_service = PostService::new(post_repo);
        DeletePostUseCase {
            post_service
        }
    }

    pub async fn execute(&self, id: i32) -> Result<Option<()>, Error> {
        self.post_service.delete(id).await
    }
}
