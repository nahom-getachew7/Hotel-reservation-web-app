import express from "express";
import { login, register, authenticateToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
// router.post("/logout", authenticateToken, (req, res) => {
//   const token = req.cookies.access_token;
//   revokedTokens.add(token); // Add the token to the blacklist
//   res.clearCookie("access_token").sendStatus(200);
//   console.log("session cleared");
// });

export default router