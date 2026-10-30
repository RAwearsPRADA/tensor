import Fastify, {type FastifyError, type FastifyRequest, type FastifyReply } from "fastify"
import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt"
import cors from "@fastify/cors"
import fastifyPostgres from "@fastify/postgres"
import { signUpSchema } from "./schemas/reg.schema";
import bcrypt from "bcrypt"
import type { Teacher, Student } from "./types/User";
import { request } from "node:http"


const saltRounds = 6
const fastify = Fastify({
    logger: false
})


fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    hook: "onRequest"
})
fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!
})
await fastify.register(cors, {
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
})

fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch {
        reply.status(401).send({error: "Unauthorized"})
    }
})

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any
    }
}

fastify.setErrorHandler((error: FastifyError, request, reply) => {
    if (error.validation) {
        const firstError = error.validation[0]


        let fieldName = ""
        if (firstError.instancePath) {
            fieldName = firstError.instancePath.replace(/^\//, "")
        } else if (firstError.params && firstError.params.missingProperty) {
            fieldName = (firstError.params as {missingProperty: string}).missingProperty
        }
        return reply.status(400).send({
            success: false,
            message: "Failed to validate data",
            field: fieldName
        })
    }
    return reply.status(500).send({
        success: false,
        message: "INTERNAL SERVER ERROR",
        field: ""
    })
})


await fastify.register(fastifyPostgres, {
    connectionString: "postgresql://postgres:%40dmin@localhost:5432/tensor"
})


fastify.post("/api/auth/sign_up", {schema: signUpSchema}, async (request, reply) => {
    const body = request.body as Teacher | Student
    const hashedPassword = await bcrypt.hash(body.password, saltRounds)
    try {
        if (body.role === "student") {
            const {classNumber, classSymbol, username, email, firstName, lastName, role} = body
            const query = await fastify.pg.query(
                `INSERT INTO "User" ("username", "email", "firstName", "lastName", "role", "password", "classSymbol", "classNumber")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [username, email, firstName, lastName, role.toUpperCase(), hashedPassword, classSymbol, classNumber]
            )
        } else {
            const {username, email, firstName, lastName, role} = body
            const query = await fastify.pg.query(
                `INSERT INTO "User" ("username", "email", "firstName", "lastName", "role", "password", "classSymbol", "classNumber")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [username, email, firstName, lastName, role.toUpperCase(), hashedPassword, "-", 0])
        }
        return reply.code(201).send({
            status: "Ok",
            message: "User has been successfully registered",
            success: true
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.code === "23505") {
            const start = err.detail.indexOf("(") + 1
            const end = err.detail.indexOf(")", start)
            const conflictField = err.detail.slice(start, end)
            return reply.code(400).send({
                success: false,
                message: `User with this ${conflictField} already exists`,
                field: conflictField
            })
        }
        fastify.log.error(err);
        return reply.code(500).send({status: "Error", error: "INTERNAL ERROR", success: false})
    }
})

fastify.post("/api/auth/log_in", async (request, reply) => {
    const {login, password} = request.body as {login: string, password: string}
    const isEmail = login.includes("@")
    const searchField = isEmail? "email": "username"

    const query = await fastify.pg.query<{id: string, role: string, password: string, username: string, firstName: string, lastName: string}>(
        `SELECT "id", "firstName", "lastName", "username", "role", "password" FROM "User" WHERE ${searchField} = $1`,
        [login]
    )
    if (!query.rows[0]) {
        return reply.status(404).send({
            success: false,
            message: "Such user doesn't exist"
        })
    }
    const isValid = await bcrypt.compare(password, query.rows[0].password)

    if (!isValid) {
        return reply.status(401).send({
            success: false,
            message: "Incorrect password or login"
        })
    }
    
    const {id, role, password: hashedPassword} = query.rows[0]
    const token = fastify.jwt.sign(
        {id, role},
        {expiresIn: '30d'}
    )
    return reply.setCookie('tensor-token', token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
        signed: true,
    }).code(200).send({
        success: true,
        message: "Successful authorization",
        user: {id, role}
    })
})

fastify.get("/api/me", async (request, reply) =>  {
    const cookie = request.unsignCookie(request.cookies["tensor-token"] || "")
    console.log(cookie)
    if (!cookie.valid || !cookie.value) {
        return reply.status(401).send({
            success: false,
            message: "Unauthorized"
        })
    }
    try {
        const decoded = fastify.jwt.verify<{id: string, role: string}>(cookie.value)

        const query = await fastify.pg.query(`SELECT "id", "username", "firstName", "lastName", "email", "role", "classSymbol", "classNumber" FROM "User"
            WHERE "id" = $1`,
            [decoded.id])

        if (!query.rows[0]) {
            return reply.status(404).send({success: false, message: "Not found"})
        }
        return reply.status(200).send({
            success: true,
            user: query.rows[0]
        })
    } catch  {
        return reply.status(401).send({success: false, message: "Invalid token"})
    }
})

const start = async () => {
    try {
        await fastify.listen({port: process.env.PORT || 1080, host: "127.0.0.1"});
    } catch (err) {
        console.log(err)
    }
}

start();