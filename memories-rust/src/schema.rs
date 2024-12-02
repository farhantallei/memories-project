// @generated automatically by Diesel CLI.

diesel::table! {
    posts (id) {
        id -> Int4,
        title -> Text,
        message -> Text,
        creator -> Text,
        tags -> Array<Nullable<Text>>,
        selected_file -> Text,
        like_count -> Int4,
        created_at -> Timestamp,
    }
}
