use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;
use crate::presentation::handlers::post_handlers::NewPost;

pub struct UpdatePostUseCase<T: PostRepository> {
    post_service: PostService<T>,
}

impl<T: PostRepository> UpdatePostUseCase<T> {
    pub fn new(post_repo: T) -> Self {
        let post_service = PostService::new(post_repo);
        UpdatePostUseCase {
            post_service
        }
    }

    pub async fn execute(&self, id: i32, new_post: NewPost) -> Result<Option<()>, diesel::result::Error> {
        let existing_post = self.post_service.get_by_id(id).await?;
        if existing_post.is_none() {
            return Ok(None);
        }
        self.post_service.update_post(id, new_post).await?;
        Ok(Some(()))
    }
}
