
import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    
  const navigate = useNavigate();


  const [form, setForm] = useState({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "customer",
});

  const signupHandler = async (e) => {
  e.preventDefault();
  
      console.log("SIGNUP FORM:", form);

  try {
  const response = await axios.post(
    "http://localhost:5000/api/users/signup",
    form
  );

  localStorage.setItem(
    "username",
    response.data.data.username
  );

  localStorage.setItem(
    "email",
    response.data.data.email
  );

  console.log(response.data);

  toast.success("Signup successful!");

  setTimeout(() => {
    navigate("/login");
  }, 1000);

} catch (error) {
  console.log(error);

  toast.error(
    error.response?.data?.message || "Failed to Signup!"
  );
}
}
  return (
    
                        // SIGNUP

   <Container className="d-flex justify-content-center align-items-center min-vh-100 py-4">
     <Card style={{ width: "25rem" }} className="p-3 shadow">
        <h2 className="text-center mb-4">Signup</h2>
        <Form onSubmit={signupHandler}>



          {/* user name */}
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </Form.Group>


          {/* Email */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>

  <Form.Control
    type="email"
    placeholder="Enter email"
    value={form.email}
    onChange={(e) =>
      setForm({ ...form, email: e.target.value })
    }
  />

  <Form.Text className=" text-success" >
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

          {/* password */}

<Form.Group className="mb-3">
  <Form.Label>Password</Form.Label>

  <Form.Control
    type="password"
    placeholder="Enter Password"
    value={form.password}
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
  />
</Form.Group>

        {/* confirm password */}

<Form.Group className="mb-3">
  <Form.Label>Confirm Password</Form.Label>

  <Form.Control
    type="password"
    placeholder="Confirm Password"
    value={form.confirmPassword}
    onChange={(e) =>
      setForm({ ...form, confirmPassword: e.target.value })
    }
  />
</Form.Group>

{/* ROLE */}

<Form.Group className="mb-3">

  <Form.Label>Account Type</Form.Label>

  <Form.Select
    value={form.role}
    onChange={(e) =>
      setForm({
        ...form,
        role: e.target.value,
      })
    }
  >

    <option value="customer">
      Customer
    </option>

    <option value="agent">
      Agent
    </option>

  </Form.Select>

</Form.Group>

          {/* signup button */}

         <Button
  type="submit"
  variant="primary"
  className="w-100"
>
  Signup
</Button>
          {/* login link */}

          <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </Form>
      </Card>
    </Container>
  )
}

export default Signup
  



