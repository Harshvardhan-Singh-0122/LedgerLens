import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getDashboardController } from "../controllers/dashboard.controller.js";

const router = express.Router();

// Protect all dashboard routes
router.use(authenticate);

// GET Dashboard Data
router.get("/", getDashboardController);

export default router;