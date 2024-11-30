pub mod infrastructure;
pub mod presentation;
pub mod application;
pub mod domain;
pub mod schema;

use dotenv::dotenv;
use env_logger::Env;
use crate::infrastructure::web::run;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();
    run().await
}
