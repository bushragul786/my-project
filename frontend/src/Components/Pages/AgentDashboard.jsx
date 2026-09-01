import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgentDashboard = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // FETCH AGENT TICKETS
  // ===============================

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
           "https://my-project-7muh.onrender.com/api/tickets/agent",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTickets(response.data.data || []);

      } catch (error) {
        console.log(error);

        setError(
          error.response?.data?.message ||
            "Failed to load agent tickets."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // ===============================
  // TICKET COUNTS
  // ===============================

  const totalTickets = tickets.length;

  const newTickets = tickets.filter(
    (ticket) => ticket.status === "New"
  ).length;

  const assignedTickets = tickets.filter(
    (ticket) => ticket.status === "Assigned"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  return (
    <Container className="py-5">

      {/* ===============================
          HEADER
      =============================== */}

      <div className="mb-4">

        <h2>Agent Dashboard</h2>

        <p className="text-muted mb-0">
          Manage customer support tickets
        </p>

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
          LOADING
      =============================== */}

      {loading ? (
        <div className="text-center py-5">

          <Spinner animation="border" />

          <p className="mt-2">
            Loading tickets...
          </p>

        </div>
      ) : (
        <>

          {/* ===============================
              STATISTICS
          =============================== */}

          <Row className="g-3 mb-5">

            {/* TOTAL */}

            <Col xs={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100">

                <Card.Body>

                  <h6 className="text-muted">
                    Total Tickets
                  </h6>

                  <h2>
                    {totalTickets}
                  </h2>

                </Card.Body>

              </Card>
            </Col>


            {/* NEW */}

            <Col xs={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100">

                <Card.Body>

                  <h6 className="text-muted">
                    New
                  </h6>

                  <h2>
                    {newTickets}
                  </h2>

                </Card.Body>

              </Card>
            </Col>


            {/* ASSIGNED */}

            <Col xs={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100">

                <Card.Body>

                  <h6 className="text-muted">
                    Assigned
                  </h6>

                  <h2>
                    {assignedTickets}
                  </h2>

                </Card.Body>

              </Card>
            </Col>


            {/* IN PROGRESS */}

            <Col xs={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100">

                <Card.Body>

                  <h6 className="text-muted">
                    In Progress
                  </h6>

                  <h2>
                    {inProgressTickets}
                  </h2>

                </Card.Body>

              </Card>
            </Col>


            {/* RESOLVED */}

            <Col xs={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100">

                <Card.Body>

                  <h6 className="text-muted">
                    Resolved
                  </h6>

                  <h2>
                    {resolvedTickets}
                  </h2>

                </Card.Body>

              </Card>
            </Col>

          </Row>


          {/* ===============================
              TICKETS
          =============================== */}

          <div className="mb-3">

            <h4>
              Customer Tickets
            </h4>

          </div>


          {/* NO TICKETS */}

          {tickets.length === 0 ? (

            <Card className="text-center p-5 shadow-sm">

              <h5>
                No tickets available
              </h5>

              <p className="text-muted">
                There are currently no support tickets.
              </p>

            </Card>

          ) : (

            <Row className="g-4">

              {tickets.map((ticket) => (

                <Col
                  md={6}
                  lg={4}
                  key={ticket._id}
                >

                  <Card className="h-100 shadow-sm">

                    <Card.Body>

                      {/* TOP */}

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


                      {/* SUBJECT */}

                      <Card.Title>
                        {ticket.subject}
                      </Card.Title>


                      {/* CUSTOMER */}

                      <p className="mb-2">

                        <strong>
                          Customer:
                        </strong>{" "}

                        {ticket.customer?.username ||
                          "Unknown"}

                      </p>


                      {/* CATEGORY */}

                      <p className="mb-2">

                        <strong>
                          Category:
                        </strong>{" "}

                        {ticket.category}

                      </p>


                      {/* PRIORITY */}

                      <p className="mb-3">

                        <strong>
                          Priority:
                        </strong>{" "}

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


                      {/* VIEW */}

                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/agent/tickets/${ticket._id}`
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

        </>
      )}

    </Container>
  );
};

export default AgentDashboard;