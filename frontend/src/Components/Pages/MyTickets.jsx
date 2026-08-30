import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Badge, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyTickets = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

       const response = await axios.get(
  "http://localhost:5000/api/tickets/my-tickets",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        setTickets(response.data.data);

      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
          "Failed to load tickets."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <Container className="py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2>My Tickets</h2>
          <p className="text-muted">
            View and manage your support tickets
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate("/customer/create-ticket")}
        >
          + Create Ticket
        </Button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-2">Loading tickets...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {/* No tickets */}
      {!loading && !error && tickets.length === 0 && (
        <Card className="text-center p-5 shadow-sm">

          <h4>No Tickets Found</h4>

          <p className="text-muted">
            You haven't created any support tickets yet.
          </p>

          <Button
            variant="primary"
            onClick={() => navigate("/customer/create-ticket")}
          >
            Create Your First Ticket
          </Button>

        </Card>
      )}

      {/* Tickets */}
      {!loading && !error && tickets.length > 0 && (
        <Row className="g-4">

          {tickets.map((ticket) => (

            <Col md={6} lg={4} key={ticket._id}>

              <Card className="h-100 shadow-sm">

                <Card.Body>

                  <div className="d-flex justify-content-between mb-3">

                    <small className="text-muted">
                      {ticket.ticketNumber}
                    </small>

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

                  </div>

                  <Card.Title>
                    {ticket.subject}
                  </Card.Title>

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

                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      navigate(
                        `/customer/tickets/${ticket._id}`
                      )
                    }
                  >
                    View Ticket
                  </Button>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>
      )}

    </Container>
  );
};

export default MyTickets;