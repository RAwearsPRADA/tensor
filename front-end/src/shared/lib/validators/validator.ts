interface Data {
    [k: string]: FormDataEntryValue
}

const NUMBERS = "1234567890"
const NECESSARY_SYMBOLS = `!@#$%^&*()_+=/.,<>?'"|[]{}~`

export function validateFormData(data: Data) {
    let error = ""
    const keys = Object.keys(data)
    for (const key of keys) {
        if (key === "username") {
            const username = data[key] as string
            if (username.length < 4) {
                error = key
                break;
            }
            continue;
        }
        if (key === "password") {
            const password = data[key] as string
            if (!validatePassword(password)) {
                error = key
                break;
            }
            continue;
        }
        if ((data[key] as string).length === 0) {
            error = key
            break;
        }
    }
    return error
}

function validatePassword(password: string) {
    let hasNumbers = false;
    let hasSpecialSymbols = false;

    if (password.length < 7)
        return false
    
    for (const number of NUMBERS) {
        if ((password.includes(number))) {
            hasNumbers = true
            break;
        }
    }
    for (const symbol of NECESSARY_SYMBOLS) {
        if ((password.includes(symbol))) {
            hasSpecialSymbols = true
            break;
        }
    }
    if (!hasNumbers || !hasSpecialSymbols) {
        return false
    }
    return true
}