import { Request, Response } from "express";
import { handelHttp } from "../utils/error.handle";
import {  deleteOneUser, getAllUsers } from "../services/user";

const getUsers = async (req: Request, res: Response) => {
    try {
        const response = await getAllUsers();
        res.status(201);
        res.send(response);
    } catch (error) {
        handelHttp(res,'ERROR_GET_USERS')
    }
}

const deleteUser =async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const response = await deleteOneUser(id);
        res.send(response);
    } catch (error) {
        handelHttp(res,'ERROR_DELETING_USER')
    }    
}

export { getUsers, deleteUser};
