use async_trait::async_trait;
use crate::domain::entities::post::Post;

#[async_trait]
pub trait PostRepository {
    async fn find_all(&self) -> Vec<Post>;
    // fn find_by_id(&self, id: i32) -> Option<Post>;
    // fn save(&self, post: &NewPost) -> Result<(), diesel::result::Error>;
}
