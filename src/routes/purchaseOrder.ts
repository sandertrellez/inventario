import { Request, Response, Router } from "express";
import {getInvoice, postBuy, getBuy, PurchaseOrders } from "../controllers/purchaseOrder";
import { checkJwt } from "../middleware/session";

const router = Router();

/**
 * http://localhost:PORT/ [GET]
 */
router.get('/', checkJwt, PurchaseOrders)
router.get('/invoice/:id', checkJwt, getInvoice)
router.get('/:idUser', checkJwt, getBuy)
router.post('/', checkJwt, postBuy)

export {router};