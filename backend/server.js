import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import ticketRoutes from "./Routes/ticketRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/fsd", (req, res) => {
  console.log('hellloo');
  
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});