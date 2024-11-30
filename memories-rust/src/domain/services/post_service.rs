use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;
use crate::presentation::handlers::post_handlers::NewPost;

#[derive(Clone)]
pub struct PostService<T: PostRepository> {
    post_repo: T,
}

impl<T: PostRepository> PostService<T> {
    pub fn new(post_repo: T) -> Self {
        PostService {
            post_repo
        }
    }

    pub async fn get_all(&self) -> Result<Vec<Post>, diesel::result::Error> {
        self.post_repo.find_all().await
    }

    pub async fn create_post(&self, new_post: NewPost) -> Result<(), diesel::result::Error> {
        self.post_repo.save(&new_post).await
    }
}
