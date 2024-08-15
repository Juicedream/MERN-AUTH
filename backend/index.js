import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


//customs
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config(); //for .env to be used in the project

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); 

//middleware
app.use(cors({origin: "http://localhost:5173", credentials:true})); //allows us fetch data from only this localhost 5000(server) to localhost 5173(client side(react))
app.use(express.json()) //for allowing us to parse incoming requests with JSON payloads in req.body with a format of json
app.use(cookieParser()); //for allowing us to parse incoming cookies


//ROUTES FOR THE app
app.use("/api/auth", authRoutes);

//for production
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}


app.listen(PORT, () => {
  connectDb();
  console.log(`server is running on port ${PORT}`);
  
});
