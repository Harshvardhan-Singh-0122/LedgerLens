import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";

import {
    uploadCsvController,
    importCsvController,
} from "../controllers/csv.controller.js";

const router = express.Router();

router.use(authenticate);

router.post(
    "/upload",
    upload.single("file"),
    uploadCsvController
);

router.post(
    "/import",
    importCsvController
);

export default router;