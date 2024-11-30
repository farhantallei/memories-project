# Preview

## Build
1. Start postgres: `docker-compose up -d`
2. Run: `cargo build`
3. Migrate: `diesel migration run`

## Run
`cargo run --color=always --profile dev --package memories-rust --bin memories-rust`

## Test
`cargo test`
