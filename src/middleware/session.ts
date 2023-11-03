import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt.handle";

const checkJwt =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { headers } = req;
        const Bearer_token = headers.authorization ||  '';

        if (Bearer_token == '') {
            res.status(401);
            res.send("TOKEN_IS_REQUIRED");
            return false;
        }

        //Se separar el Bearer del token y se tom el token
        const jwt = Bearer_token.split(' ').pop();

        //Se pone el template string para asegurar que se le pase un string ya que undefinde no es permitido
        //EL verifyToken deveulve el payload si todo ok
        const userData = verifyToken(`${jwt}`);

        next();
        
    } catch (error) {
        res.status(402);
        res.send("INVALID_TOKEN");        
    }
}

export { checkJwt };