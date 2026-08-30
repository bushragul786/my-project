import Ticket from "../Models/Ticket.js";


// CREATE  POST  DATA

export const createTicket = async (req, res) => {
  try {
    const { subject, description, category } = req.body;

    // Validation
    if (!subject || !description) {
      return res.status(400).json({
        success: false,
        message: "Subject and description are required",
      });
    }

    // Generate unique ticket number
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
    // GET  READ DATA

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

// UPDATE TICKET
export const updateTicket = async (req, res) => {
  try {
    const { status, priority, category, resolutionNote } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // Only assigned agent can update the ticket
    if (
      req.user.role === "agent" &&
      ticket.agent &&
      ticket.agent.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update tickets assigned to you",
      });
    }

    // Resolved ticket cannot be changed normally
    if (ticket.status === "Resolved" && status !== "Resolved") {
      return res.status(400).json({
        success: false,
        message: "Resolved ticket cannot be changed unless reopened",
      });
    }

    // Resolution note required
    if (status === "Resolved" && !resolutionNote) {
      return res.status(400).json({
        success: false,
        message: "Resolution note is required",
      });
    }

    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (category) ticket.category = category;
    if (resolutionNote) ticket.resolutionNote = resolutionNote;

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