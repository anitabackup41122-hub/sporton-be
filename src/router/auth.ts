import { Router } from "express";
import { signIn, initiateAdmin } from "../controller/auth";

const router = Router();

router.post("/signin", signIn);
router.post("/initiate-admin", initiateAdmin);

export default router;