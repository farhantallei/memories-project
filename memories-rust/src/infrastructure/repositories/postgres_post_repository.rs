use std::env;
use std::sync::Arc;
use async_trait::async_trait;
use diesel::RunQueryDsl;
use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;
use crate::infrastructure::db::connection::{establish_connection, DBPool};
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
    async fn find_all(&self) -> Vec<Post> {
        posts.load::<Post>(&mut self.pool.get().unwrap())
            .expect("Error loading posts")
    }
}
