export const authSchema = {
    body: {
        type: "object",
        required: ["login", "password"],
        properties: {
            login: {
                type: "string",
                minLength: 4
            },
            password: {
                minLength: 6,
                type: "string",
                pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])",
                
            }
        }
    }
}