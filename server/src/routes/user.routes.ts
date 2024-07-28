import { Router } from "express";
import { getUserDetails, updateUser } from "../controllers/user.controller";

const router = Router();

router.get("/details", getUserDetails);
router.put("/update", updateUser);


export default router;
