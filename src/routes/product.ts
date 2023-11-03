import { Request, Response, Router } from "express";
import { postProduct, getProduct, getProducts, updateProduct, deteleProduct } from "../controllers/product";
import { checkJwt } from "../middleware/session";

const router = Router();

/**
 * http://localhost:PORT/ [GET]
 */
router.get('/', checkJwt, getProducts)
router.get('/:id', checkJwt, getProduct)
router.post('/', checkJwt, postProduct)
router.put('/:id', checkJwt, updateProduct)
router.delete('/:id', checkJwt, deteleProduct)

export {router};