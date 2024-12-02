use diesel::result::Error;
use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;

pub struct GetPostsUseCase<T: PostRepository> {
    post_service: PostService<T>,
}

impl<T: PostRepository> GetPostsUseCase<T> {
    pub fn new(post_repo: T) -> Self {
        let post_service = PostService::new(post_repo);
        GetPostsUseCase {
            post_service
        }
    }

    pub async fn get(&self) -> Result<Vec<Post>, Error> {
        self.post_service.get_all().await
    }
}
