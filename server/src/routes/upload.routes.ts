import { Router } from "express";

import upload from "../services/upload.service";
import { getImage, uploadImage } from "../controllers/upload.controller";

const router = Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/:filename", getImage);

export default router;
