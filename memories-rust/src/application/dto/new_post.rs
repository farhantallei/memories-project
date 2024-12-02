use crate::schema::posts;
use diesel::{AsChangeset, Insertable};
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize, Insertable, AsChangeset)]
#[diesel(table_name = posts)]
pub struct NewPostDto {
    pub title: String,
    pub message: String,
    pub creator: String,
    pub tags: Vec<Option<String>>,
    pub selected_file: String,
}
