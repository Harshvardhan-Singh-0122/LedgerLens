import "./config/env.js"
import cors from "cors";

import express from 'express';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";


//-----------Routes importsss----------------
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from "./routes/transaction.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({
  limit: "5mb",
}));
app.use(cookieParser());


//-----------Routes----------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.get('/', (req,res) =>{
    res.send('LedgerLens API is running...');
})

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});