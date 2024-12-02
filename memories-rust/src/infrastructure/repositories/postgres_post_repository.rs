use std::env;
use std::sync::Arc;
use async_trait::async_trait;
use diesel::{ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl};
use crate::application::dto::new_post::NewPostDto;
use crate::domain::entities::post::Post;
use crate::domain::repositories::post_repository::PostRepository;
use crate::infrastructure::db::connection::{establish_connection, DBPool};
use crate::schema;
use crate::schema::posts::dsl::*;

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
        let result = posts
            .order(created_at.desc())
            .load::<Post>(&mut self.pool.get().unwrap())?;
        Ok(result)
    }

    async fn find_by_id(&self, input_id: i32) -> Result<Option<Post>, diesel::result::Error> {
        let result = posts
            .find(input_id)
            .first::<Post>(&mut self.pool.get().unwrap())
            .optional()
            .expect("Error loading post");
        Ok(result)
    }

    async fn save(&self, post: &NewPostDto) -> Result<(), diesel::result::Error> {
        diesel::insert_into(schema::posts::table)
            .values(post)
            .execute(&mut self.pool.get().unwrap())?;
        Ok(())
    }

    async fn update(&self, input_id: i32, post: &NewPostDto) -> Result<(), diesel::result::Error> {
        diesel::update(posts.find(input_id))
            .set(post)
            .execute(&mut self.pool.get().unwrap())?;
        Ok(())
    }
}
