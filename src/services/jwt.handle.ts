import { sign, verify } from "jsonwebtoken";
import { User } from "../interfaces/IUser";

const JWT_SECRET = process.env.JWT_SECRET || "Alex";

const signToken = async (user: User) => {
    const { id, firstName, lastName, email } = user;
    const payload = {id, firstName, lastName, email}
    
    const jwt = sign(payload, JWT_SECRET);
    return jwt;
}

//Si el token es valido se devuelve el payload
const verifyToken = (jwt: string) => {
    
    const payload = verify(jwt, JWT_SECRET);
    return payload;
}

const getToken = (headers: any) => {
    const Bearer_token = headers.authorization ||  '';

    //Se separar el Bearer del token y se tom el token
    return Bearer_token.split(' ').pop();
}

export { signToken, verifyToken, getToken }
