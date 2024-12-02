use actix_web::{delete, get, post, put, web, HttpResponse};
use log::error;
use crate::application::dto::new_post::NewPostDto;
use crate::application::use_cases::create_post::CreatePostUseCase;
use crate::application::use_cases::delete_post::DeletePostUseCase;
use crate::application::use_cases::get_post::GetPostUseCase;
use crate::application::use_cases::get_posts::GetPostsUseCase;
use crate::application::use_cases::update_post::UpdatePostUseCase;
use crate::infrastructure::repositories::postgres_post_repository::PostgresPostRepository;

#[get("")]
pub async fn get_posts_handler(
    repo: web::Data<PostgresPostRepository>
) -> HttpResponse {
    match GetPostsUseCase::new(repo.into_inner())
        .get().await {
        Ok(posts) => HttpResponse::Ok().json(posts),
        Err(_) => {
            error!("Error getting posts!");
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}

#[get("/{id}")]
pub async fn get_post_handler(
    repo: web::Data<PostgresPostRepository>,
    path: web::Path<(i32,)>,
) -> HttpResponse {
    match GetPostUseCase::new(repo.into_inner())
        .get(path.into_inner().0).await {
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

#[post("")]
pub async fn create_post_handler(
    repo: web::Data<PostgresPostRepository>,
    input: web::Json<NewPostDto>,
) -> HttpResponse {
    match CreatePostUseCase::new(repo.into_inner())
        .execute(input.into_inner()).await {
        Ok(_) => HttpResponse::Created().finish(),
        Err(_) => {
            error!("Error creating post!");
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}

#[put("/{id}")]
pub async fn update_post_handler(
    repo: web::Data<PostgresPostRepository>,
    path: web::Path<(i32,)>,
    input: web::Json<NewPostDto>,
) -> HttpResponse {
    match UpdatePostUseCase::new(repo.into_inner())
        .execute(path.into_inner().0, input.into_inner()).await {
        Ok(res) => match res {
            Some(_) => HttpResponse::Ok().finish(),
            None => HttpResponse::NotFound().body("Post not found"),
        },
        Err(_) => {
            error!("Error updating post!");
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}

#[delete("/{id}")]
pub async fn delete_post_handler(
    repo: web::Data<PostgresPostRepository>,
    path: web::Path<(i32,)>,
) -> HttpResponse {
    match DeletePostUseCase::new(repo.into_inner())
        .execute(path.into_inner().0).await {
        Ok(res) => match res {
            Some(_) => HttpResponse::Ok().finish(),
            None => HttpResponse::NotFound().body("Post not found"),
        },
        Err(_) => {
            error!("Error deleting post!");
            HttpResponse::InternalServerError().body("Please try again later")
        }
    }
}
