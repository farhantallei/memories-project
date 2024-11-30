use schema::posts;
use actix_web::{get, post, web, HttpResponse};
use diesel::Insertable;
use log::error;
use serde::Deserialize;
use crate::application::use_cases::create_post::CreatePostUseCase;
use crate::application::use_cases::get_all_posts::GetAllPostsUseCase;
use crate::infrastructure::repositories::postgres_post_repository::PostgresPostRepository;
use crate::schema;

#[get("/")]
pub async fn get_all_posts_handler(
    repo: web::Data<PostgresPostRepository>
) -> HttpResponse {
    match GetAllPostsUseCase::new(repo.into_inner())
        .get_all().await {
        Ok(posts) => HttpResponse::Ok().json(posts),
        Err(_) => {
            error!("Error getting posts!");
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}

#[derive(Debug, Clone, Deserialize, Insertable)]
#[diesel(table_name = posts)]
pub struct NewPost {
    pub title: String,
    pub message: String,
    pub creator: String,
    pub tags: Vec<Option<String>>,
    pub selected_file: String,
}

#[post("/")]
pub async fn create_post_handler(
    repo: web::Data<PostgresPostRepository>,
    input: web::Json<NewPost>,
) -> HttpResponse {
    match CreatePostUseCase::new(repo.into_inner())
        .execute(input.into_inner()).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(ex) => {
            error!("Error creating post! {:?}", ex);
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}
