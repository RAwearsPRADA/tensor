import { brand } from "./brand"


export const en = {
    header: {
        brand,
        login: "Log In",
        signup: "Sign Up",
    },
    hero: {
        badge: "Developed by RAwearsPRADA",
        title: "Math without\n stress or cramming",
        subtitle: "Take tests online, get instant results, and understand your mistakes. Just pure math",
        ctaPrimary: "Start Teaching",
        ctaSecondary: "How it works?",
        formula: "x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
    },
    features:[
        {
            icon: "💡",
            title: "Clear from the very first time",
            description: "No dry theory or overly complex jargon. The neural network breaks down every complex task into simple, human-friendly steps"
        },
        {
            icon: "🎯",
            title: "Smart error handling",
            description: "The system instantly identifies the topics you're struggling with and compiles a personalized test to fill those gaps once and for all"
        },
        {
            icon: "🚀",
            title: "Study without lag",
            description: "The site runs at the speed of thought. Interactive charts and tooltips load instantly on any phone"
        }
    ],
    signUpPage: {
        title: "Create Account",
        subtitle: "Join Tensor and start your math journey",
        role: {
            student: {
                action: "Study math",
                as: "As a Student",
                signUpAs: "Sign Up as Student"
            },
            teacher: {
                action: "Teach math",
                as: "As a Teacher",
                signUpAs: "Sign Up as Teacher",
            }
        },
        info: {
            firstName: "NAME",
            firstNamePlaceHolder: "John",
            lastName: "LAST NAME",
            lastNamePlaceHolder: "Doe",
            classNumber: "CLASS NUMBER",
            classNumberPlaceHolder: "Class Number",
            classSymbol: "CLASS SYMBOL",
            login: "USERNAME",
            loginPlaceHolder: "john.doe.1731",
            password: "PASSWORD"
        },
        alreadyHaveAccount: "Already have account? Log In"
    }
}

export type EnglishDictionary = typeof en