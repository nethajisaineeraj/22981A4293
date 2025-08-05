import express from "express";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js"

dotenv.config();
const app=express();
const PORT=3000;
app.use(express.json());
app.use("/api",urlRoutes);
app.listen(PORT, ()=>{
    console.log(`server running on port number ${PORT}`);
});