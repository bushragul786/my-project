import mongoose from "mongoose";

// TICKET
const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Billing",
        "Technical",
        "Account",
        "Order",
        "Other",
      ],
      default: "Other",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    aiSummary: {
      type: String,
      default: "",
    },

    aiReviewed: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "New",
        "Assigned",
        "In Progress",
        "Resolved",
      ],
      default: "New",
    },

    resolutionNote: {
      type: String,
      default: "",
    },

    // MESSAGES
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        message: {
          type: String,
          required: true,
          trim: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;