import { NextFunction, Request, Response } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Hola desde el log");
    const header = req.headers;
    const userAgent = header["user-agent"];
    console.log(userAgent);
    //next()
    res.send("okok");
}

export { logMiddleware };