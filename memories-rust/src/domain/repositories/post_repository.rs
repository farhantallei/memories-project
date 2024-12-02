use async_trait::async_trait;
use crate::application::dto::new_post::NewPostDto;
use crate::domain::entities::post::Post;

#[async_trait]
pub trait PostRepository {
    async fn find_all(&self) -> Result<Vec<Post>, diesel::result::Error>;
    async fn find_by_id(&self, input_id: i32) -> Result<Option<Post>, diesel::result::Error>;
    async fn save(&self, post: &NewPostDto) -> Result<(), diesel::result::Error>;
    async fn update(&self, input_id: i32, post: &NewPostDto) -> Result<(), diesel::result::Error>;
}
