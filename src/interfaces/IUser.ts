import { Auth } from "./IAuth";

export interface User extends Auth {
    id: number;
    firstName: string,
    lastName: string,
    email: string
    role: string
}