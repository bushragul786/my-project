import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [tickets] = useState([
    {
      id: "TKT-001",
      subject: "Duplicate payment",
      category: "Billing",
      priority: "High",
      status: "New",
    },
  ]);

  return (
    <Container className="py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Customer Dashboard</h2>
          <p className="text-muted mb-0">
            Manage your support tickets
          </p>
        </div>

          <Button
      variant="outline-primary"
      onClick={() => navigate("/customer/tickets")}
    >
      My Tickets
    </Button>

        <Button
          variant="primary"
          onClick={() => navigate("/customer/create-ticket")}
        >
          + Create Ticket
        </Button>
  

      </div>

      {/* Statistics */}
      <Row className="g-3 mb-5">

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Total Tickets</h6>
              <h2>{tickets.length}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">New</h6>
              <h2>
                {
                  tickets.filter(
                    (ticket) => ticket.status === "New"
                  ).length
                }
              </h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">In Progress</h6>
              <h2>
                {
                  tickets.filter(
                    (ticket) => ticket.status === "In Progress"
                  ).length
                }
              </h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-muted">Resolved</h6>
              <h2>
                {
                  tickets.filter(
                    (ticket) => ticket.status === "Resolved"
                  ).length
                }
              </h2>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {/* Tickets */}
      <h4 className="mb-3">My Tickets</h4>

      {tickets.length === 0 ? (

        <Card className="text-center p-5 shadow-sm">
          <h5>No tickets yet</h5>
          <p className="text-muted">
            Create your first support ticket.
          </p>

          <Button
            variant="primary"
            onClick={() => navigate("/customer/create-ticket")}
          >
            Create Ticket
          </Button>
        </Card>

      ) : (

        <Row className="g-4">

          {tickets.map((ticket) => (

            <Col md={6} lg={4} key={ticket.id}>

              <Card className="h-100 shadow-sm">

                <Card.Body>

                  <div className="d-flex justify-content-between mb-2">

                    <small className="text-muted">
                      {ticket.id}
                    </small>

                    <Badge
                      bg={
                        ticket.status === "Resolved"
                          ? "success"
                          : ticket.status === "In Progress"
                          ? "warning"
                          : "primary"
                      }
                    >
                      {ticket.status}
                    </Badge>

                  </div>

                  <Card.Title>
                    {ticket.subject}
                  </Card.Title>

                  <p className="mb-2">
                    <strong>Category:</strong>{" "}
                    {ticket.category}
                  </p>

                  <p className="mb-3">
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
                    size="sm"
                    onClick={() =>
                      navigate(`/customer/tickets/${ticket.id}`)
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

export default CustomerDashboard;