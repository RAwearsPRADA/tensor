export const signUpSchema = {
    body: {
        type: "object",
        required: ["firstName", "lastName",
            "email", "password", "username", "classNumber", "classSymbol",
            "role"
        ],
        properties: {
            email: {
                type: "string",
                format: "email"
            },
            password: {
                type: "string",
                minLength: 6,
                maxLength: 20,
                pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])"
            },
            role: {
                type: "string",
                enum: ["teacher", "student"]
            },
            classSymbol: {
                minLength: 1,
                maxLength: 1,
                type: "string"
            },
            classNumber: {
                type: "number"
            },
            username: {
                type: "string",
                minLength: 4,
                maxLength: 20
            },
            lastName: {
                type: "string",
                minLength: 2,
            },
            firstName: {
                type: "string",
                minLength: 2
            }
        }
    },
    response: {
        201: {
            type: "object",
            properties: {
                status: {type: "string"},
                message: {type: "string"},
                success: {type: "boolean"},
            }
        },
        500: {
            type: "object",
            properties: {
                status: {type: "string"},
                error: {type: "string"},
                success: {type: "boolean"},
            }
        },
        400: {
            type: "object",
            properties: {
                success: {type: "boolean"},
                field: {type: "string"},
                message: {type: "string"}
            }
        }
    }
}