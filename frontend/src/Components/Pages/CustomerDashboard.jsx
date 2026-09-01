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


const CustomerDashboard = () => {

  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ===============================
  // FETCH TICKETS
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


    fetchTickets();

  }, []);


  // ===============================
  // TICKET COUNTS
  // ===============================

  const totalTickets = tickets.length;


  const newTickets = tickets.filter(
    (ticket) => ticket.status === "New"
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

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>
            Customer Dashboard
          </h2>

          <p className="text-muted mb-0">
            Manage your support tickets
          </p>

        </div>


        <div className="d-flex gap-2">

          <Button
            variant="outline-primary"
            onClick={() =>
              navigate("/customer/tickets")
            }
          >
            My Tickets
          </Button>


          <Button
            variant="primary"
            onClick={() =>
              navigate("/customer/create-ticket")
            }
          >
            + Create Ticket
          </Button>

        </div>

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
            Loading dashboard...
          </p>

        </div>

      ) : (

        <>


          {/* ===============================
              STATISTICS
          =============================== */}

          <Row className="g-3 mb-5">


            {/* TOTAL */}

            <Col md={3}>

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

            <Col md={3}>

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


            {/* IN PROGRESS */}

            <Col md={3}>

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

            <Col md={3}>

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
              MY TICKETS
          =============================== */}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4 className="mb-0">
              My Tickets
            </h4>


            {tickets.length > 0 && (

              <Button
                variant="link"
                onClick={() =>
                  navigate("/customer/tickets")
                }
              >
                View All
              </Button>

            )}

          </div>


          {/* NO TICKETS */}

          {tickets.length === 0 ? (

            <Card className="text-center p-5 shadow-sm">

              <h5>
                No tickets yet
              </h5>

              <p className="text-muted">
                Create your first support ticket.
              </p>


              <Button
                variant="primary"
                onClick={() =>
                  navigate("/customer/create-ticket")
                }
              >
                Create Ticket
              </Button>

            </Card>

          ) : (


            /* ===============================
               TICKET CARDS
            =============================== */

            <Row className="g-4">

              {tickets.slice(0, 3).map((ticket) => (

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

        </>

      )}

    </Container>

  );

};


export default CustomerDashboard;