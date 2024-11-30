use async_trait::async_trait;
use crate::domain::entities::post::Post;
use crate::presentation::handlers::post_handlers::NewPost;

#[async_trait]
pub trait PostRepository {
    async fn find_all(&self) -> Result<Vec<Post>, diesel::result::Error>;
    // fn find_by_id(&self, id: i32) -> Option<Post>;
    async fn save(&self, post: &NewPost) -> Result<(), diesel::result::Error>;
}
