//-----------------to load the Environment variabless-----------
import "./config/env.js"  

//----------------middlewares used to to allow requests from your React frontend----------------
import cors from "cors";

import express from 'express';
import connectDB from './config/db.js';

//----------------middlewares used to parse and read the incoming request cookies from the frontend----------------
import cookieParser from "cookie-parser";


//-----------Routes importsss----------------
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from "./routes/transaction.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

connectDB();
//------------Its job is to decide is this frontend allowed to access my backend? (Middleware)------
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

//------------By the help of this we can read the incoming request body by converting from json to JS Object (Middleware)------
app.use(express.json({
  limit: "5mb",
}));

//------------By this we can read the incoming request cookies (Middleware)------
app.use(cookieParser());


//-----------Routes----------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.get('/', (req,res) =>{
    res.send('LedgerLens API is running...');
})


//-----------Server Listening on PORT & Creating Server----------------
const PORT  = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});