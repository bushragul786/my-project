import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import homeBg from "../../assets/home.avif";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className="text-center pt-5">

        <h1 className="text-white">
          WELCOME TO HOME PAGE
        </h1>

        {/* Login */}
        <Button
          variant="primary"
          className="me-3 mt-5"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        {/* Signup */}
        <Button
          variant="success"
          className="me-3 mt-5"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>

        {/* Customer Dashboard */}
        <Button
          variant="warning"
          className="me-3 mt-5"
          onClick={() => navigate("/customer")}
        >
          Customer Dashboard
        </Button>

        {/* Create Ticket */}
        <Button
          variant="info"
          className="me-3 mt-5"
          onClick={() => navigate("/customer/create-ticket")}
        >
          Create Ticket
        </Button>

        

      </Container>
    </div>
  );
};

export default Home;