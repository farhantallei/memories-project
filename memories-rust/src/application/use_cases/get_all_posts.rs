use diesel::result::Error;
use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;

pub struct GetAllPostsUseCase<T: PostRepository> {
    post_service: PostService<T>,
}

impl <T: PostRepository> GetAllPostsUseCase<T> {
    pub fn new(post_repo: T) -> Self {
        let post_service = PostService::new(post_repo);
        GetAllPostsUseCase {
            post_service
        }
    }

    pub async fn get_all(&self) -> Result<Vec<Post>, Error> {
        let posts = self.post_service.get_all().await;
        Ok(posts)
    }
}
