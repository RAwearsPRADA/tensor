CREATE TYPE "UserRole" AS ENUM ('TEACHER', 'STUDENT');
CREATE TYPE "TestDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TEXT_INPUT');

CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "username" VARCHAR(50) UNIQUE NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT', 
    "classNumber" INT NOT NULL,
    "classSymbol" VARCHAR(1) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_user_username ON "User"("username");
CREATE INDEX idx_user_full_name ON "User" ("lastName", "firstName");

CREATE TABLE "Test" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "difficulty" "TestDifficulty" NOT NULL DEFAULT 'MEDIUM',
    "createdBy" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_test_topic ON "Test"("topic");
CREATE INDEX idx_test_createdBy ON "Test"("createdBy");

CREATE TABLE "Question" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "testId" UUID NOT NULL REFERENCES "Test"("id") ON DELETE CASCADE,
    "content" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL DEFAULT 'TEXT_INPUT', 
    "options" JSONB,
    "correctAnswer" TEXT NOT NULL,
    "explanation" TEXT,
    "orderIndex" INT DEFAULT 0
);
CREATE INDEX idx_question_testId ON "Question"("testId");

CREATE TABLE "TestResult" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "testId" UUID NOT NULL REFERENCES "Test"("id") ON DELETE CASCADE,
    "score" INT NOT NULL,
    "answers" JSONB NOT NULL,
    "completedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_result_userId ON "TestResult"("userId");
CREATE INDEX idx_result_testId ON "TestResult"("testId");