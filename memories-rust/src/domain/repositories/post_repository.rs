use async_trait::async_trait;
use diesel::result::Error;
use crate::application::dto::new_post::NewPostDto;
use crate::domain::entities::post::Post;

#[async_trait]
pub trait PostRepository {
    async fn find_all(&self) -> Result<Vec<Post>, Error>;
    async fn find_by_id(&self, input_id: i32) -> Result<Option<Post>, Error>;
    async fn save(&self, post: &NewPostDto) -> Result<(), Error>;
    async fn update(&self, input_id: i32, post: &NewPostDto) -> Result<Option<()>, Error>;
    async fn delete(&self, input_id: i32) -> Result<Option<()>, Error>;
}
