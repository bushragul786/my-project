import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const navigate = useNavigate();

  // after signup show username or email

  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  //  Logout function

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>

        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-2">

           
            {/*  
token mil jae to username or email show hoga */}
            {token ? (
              <>
                <Navbar.Text className="text-light">
                  👤 {username}
                </Navbar.Text>

                <Navbar.Text className="text-light">
                  📧 {email}
                </Navbar.Text>

                {role === "customer" && (
                  <Button
                    variant="outline-info"
                    onClick={() => navigate("/customer")}
                  >
                    Customer Dashboard
                  </Button>
                )}

                {role === "agent" && (
                  <Button
                    variant="outline-info"
                    onClick={() => navigate("/agent/dashboard")}
                  >
                    Agent Dashboard
                  </Button>
                )}

                <Button
                  variant="outline-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  variant="warning"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
};

export default MyNavbar;

