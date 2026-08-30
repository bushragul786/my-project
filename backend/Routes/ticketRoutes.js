import express from "express";

import {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicket
} from "../Controllers/ticketControllers.js";

import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();


// CREATE TICKET
router.post("/", protect, createTicket);


// MY TICKETS
router.get("/my-tickets", protect, getMyTickets);


// SINGLE TICKET
router.get("/:id", protect, getTicketById);


// UPDATE TICKET
router.put("/:id", protect, updateTicket);


export default router;