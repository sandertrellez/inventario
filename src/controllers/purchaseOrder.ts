import { Request, Response } from "express"
import { handelHttp } from "../utils/error.handle"
import {getInvoiceService, getAllPurchaseOrders, getBuyById, insertAllBuys} from "../services/purchaseOrder"
import { verifyRole } from "../utils/permission.handle";

const getBuy = async ({ params }: Request, res: Response) =>{
    try {
        const { id } = params;
        const response = await getBuyById(id);
        res.send(response);
    } catch (error) {
        handelHttp(res,'ERROR_GETTING_BUY')
    }
}

const PurchaseOrders = async ({headers}: Request, res: Response) =>{
    
    try {
        //Se verifica que el usuario que sizo la petición tenga el rol adecuado
        if (verifyRole(headers) != "Administrador") handelHttp(res,'PERMISSION_DENIED_BY_ROLE')

        const response = await getAllPurchaseOrders();
        res.send(response);

    } catch (error) {
        handelHttp(res,`ERROR_GETTING_BUYS ${error}`)
    }
}

const postBuy = async ({ body, headers }:Request, res: Response) =>{
    
    try {
        //Se verifica que el usuario que sizo la petición tenga el rol adecuado
        if (verifyRole(headers) != "Cliente") handelHttp(res,'PERMISSION_DENIED_BY_ROLE')

        const response = await insertAllBuys(body, headers);
        res.sendStatus(201);

    } catch (error) {
        handelHttp(res,'ERROR_REGISTERING_BUY', error)
    }
}

const getInvoice = async ({params, headers}: Request, res: Response) =>{

    //Se verifica que el usuario que sizo la petición tenga el rol adecuado
    if (verifyRole(headers) != "Cliente") handelHttp(res,'PERMISSION_DENIED_BY_ROLE')

    const id = parseInt(params.id);

    try {
        await getInvoiceService(res, id);

    } catch (error) {
        handelHttp(res,`ERROR_GETTING_INVOICE ${error}`)
    }
}

export {getInvoice, getBuy, PurchaseOrders, postBuy};