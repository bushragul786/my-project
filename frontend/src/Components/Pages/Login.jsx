import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export const Login = () => {

    const navigate = useNavigate();

const [form,setForm] = useState({
    email: "",
    password:"",
})

const loginHandler = async(e)=>{
    e.preventDefault();
    try{
        const response  = await axios.post(
             "http://localhost:5000/api/users/login",
             form
        )
        
    localStorage.setItem("token", response.data.token);
localStorage.setItem("username", response.data.data.username);
localStorage.setItem("email", response.data.data.email);
localStorage.setItem("role", response.data.data.role);

console.log("Role:", response.data.data.role);

toast.success("Login successfully!");

if (response.data.data.role === "agent") {
  window.location.href = "/agent/dashboard";
} else {
  window.location.href = "/customer";
}

    }catch (error) {
    console.log(error);
   toast.error("Failed to login!");
  }
};


  return (
    // Login

     <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "25rem" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>

                 {/* Email                */}
 <Form onSubmit={loginHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
          <Form.Control
              type="email"
              placeholder="Enter your email"
              value= {form.email}
              onChange={(e)=>setForm({...form,email:e.target.value})}
            />

          </Form.Group>

          {/* Password */}

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={form.password}
               onChange={(e) =>
              setForm({...form, password: e.target.value })
    }
            />
          </Form.Group>

           {/* login button */}
<Button
  type="submit"
  variant="primary"
  className="w-100"
>
  Login
</Button>



{/* signup link */}
<p className="text-center mt-3">
  Don't have an account?{" "}
  <span
    style={{ color: "blue", cursor: "pointer" }}
    onClick={() => navigate("/signup")}
  >
    Sign Up
  </span>
</p>
          
        </Form>
      </Card>
    </Container>
  );
};


export default Login;
  

