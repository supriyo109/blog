import express from "express"
import dotenv from "dotenv"
import connectDb from "./database/db.js"
import userRouter from "./routes/user.route.js"
import blogRouter from "./routes/blog.route.js"
import CommentRoute from "./routes/comment.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from "url";


dotenv.config()
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//default
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

const _dirname = path.resolve()

const port = process.env.PORT || 3000

app.use("/api/v1/user",userRouter) 
app.use("/api/v1/blog",blogRouter) 
app.use("/api/v1/comment",CommentRoute) 

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get("*", (_,res) => {
  res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"))
})

app.listen((port), ()=> {
    connectDb();
    console.log(`server listing at ${port}`);
})