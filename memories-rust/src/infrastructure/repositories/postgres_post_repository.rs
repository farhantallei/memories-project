use std::env;
use std::sync::Arc;
use async_trait::async_trait;
use diesel::RunQueryDsl;
use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;
use crate::infrastructure::db::connection::{establish_connection, DBPool};
use crate::presentation::handlers::post_handlers::NewPost;
use crate::schema;
use crate::schema::posts::dsl::posts;

#[derive(Clone)]
pub struct PostgresPostRepository {
    pool: DBPool,
}

impl PostgresPostRepository {
    pub fn new() -> Self {
        let database_url = env::var("DATABASE_URL")
            .expect("DATABASE_URL must be set");
        PostgresPostRepository {
            pool: establish_connection(&database_url)
        }
    }
}

#[async_trait]
impl PostRepository for Arc<PostgresPostRepository> {
    async fn find_all(&self) -> Result<Vec<Post>, diesel::result::Error> {
        let result = posts.load::<Post>(&mut self.pool.get().unwrap())?;
        Ok(result)
    }

    async fn save(&self, post: &NewPost) -> Result<(), diesel::result::Error> {
        diesel::insert_into(schema::posts::table)
            .values(post)
            .execute(&mut self.pool.get().unwrap())?;
        Ok(())
    }
}
