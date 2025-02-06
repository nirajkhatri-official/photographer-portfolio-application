import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connection } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import albumRoutes from "./routes/albumRoute.js";
import path from "path";
import errorHandling from "./middlewares/errorHandler.js";
const __dirname = import.meta.dirname;
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlerware
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(cookieParser());

//routes
app.use("/api", userRoutes);
app.use("/api", albumRoutes);

app.use(errorHandling);

connection();

//server running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
