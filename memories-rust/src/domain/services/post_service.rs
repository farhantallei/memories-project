use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;

#[derive(Clone)]
pub struct PostService<T: PostRepository> {
    post_repo: T,
}

impl <T: PostRepository> PostService<T> {
    pub fn new(post_repo: T) -> Self {
        PostService {
            post_repo
        }
    }

    pub async fn get_all(&self) -> Vec<Post> {
        self.post_repo.find_all().await
    }
}
