import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyTickets = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET MY TICKETS
  // =========================

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
       "https://my-project-7muh.onrender.com/api/tickets/my-tickets",
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


  useEffect(() => {
  fetchTickets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  // =========================
  // DELETE TICKET
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://my-project-7muh.onrender.com/api/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted ticket from UI
      setTickets((prevTickets) =>
        prevTickets.filter(
          (ticket) => ticket._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete ticket."
      );
    }
  };


  return (
    <Container className="py-5">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>
            My Tickets
          </h2>

          <p className="text-muted">
            View and manage your support tickets
          </p>

        </div>


        <Button
          variant="primary"
          onClick={() =>
            navigate("/customer/create-ticket")
          }
        >
          + Create Ticket
        </Button>

      </div>


      {/* LOADING */}

      {loading && (
        <div className="text-center py-5">

          <Spinner animation="border" />

          <p className="mt-2">
            Loading tickets...
          </p>

        </div>
      )}


      {/* ERROR */}

      {!loading && error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}


      {/* NO TICKETS */}

      {!loading &&
        !error &&
        tickets.length === 0 && (

          <Card className="text-center p-5 shadow-sm">

            <h4>
              No Tickets Found
            </h4>

            <p className="text-muted">
              You haven't created any support
              tickets yet.
            </p>

            <Button
              variant="primary"
              onClick={() =>
                navigate("/customer/create-ticket")
              }
            >
              Create Your First Ticket
            </Button>

          </Card>
        )}


      {/* TICKETS */}

      {!loading &&
        !error &&
        tickets.length > 0 && (

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


                    {/* CATEGORY */}

                    <p>
                      <strong>
                        Category:
                      </strong>{" "}
                      {ticket.category}
                    </p>


                    {/* PRIORITY */}

                    <p>

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


                    {/* BUTTONS */}

                    <div className="d-flex gap-2 flex-wrap mt-3">

                      {/* VIEW */}

                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/customer/tickets/${ticket._id}`
                          )
                        }
                      >
                        View Ticket
                      </Button>


                      {/* EDIT */}

                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/customer/tickets/${ticket._id}/edit`
                          )
                        }
                      >
                        Edit
                      </Button>


                      {/* DELETE */}

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          handleDelete(ticket._id)
                        }
                      >
                        Delete
                      </Button>

                    </div>

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