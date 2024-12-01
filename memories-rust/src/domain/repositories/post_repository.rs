use async_trait::async_trait;
use crate::domain::entities::post::Post;
use crate::presentation::handlers::post_handlers::NewPost;

#[async_trait]
pub trait PostRepository {
    async fn find_all(&self) -> Result<Vec<Post>, diesel::result::Error>;
    async fn find_by_id(&self, input_id: i32) -> Result<Option<Post>, diesel::result::Error>;
    async fn save(&self, post: &NewPost) -> Result<(), diesel::result::Error>;
    async fn update(&self, input_id: i32, post: &NewPost) -> Result<(), diesel::result::Error>;
}
