use serde::Deserialize;

#[derive(Deserialize, PartialEq, Debug, sqlx::Type, Clone)]
#[sqlx(type_name = "\"UserRole\"", rename_all = "UPPERCASE")]
#[serde(rename_all = "lowercase")]
pub enum Role {
    Teacher,
    Student,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct RegisterRequest {
    pub first_name: String,
    pub last_name: String,
    pub class_number: Option<u8>,
    pub class_symbol: Option<String>,
    pub role: Role,
    pub username: String,
    pub email: String,
    pub password: String
}


impl RegisterRequest {
    const NUMBERS: &'static str = "1234567890";
    const SPECIAL_SYMBOLS: &'static str = "!@#$%^&*()_+=/.,<>?'\"|[]{}~";


    pub fn validate(&self) -> Result<(), String> {
        
        if self.username.trim().len() < 3 {
            return Err("Username has to contain at least 3 symbols".into());
        }

        if self.first_name.trim().len() < 2 {
            return Err("Name is too short".into());
        }

        if self.last_name.trim().len() < 2 {
            return Err("Last name is too short".into());
        }

        if !self.email.contains('@') {
            return Err("Incorrect email".into());
        }
        match self.role {
            Role::Student => {
                if self.class_number.is_none() {
                    return Err("Class number can't be absent".into());
                }
                if let Some(class_symbol) = &self.class_symbol {
                    if class_symbol.trim().is_empty() {
                        return Err("Class symbol can't be empty".into());
                    }
                } else {
                    return Err("Class symbol can't be empty".into());
                }
            },
            Role::Teacher => {

            }
        }
        if !self.validate_password() {
            return Err("Weak password".into());
        }

        Ok(())
    }

    pub fn validate_password(&self) -> bool {

        if self.password.trim().len() < 7 {
            return false;
        }
        let has_number = self.password.chars().any(|c| Self::NUMBERS.contains(c));
        let has_special_symbol = self.password.chars().any(|c| Self::SPECIAL_SYMBOLS.contains(c));


        return has_number && has_special_symbol;
    }
}