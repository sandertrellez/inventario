import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/user";
import { checkJwt } from "../middleware/session";

const router = Router();

router.get("/", checkJwt, getUsers);
router.delete("/:id",checkJwt, deleteUser);

export { router };