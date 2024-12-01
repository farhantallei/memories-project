use schema::posts;
use actix_web::{get, post, put, web, HttpResponse};
use diesel::{AsChangeset, Insertable};
use log::error;
use serde::Deserialize;
use crate::application::use_cases::create_post::CreatePostUseCase;
use crate::application::use_cases::get_post::GetPostUseCase;
use crate::application::use_cases::update_post::UpdatePostUseCase;
use crate::infrastructure::repositories::postgres_post_repository::PostgresPostRepository;
use crate::schema;

#[get("")]
pub async fn get_all_posts_handler(
    repo: web::Data<PostgresPostRepository>
) -> HttpResponse {
    match GetPostUseCase::new(repo.into_inner())
        .get_all().await {
        Ok(posts) => HttpResponse::Ok().json(posts),
        Err(_) => {
            error!("Error getting posts!");
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}

#[get("/{id}")]
pub async fn get_post_by_id_handler(
    repo: web::Data<PostgresPostRepository>,
    path: web::Path<(i32,)>,
) -> HttpResponse {
    match GetPostUseCase::new(repo.into_inner())
        .get_by_id(path.into_inner().0).await {
        Ok(post) => match post {
            Some(post) => HttpResponse::Ok().json(post),
            None => HttpResponse::NotFound().body("Post not found"),
        },
        Err(_) => {
            error!("Error getting post!");
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}

#[derive(Debug, Clone, Deserialize, Insertable, AsChangeset)]
#[diesel(table_name = posts)]
pub struct NewPost {
    pub title: String,
    pub message: String,
    pub creator: String,
    pub tags: Vec<Option<String>>,
    pub selected_file: String,
}

#[post("")]
pub async fn create_post_handler(
    repo: web::Data<PostgresPostRepository>,
    input: web::Json<NewPost>,
) -> HttpResponse {
    match CreatePostUseCase::new(repo.into_inner())
        .execute(input.into_inner()).await {
        Ok(_) => HttpResponse::Created().finish(),
        Err(ex) => {
            error!("Error creating post! {:?}", ex);
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}

#[put("/{id}")]
pub async fn update_post_handler(
    repo: web::Data<PostgresPostRepository>,
    path: web::Path<(i32,)>,
    input: web::Json<NewPost>,
) -> HttpResponse {
    match UpdatePostUseCase::new(repo.into_inner())
        .execute(path.into_inner().0, input.into_inner()).await {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(ex) => {
            error!("Error updating post! {:?}", ex);
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}
