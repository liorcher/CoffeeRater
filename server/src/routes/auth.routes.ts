import { Router } from "express";
import passport from "../services/auth.service";
import {
  googleCallBack,
  localLoginCallBack,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallBack
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  localLoginCallBack
);

router.post("/signup", registerUser);

// Route to log out the user
router.get("/logout", logoutUser);

export default router;
