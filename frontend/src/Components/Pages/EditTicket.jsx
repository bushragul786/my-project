import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditTicket = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [priority, setPriority] = useState("Medium");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET TICKET
  // =========================

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
          `https://my-project-7muh.onrender.com/api/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const ticket = response.data.data;

        setSubject(ticket.subject);
        setDescription(ticket.description);
        setCategory(ticket.category);
        setPriority(ticket.priority);
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

  // =========================
  // UPDATE TICKET
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://my-project-7muh.onrender.com/api/tickets/${id}`,
        {
          subject,
          description,
          category,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/customer/tickets");
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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Loading ticket...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">

      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate("/customer/tickets")}
      >
        ← Back to My Tickets
      </Button>

      <Card
        className="shadow mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <Card.Body className="p-4">

          <h2 className="mb-2">
            Edit Ticket
          </h2>

          <p className="text-muted mb-4">
            Update your support ticket information.
          </p>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>

            {/* SUBJECT */}

            <Form.Group className="mb-3">

              <Form.Label>
                Subject
              </Form.Label>

              <Form.Control
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                required
              />

            </Form.Group>


            {/* DESCRIPTION */}

            <Form.Group className="mb-3">

              <Form.Label>
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
              />

            </Form.Group>


            {/* CATEGORY */}

            <Form.Group className="mb-3">

              <Form.Label>
                Category
              </Form.Label>

              <Form.Select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                <option value="Billing">
                  Billing
                </option>

                <option value="Technical">
                  Technical
                </option>

                <option value="Account">
                  Account
                </option>

                <option value="Order">
                  Order
                </option>

                <option value="Other">
                  Other
                </option>

              </Form.Select>

            </Form.Group>


            {/* PRIORITY */}

            <Form.Group className="mb-4">

              <Form.Label>
                Priority
              </Form.Label>

              <Form.Select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
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


            {/* BUTTONS */}

            <div className="d-flex gap-2">

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  navigate("/customer/tickets")
                }
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={updating}
              >

                {updating
                  ? "Updating..."
                  : "Update Ticket"}

              </Button>

            </div>

          </Form>

        </Card.Body>
      </Card>

    </Container>
  );
};

export default EditTicket;