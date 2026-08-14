import express from "express";

import {
    createTransactionController,
    getAllTransactionsController,
    getTransactionByIdController,
    updateTransactionController,
    deleteTransactionController,
    deleteTransactionsByMonthController,
} from "../controllers/transaction.controller.js";


import { authenticate }  from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication so every route below this line will use the authenticate middleware.
router.use(authenticate);

router.post("/", createTransactionController);

router.get("/", getAllTransactionsController);

//-------by useing (req.params.id)------
router.get("/:id", getTransactionByIdController);

//-------Updates a transaction---------
router.put("/:id", updateTransactionController);

router.delete("/month", deleteTransactionsByMonthController);

router.delete("/:id", deleteTransactionController);

export default router;