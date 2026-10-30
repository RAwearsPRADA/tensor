interface User {
    id: string
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
}


export interface Student extends User {
    role: "student"
    classNumber: number
    classSymbol: string
}

export interface Teacher extends User {
    role: "teacher"
}
