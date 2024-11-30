use actix_web::web;
use crate::presentation::handlers::post_handlers::{create_post_handler, get_all_posts_handler};

pub fn routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/api/rust/v1/posts")
            .service(get_all_posts_handler)
            .service(create_post_handler)
    );
}
