import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Badge,
  Button,
  Form,
  Alert,
  Spinner
} from "react-bootstrap";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import axios from "axios";


const TicketDetails = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  const [ticket, setTicket] = useState(null);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ===============================
  // FETCH SINGLE TICKET
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
          `http://localhost:5000/api/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        setTicket(response.data.data);


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
const handleSend = async (e) => {
  e.preventDefault();

  if (!message.trim()) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `http://localhost:5000/api/tickets/${id}/messages`,
      {
        message: message.trim(),
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
  // ERROR
  // ===============================

  if (error) {

    return (

      <Container className="py-5">

        <Alert variant="danger">

          {error}

        </Alert>


        <Button
          variant="secondary"
          onClick={() =>
            navigate("/customer/tickets")
          }
        >

          ← Back to My Tickets

        </Button>

      </Container>

    );

  }


  // ===============================
  // NO TICKET
  // ===============================

  if (!ticket) {

    return (

      <Container className="py-5">

        <Alert variant="warning">

          Ticket not found.

        </Alert>

      </Container>

    );

  }


  return (

    <Container className="py-5">


      {/* BACK BUTTON */}

      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() =>
          navigate("/customer/tickets")
        }
      >

        ← Back to My Tickets

      </Button>



      <Card className="shadow-sm">

        <Card.Body className="p-4">


          {/* HEADER */}

          <div className="d-flex justify-content-between align-items-start mb-4">

            <div>

              <small className="text-muted">

                Ticket Number

              </small>


              <h3>

                {ticket.ticketNumber}

              </h3>

            </div>


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

              className="fs-6"
            >

              {ticket.status}

            </Badge>

          </div>


          <hr />


          {/* TICKET INFORMATION */}

          <h4>

            {ticket.subject}

          </h4>


          <p className="mt-3">

            {ticket.description}

          </p>



          {/* CATEGORY + PRIORITY */}

          <div className="d-flex gap-3 flex-wrap mt-4">


            <div>

              <strong>
                Category:
              </strong>{" "}

              <Badge bg="secondary">

                {ticket.category}

              </Badge>

            </div>



            <div>

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

            </div>


          </div>


          <hr className="my-4" />


        {/* ORIGINAL CUSTOMER MESSAGE */}

<Card className="bg-light mb-3">
  <Card.Body>
    <strong>You</strong>

    <p className="mb-0 mt-2">
      {ticket.description}
    </p>
  </Card.Body>
</Card>

{/* ACTUAL MESSAGES */}

{ticket.messages && ticket.messages.length > 0 ? (
  ticket.messages.map((msg, index) => (
    <Card key={msg._id || index} className="mb-3">
      <Card.Body>

        <div className="d-flex justify-content-between">

          <strong>
            {msg.sender?.role === "agent"
              ? "Support Agent"
              : "You"}
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

      </Card.Body>
    </Card>
  ))
) : (
  <p className="text-muted">
    No messages yet.
  </p>
)}


          {/* MESSAGE FORM */}

          <Form onSubmit={handleSend}>

            <Form.Group className="mb-3">

              <Form.Label>

                Send a message

              </Form.Label>


              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your message..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              />

            </Form.Group>


            <Button
              type="submit"
              variant="primary"
            >

              Send Message

            </Button>

          </Form>


        </Card.Body>

      </Card>


    </Container>

  );

};


export default TicketDetails;