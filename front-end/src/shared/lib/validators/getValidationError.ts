export function getValidationError(field: string) {
    switch (field) {
        case "firstName":
            return "First name can't be empty"
        
        case "lastName":
            return "Last name can't be empty"

        case "email":
            return "Incorrect email"
        
        case "username":
            return "Username too short. 4 chars min"

        case ""
        
    }
}