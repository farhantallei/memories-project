use diesel::result::Error;
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

    pub async fn get_all(&self) -> Result<Vec<Post>, Error> {
        self.post_repo.find_all().await
    }

    pub async fn get_by_id(&self, id: i32) -> Result<Option<Post>, Error> {
        self.post_repo.find_by_id(id).await
    }

    pub async fn create(&self, new_post: NewPostDto) -> Result<(), Error> {
        self.post_repo.save(&new_post).await
    }

    pub async fn update(&self, id: i32, new_post: NewPostDto) -> Result<Option<()>, Error> {
        self.post_repo.update(id, &new_post).await
    }

    pub async fn delete(&self, id: i32) -> Result<Option<()>, Error> {
        self.post_repo.delete(id).await
    }

    pub async fn like(&self, id: i32) -> Result<Option<()>, Error> {
        self.post_repo.like(id).await
    }
}
