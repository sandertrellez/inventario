import { getToken, verifyToken } from "../services/jwt.handle";

const verifyRole = (headers:any) => {
    const jwt = getToken(headers);
    
    //Se obtiene el peyload del token
    const data = verifyToken(jwt);
    let role: string = "";

    if (typeof data === 'object' && 'role' in data) {
        role = data.role;
    }
    return role;
}

export {verifyRole}