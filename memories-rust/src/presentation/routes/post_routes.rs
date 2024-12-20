use actix_web::web;
use crate::presentation::handlers::post_handlers::{create_post_handler, get_posts_handler, get_post_handler, update_post_handler, delete_post_handler, like_post_handler};

pub fn routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/api/rust/v1/posts")
            .service(get_posts_handler)
            .service(get_post_handler)
            .service(create_post_handler)
            .service(update_post_handler)
            .service(delete_post_handler)
            .service(like_post_handler)
    );
}
