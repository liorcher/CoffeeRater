import { Router } from "express";
import { createUser, getUserDetails, signIn, updateUser } from "../controllers/user.controller";

const router = Router();

router.get("/details", getUserDetails);
router.put("/update", updateUser);
router.post("/create", createUser);
router.post("/signIn", signIn);


export default router;
