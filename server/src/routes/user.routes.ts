import { Router } from "express";
import { getUserDetails, updateUser } from "../controllers/user.controller";

const router = Router();

router.get("/details/:userId", getUserDetails);
router.put("/update", updateUser);


export default router;
