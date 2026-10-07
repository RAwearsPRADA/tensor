mod shared;
use sqlx::{PgPool, postgres::PgPoolOptions};
use axum::{
    http::{StatusCode, Method},
    routing::post,
    Json, Router,
    Extension,
};
use serde::{ Serialize};
use tower_http::cors::{Any, CorsLayer};
use bcrypt::{hash, DEFAULT_COST};
use shared::models::RegisterRequest;

use crate::shared::models::Role;



#[derive(Serialize)]
struct RegisterResponse {
    message: String,
    success: bool,
    reason: String
}

async fn register_user(
    Extension(pool): Extension<PgPool>,
    Json(payload): Json<RegisterRequest>
) -> Result<(StatusCode, Json<RegisterResponse>), (StatusCode, String)> {
    println!("Someone wants to register");


    if let Err(error) = payload.validate() {
        return Err((StatusCode::BAD_REQUEST, error.into())) 
    }

    let existing_user = sqlx::query!(
        r#"
        SELECT "username", "email" FROM "User"
        WHERE "username" = $1 or "email" = $2
        "#,
        payload.username,
        payload.email
    )
    .fetch_optional(&pool)
    .await;

    match existing_user {
        Ok(Some(user)) => {
            if user.username == payload.username {
                return Err((StatusCode::BAD_REQUEST, "User with this username already exists".into()));
            }
            if user.email == payload.email {
                return Err((StatusCode::BAD_REQUEST, "User with this email already exists".into()));
            }
        }
        Ok(None) => {
            
        }
        Err(_) => {
            return Err((StatusCode::INTERNAL_SERVER_ERROR, "Database verification failed".into()));
        }
    }

    let hashed_password = match hash(&payload.password, DEFAULT_COST) {
        Ok(h) => h,
        Err(_) => return Err((StatusCode::INTERNAL_SERVER_ERROR, "Failed to hash password".into())),
    };

    println!("{hashed_password}");

    let class_number = match payload.role {
        Role::Teacher => 0,
        Role::Student => payload.class_number.unwrap_or(0)
    };

    let class_symbol = match payload.role {
        Role::Teacher => "-".into(),
        Role::Student => payload.class_symbol.unwrap_or_else(|| "-".into())
    };

    let db_query = sqlx::query!(
        r#"
        INSERT INTO "User" ("username", "email", "firstName", "lastName", "role", "classNumber", "classSymbol", "password")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        "#,
        payload.username,
        payload.email,
        payload.first_name,
        payload.last_name,
        payload.role as Role,
        class_number as i32,
        class_symbol,
        hashed_password


    )
    .execute(&pool)
    .await;
    
    match db_query {
        Ok(_) => {
            let response = RegisterResponse {
                message: "User has been registered".into(),
                success: true,
            };
            return Ok((StatusCode::CREATED, Json(response)));
        },
        Err(error) => {
            println!("{error}");
            return Err((StatusCode::INTERNAL_SERVER_ERROR, "Database query failed".into()));
        }
    }
    
}

#[tokio::main]
async fn main() {
    println!("Server started on 8080 port!");
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgresql://postgres:%40dmin@localhost:5432/tensor".into());

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to DB");

    let cors = CorsLayer::new()
        .allow_methods([Method::POST])
        .allow_origin(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/auth/sign_up", post(register_user))
        .layer(Extension(pool))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080").await.expect("Failed to create TcpListener");

    axum::serve(listener, app).await.expect("Failed to start server");
}