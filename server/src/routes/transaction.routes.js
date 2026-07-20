import express from "express";

import {
    createTransactionController,
    getAllTransactionsController,
    getTransactionByIdController,
    updateTransactionController,
    deleteTransactionController,
} from "../controllers/transaction.controller.js";


import { authenticate }  from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post("/", createTransactionController);

router.get("/", getAllTransactionsController);

router.get("/:id", getTransactionByIdController);

router.put("/:id", updateTransactionController);

router.delete("/:id", deleteTransactionController);

export default router;