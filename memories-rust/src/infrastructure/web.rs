use actix_web::{web, App, HttpServer};
use actix_web::middleware::Logger;
use log::info;
use crate::infrastructure::repositories::postgres_post_repository::PostgresPostRepository;
use crate::presentation::routes;

pub async fn run() -> std::io::Result<()> {
    // let database_url = std::env::var("DATABASE_URL")
    //     .expect("DATABASE_URL must be set");
    // let pool = establish_connection(&database_url);

    let post_repo = PostgresPostRepository::new();
    let app_data = web::Data::new(post_repo);

    info!("Starting...!");

    HttpServer::new(move || {
        App::new()
            .app_data(app_data.clone())
            .wrap(Logger::default())
            .route("/", web::get().to(|| async { "Memories API" }))
            .configure(routes::post_routes::routes)
        // .configure(routes::user_routes::routes)
    })
        .bind("0.0.0.0:4000")?
        .run()
        .await
}
