import express from "express";

import {
  createTicket,
  getMyTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getAgentTickets,
  getAgentTicketById,
  updateAgentTicket,
  addMessage,
} from "../Controllers/ticketControllers.js";

import { protect } from "../Middleware/authMiddleware.js";
import { isAgent } from "../Middleware/agentMiddleware.js";

const router = express.Router();

// ===============================
// CUSTOMER ROUTES
// ===============================

// CREATE TICKET
router.post("/", protect, createTicket);

// MY TICKETS
router.get("/my-tickets", protect, getMyTickets);

// ===============================
// AGENT ROUTES
// ===============================

// GET ALL AGENT TICKETS
router.get("/agent", protect, isAgent, getAgentTickets);

// GET SINGLE AGENT TICKET
router.get("/agent/:id", protect, isAgent, getAgentTicketById);

// UPDATE AGENT TICKET
router.put("/agent/:id", protect, isAgent, updateAgentTicket);

// ===============================
// MESSAGES
// ===============================

// CUSTOMER + AGENT MESSAGE
router.post("/:id/messages", protect, addMessage);

// ===============================
// CUSTOMER SINGLE TICKET
// ===============================

router.get("/:id", protect, getTicketById);

// UPDATE CUSTOMER TICKET
router.put("/:id", protect, updateTicket);

// DELETE CUSTOMER TICKET
router.delete("/:id", protect, deleteTicket);

export default router;