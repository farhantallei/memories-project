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

    pub async fn get_all(&self) -> Result<Vec<Post>, diesel::result::Error> {
        self.post_service.get_all().await
    }

    pub async fn get_by_id(&self, id: i32) -> Result<Option<Post>, diesel::result::Error> {
        self.post_service.get_by_id(id).await
    }
}
