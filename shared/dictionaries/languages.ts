import { EnglishDictionary } from "./en"
import { RussianDictionary } from "./ru"

export const languages = [
    {code: "en", label: "English", flag: "us"},
    {code: "ru", label: "Русский", flag: "ru"},
]

export type Dictionary = Record<string, EnglishDictionary | RussianDictionary>