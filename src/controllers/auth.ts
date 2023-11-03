import { Request, Response } from "express"
import { loginUser, registerNewUser } from "../services/auth";
import { handelHttp } from "../utils/error.handle";

const registerController = async ({ body }: Request, res: Response) => {
    try {        
        const response = await registerNewUser(body);
        res.send(response);
    } catch (error: any) {

        console.log(error)
        const errorMessages = error.errors?.map((err: any) => err.message);
        console.log(errorMessages)
        handelHttp(res,errorMessages)
    }
}

const loginController = async ({ body }: Request, res: Response) => {
    const response = await loginUser(body);
    res.send(response);    
}

export {loginController, registerController};