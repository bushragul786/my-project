import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";



dotenv.config();

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);



app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});