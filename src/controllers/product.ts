import { Request, Response } from "express"
import { handelHttp } from "../utils/error.handle"
import { insertOneProduct , getAllProducts, getProductById, updateOneProduct, deleteOneProduct} from "../services/product"
import { getToken, verifyToken } from "../services/jwt.handle";
import { verifyRole } from "../utils/permission.handle";

const getProduct = async ({ params, headers }: Request, res: Response) =>{
    try {

        //Se verifica que el usuario que sizo la petición tenga el rol adecuado
        if (verifyRole(headers) != "Administrador") handelHttp(res,'PERMISSION_DENIED_BY_ROLE')
        
        const { id } = params;
        const response = await getProductById(id);
        res.send(response);
    } catch (error) {
        handelHttp(res,'ERROR_GETTING_PRODUCT')
    }
}

const getProducts = async (req: Request, res: Response) =>{   
    
    try {
        //Se verifica que el usuario que sizo la petición tenga el rol adecuado
        if (verifyRole(headers) != "Administrador") handelHttp(res,'PERMISSION_DENIED_BY_ROLE')

        const response = await getAllProducts();
        res.send(response);

    } catch (error) {
        handelHttp(res,`ERROR_GETTING_PRODUCTS ${error}`)
    }
}

const updateProduct = async ({ params, body, headers }:Request, res: Response) =>{
    try {
        //Se verifica que el usuario que sizo la petición tenga el rol adecuado
        if (verifyRole(headers) != "Administrador") handelHttp(res,'PERMISSION_DENIED_BY_ROLE')

        const { id } = params;

        const response = await updateOneProduct(id, body)
        res.send(response);
        
    } catch (error) {
        handelHttp(res,'ERROR_UPDATING_PRODUCT')
    }
}

const postProduct = async ({ body, headers }:Request, res: Response) =>{
    try {
        //Se verifica que el usuario que sizo la petición tenga el rol adecuado
        if (verifyRole(headers) != "Administrador") handelHttp(res,'PERMISSION_DENIED_BY_ROLE')

        const response = await insertOneProduct(body);
        res.send(response);

    } catch (error) {
        handelHttp(res,'ERROR_REGISTERING_PRODUCT', error)
    }
}

const deteleProduct = async ({ params, headers }:Request, res: Response) =>{
    try {
        //Se verifica que el usuario que sizo la petición tenga el rol adecuado
        if (verifyRole(headers) != "Administrador") handelHttp(res,'PERMISSION_DENIED_BY_ROLE')
        
        const { id } = params;
        await deleteOneProduct(id);
        res.sendStatus(200)        
    } catch (error) {
        handelHttp(res,'ERROR_DELETING_PRODUCT')
    }
}

export {getProduct, getProducts, postProduct, updateProduct, deteleProduct};