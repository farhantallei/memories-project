use crate::application::dto::new_post::NewPostDto;
use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;

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

    pub async fn get_by_id(&self, id: i32) -> Result<Option<Post>, diesel::result::Error> {
        self.post_repo.find_by_id(id).await
    }

    pub async fn create_post(&self, new_post: NewPostDto) -> Result<(), diesel::result::Error> {
        self.post_repo.save(&new_post).await
    }

    pub async fn update_post(&self, id: i32, new_post: NewPostDto) -> Result<(), diesel::result::Error> {
        self.post_repo.update(id, &new_post).await
    }
}
