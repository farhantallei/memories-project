use diesel::result::Error;
use crate::application::dto::new_post::NewPostDto;
use crate::domain::repositories::post_repository::PostRepository;
use crate::domain::services::post_service::PostService;

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

    pub async fn execute(&self, id: i32, new_post: NewPostDto) -> Result<Option<()>, Error> {
        self.post_service.update(id, new_post).await
    }
}
