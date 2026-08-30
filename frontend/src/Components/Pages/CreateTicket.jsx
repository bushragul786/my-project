import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTicket = () => {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/tickets",
        {
          subject,
          description,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setSuccess("Ticket created successfully!");

      setSubject("");
      setDescription("");
      setCategory("");

      setTimeout(() => {
        navigate("/customer/tickets");
      }, 1000);

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">

      <Card
        className="shadow mx-auto"
        style={{ maxWidth: "700px" }}
      >

        <Card.Body className="p-4">

          <h2 className="mb-2">
            Create Support Ticket
          </h2>

          <p className="text-muted mb-4">
            Tell us about your problem.
          </p>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">

              <Form.Label>
                Subject
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter your problem"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Explain your problem..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

            </Form.Group>

            <Form.Group className="mb-4">

              <Form.Label>
                Category
              </Form.Label>

              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >

                <option value="">
                  Select Category
                </option>

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

            <div className="d-flex gap-2">

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/customer")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Ticket"}
              </Button>

            </div>

          </Form>

        </Card.Body>

      </Card>

    </Container>
  );
};

export default CreateTicket;