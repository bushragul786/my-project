import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AgentTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);

  const [status, setStatus] = useState("");

  const [priority, setPriority] = useState("");

  const [resolutionNote, setResolutionNote] = useState("");

  const [updating, setUpdating] = useState(false);


  // ===============================
  // FETCH TICKET
  // ===============================

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
           `https://my-project-7muh.onrender.com/api/tickets/agent/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;

        setTicket(data);
        setStatus(data.status);
        setPriority(data.priority);
        setResolutionNote(data.resolutionNote || "");

      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Failed to load ticket."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);


  // ===============================
  // SEND MESSAGE
  // ===============================

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      setSending(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
      `https://my-project-7muh.onrender.com/api/tickets/${id}/messages`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTicket(response.data.data);

      setMessage("");

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };


  // ===============================
  // UPDATE TICKET
  // ===============================

  const handleUpdateTicket = async () => {

    if (
      status === "Resolved" &&
      !resolutionNote.trim()
    ) {
      setError(
        "Resolution note is required before resolving the ticket."
      );

      return;
    }

    try {
      setUpdating(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.put(
       `https://my-project-7muh.onrender.com/api/tickets/agent/${id}`,
        {
          status,
          priority,
          resolutionNote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTicket(response.data.data);

      alert("Ticket updated successfully.");

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to update ticket."
      );
    } finally {
      setUpdating(false);
    }
  };


  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <Container className="py-5 text-center">

        <Spinner animation="border" />

        <p className="mt-2">
          Loading ticket...
        </p>

      </Container>
    );
  }


  // ===============================
  // ERROR / NOT FOUND
  // ===============================

  if (!ticket) {
    return (
      <Container className="py-5">

        <Alert variant="danger">
          {error || "Ticket not found."}
        </Alert>

        <Button
          onClick={() =>
            navigate("/agent/dashboard")
          }
        >
          Back to Dashboard
        </Button>

      </Container>
    );
  }


  return (
    <Container className="py-5">

      {/* ===============================
          HEADER
      =============================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>
            Ticket Details
          </h2>

          <p className="text-muted mb-0">
            {ticket.ticketNumber}
          </p>

        </div>

        <Button
          variant="outline-secondary"
          onClick={() =>
            navigate("/agent/dashboard")
          }
        >
          ← Back
        </Button>

      </div>


      {/* ===============================
          ERROR
      =============================== */}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}


      {/* ===============================
          TICKET INFORMATION
      =============================== */}

      <Card className="shadow-sm border-0 mb-4">

        <Card.Body>

          <h4 className="mb-3">
            {ticket.subject}
          </h4>

          <p>
            <strong>Customer:</strong>{" "}
            {ticket.customer?.username || "Unknown"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {ticket.customer?.email || "Unknown"}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {ticket.category}
          </p>

          <p>
            <strong>Priority:</strong>{" "}

            <Badge
              bg={
                ticket.priority === "High"
                  ? "danger"
                  : ticket.priority === "Medium"
                  ? "warning"
                  : "secondary"
              }
            >
              {ticket.priority}
            </Badge>
          </p>

          <p>
            <strong>Status:</strong>{" "}

            <Badge
              bg={
                ticket.status === "Resolved"
                  ? "success"
                  : ticket.status === "In Progress"
                  ? "warning"
                  : ticket.status === "Assigned"
                  ? "info"
                  : "primary"
              }
            >
              {ticket.status}
            </Badge>
          </p>

          <hr />

          <h6>
            Customer Description
          </h6>

          <p className="text-muted">
            {ticket.description}
          </p>

        </Card.Body>

      </Card>


      {/* ===============================
          CONVERSATION
      =============================== */}

      <Card className="shadow-sm border-0 mb-4">

        <Card.Body>

          <h4 className="mb-4">
            Conversation
          </h4>

         {/* CUSTOMER ORIGINAL MESSAGE */}

<div className="border rounded p-3 mb-3">

  <div className="d-flex justify-content-between">

    <strong>
      {ticket.customer?.username || "Customer"}
    </strong>

    <small className="text-muted">
      Customer
    </small>

  </div>

  <p className="mb-0 mt-2">
    {ticket.description}
  </p>

</div>


{/* REPLIES / MESSAGES */}

{ticket.messages?.length > 0 && (

  ticket.messages.map((msg, index) => (

    <div
      key={msg._id || index}
      className="border rounded p-3 mb-3"
    >

      <div className="d-flex justify-content-between">

       <strong>
  {msg.sender?.role === "agent"
    ? "You"
    : msg.sender?.username || "Customer"}
</strong>

        <small className="text-muted">
          {msg.createdAt
            ? new Date(msg.createdAt).toLocaleString()
            : ""}
        </small>

      </div>

      <p className="mb-0 mt-2">
        {msg.message}
      </p>

    </div>

  ))

)}
          {/* ===============================
              REPLY
          =============================== */}

          {ticket.status !== "Resolved" && (

            <Form onSubmit={handleSendMessage}>

              <Form.Group className="mb-3">

                <Form.Label>
                  Reply to Customer
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your reply..."
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                />

              </Form.Group>

              <Button
                type="submit"
                disabled={
                  sending ||
                  !message.trim()
                }
              >

                {sending
                  ? "Sending..."
                  : "Send Reply"}

              </Button>

            </Form>

          )}

        </Card.Body>

      </Card>


      {/* ===============================
          UPDATE TICKET
      =============================== */}

      <Card className="shadow-sm border-0">

        <Card.Body>

          <h4 className="mb-4">
            Manage Ticket
          </h4>


          {/* STATUS */}

          <Form.Group className="mb-3">

            <Form.Label>
              Status
            </Form.Label>

            <Form.Select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              disabled={
                ticket.status === "Resolved"
              }
            >

              <option value="New">
                New
              </option>

              <option value="Assigned">
                Assigned
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </Form.Select>

          </Form.Group>


          {/* PRIORITY */}

          <Form.Group className="mb-3">

            <Form.Label>
              Priority
            </Form.Label>

            <Form.Select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              disabled={
                ticket.status === "Resolved"
              }
            >

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

            </Form.Select>

          </Form.Group>


          {/* RESOLUTION NOTE */}

          <Form.Group className="mb-3">

            <Form.Label>
              Resolution Note
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter resolution note..."
              value={resolutionNote}
              onChange={(e) =>
                setResolutionNote(
                  e.target.value
                )
              }
              disabled={
                ticket.status === "Resolved"
              }
            />

          </Form.Group>


          {/* UPDATE */}

          <Button
            variant="primary"
            onClick={handleUpdateTicket}
            disabled={
              updating ||
              ticket.status === "Resolved"
            }
          >

            {updating
              ? "Updating..."
              : "Update Ticket"}

          </Button>

        </Card.Body>

      </Card>

    </Container>
  );
};

export default AgentTicketDetail;
