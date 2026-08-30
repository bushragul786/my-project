import Ticket from "../Models/Ticket.js";

// ===============================
// CREATE TICKET
// POST /api/tickets
// ===============================

export const createTicket = async (req, res) => {
  try {
    const { subject, description, category } = req.body;

    if (!subject || !description) {
      return res.status(400).json({
        success: false,
        message: "Subject and description are required",
      });
    }

    const ticketNumber = `TKT-${Date.now()}`;

    const ticket = await Ticket.create({
      ticketNumber,
      customer: req.user._id,
      subject,
      description,
      category: category || "Other",
    });

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET MY TICKETS
// GET /api/tickets/my-tickets
// ===============================

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      customer: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tickets,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// GET SINGLE TICKET
// GET /api/tickets/:id
// ===============================

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      customer: req.user._id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// UPDATE TICKET
// PUT /api/tickets/:id
// ===============================

export const updateTicket = async (req, res) => {
  try {
    const {
      subject,
      description,
      category,
      priority,
    } = req.body;

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      customer: req.user._id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Resolved ticket cannot be edited
    if (ticket.status === "Resolved") {
      return res.status(400).json({
        success: false,
        message: "Resolved ticket cannot be edited",
      });
    }

    if (subject) {
      ticket.subject = subject;
    }

    if (description) {
      ticket.description = description;
    }

    if (category) {
      ticket.category = category;
    }

    if (priority) {
      ticket.priority = priority;
    }

    const updatedTicket = await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: updatedTicket,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// DELETE TICKET
// DELETE /api/tickets/:id
// ===============================
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      customer: req.user._id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (ticket.status === "Resolved") {
      return res.status(400).json({
        success: false,
        message: "Resolved ticket cannot be deleted",
      });
    }

    await Ticket.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });

  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};