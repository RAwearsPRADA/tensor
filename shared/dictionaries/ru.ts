import { brand } from "./brand"


export const ru = {
    header: {
        brand,
        login: "Войти",
        signup: "Зарегистрироваться",
    },
    hero: {
        badge: "Создано RAwearsPRADA",
        title: "Математика без\n стресса и зубрежки",
        subtitle: "Проходите тесты онлайн, получайте мгновенные результаты и разбирайте свои ошибки. Только чистая математика.",
        ctaPrimary: "Начать обучение",
        ctaSecondary: "Как это работает?",
        formula: "x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
    },
    features: [
        {
            "icon": "💡",
            "title": "Понятно с первого раза",
            "description": "Никакой душной теории и заумных терминов. Нейросеть раскладывает каждую сложную задачу на простые, человеческие шаги"
        },
        {
            "icon": "🎯",
            "title": "Умная работа над ошибками",
            "description": "Система мгновенно находит темы, в которых ты путаешься, и собирает персональный тест, чтобы раз и навсегда закрыть пробелы"
        },
        {
            "icon": "🚀",
            "title": "Учись без лагов и ожидания",
            "description": "Сайт работает со скоростью мысли. Интерактивные графики и подсказки загружаются моментально на любом телефоне"
        }
    ],
    signUpPage: {
        title: "Создайте аккаунт",
        subtitle: "Присоединяйтесь к Tensor",
        role: {
            student: {
                action: "Учить математику",
                as: "Как Ученик",
                signUpAs: "Зарегистрироваться"
            },
            teacher: {
                action: "Учить математике",
                as: "Как учитель",
                signUpAs: "Зарегистрироваться",
            }
        },
        info: {
            firstName: "ИМЯ",
            firstNamePlaceHolder: "Иван",
            lastName: "ФАМИЛИЯ",
            lastNamePlaceHolder: "Иванов",
            classNumber: "НОМЕР КЛАССА",
            classNumberPlaceHolder: "7",
            classSymbol: "БУКВА КЛАССА",
            classSymbolPlaceHolder: "А",
            login: "ЛОГИН",
            password: "ПАРОЛЬ"
        },
        alreadyHaveAccount: "Already have account? Log In"
    }
}

export type RussianDictionary = typeof ru