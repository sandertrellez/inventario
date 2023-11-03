import { Router } from "express";
import { loginController, registerController } from "../controllers/auth";
import { checkJwt } from "../middleware/session";

const router = Router();

/**
 * https://localhost:3002/auth/register [POST]
 */
router.post("/register", registerController);
//router.post("/register", checkJwt, registerController);
router.post("/login", loginController);

export { router }