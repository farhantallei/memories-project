use actix_web::{get, post, web, HttpResponse};
use log::error;
use crate::application::use_cases::get_all_posts::GetAllPostsUseCase;
use crate::infrastructure::repositories::postgres_post_repository::PostgresPostRepository;

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

#[post("/")]
pub async fn create_post_handler(
    // repo: web::Data<()>
) -> HttpResponse {
    HttpResponse::Ok().body("Create post")
}
