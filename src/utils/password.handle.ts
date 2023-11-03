import { compare, hash } from "bcryptjs"

const encrypt = (password: string) => {
    const salt = 10;
    const passwordHash = hash(password, salt);
    return passwordHash;
}

const verify = (password: string, passwordHash: string) => {
    const isCorrect = compare(password, passwordHash);
    return isCorrect;

}

export { encrypt, verify }