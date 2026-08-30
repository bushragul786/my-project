import express from "express";

import {
  createTicket,
  getMyTickets,
  updateTicket
} from "../Controllers/ticketControllers.js";

import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTicket);

router.get("/my-tickets", protect, getMyTickets);

router.put("/:id", protect, updateTicket);

router.get("/test", (req, res) => {
  res.send("Ticket route is working");
});

export default router;