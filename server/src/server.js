import "./config/env.js"

import express from 'express';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.routes.js';

const app = express();
connectDB();


app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.get('/', (req,res) =>{
    res.send('LedgerLens API is running...');
})

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
});