use diesel::result::Error;
use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;

pub struct GetPostUseCase<T: PostRepository> {
    post_service: PostService<T>,
}

impl<T: PostRepository> GetPostUseCase<T> {
    pub fn new(post_repo: T) -> Self {
        let post_service = PostService::new(post_repo);
        GetPostUseCase {
            post_service
        }
    }

    pub async fn get(&self, id: i32) -> Result<Option<Post>, Error> {
        self.post_service.get_by_id(id).await
    }
}
