use std::time::SystemTime;
use diesel::Queryable;
use serde::Serialize;

#[derive(Debug, Clone, Serialize, Queryable)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub message: String,
    pub creator: String,
    pub tags: Vec<Option<String>>,
    pub selected_file: String,
    pub like_count: Option<i32>,
    pub created_at: Option<SystemTime>,
}
