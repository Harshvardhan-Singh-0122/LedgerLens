import express from "express";

import { register, verifyEmail,login, getProfile, refreshToken, logout} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);
router.post("/refresh-token", refreshToken);
router.post("/logout", authenticate, logout);


router.get("/profile", authenticate, getProfile);

export default router;