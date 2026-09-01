import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home"
import Signup from "./Components/Pages/Signup";
import MyNavbar from "./Components/Pages/Navbar";
import Login from "./Components/Pages/Login";
import CustomerDashboard from "./Components/Pages/CustomerDashboard";
import CreateTicket from "./Components/Pages/CreateTicket";
import MyTickets from "./Components/Pages/MyTickets";
import TicketDetails from "./Components/Pages/TicketDetails";
import EditTicket from "./Components/Pages/EditTicket";
import AgentDashboard from "./Components/Pages/AgentDashboard";
import AgentTicketDetails from "./Components/Pages/AgentTicketDetails";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />


        <Route
          path="/customer"
          element={<CustomerDashboard />}
        />

        <Route
          path="/customer/create-ticket"
          element={<CreateTicket />}
        />
        <Route
          path="/customer/tickets"
          element={<MyTickets />}
        />
        <Route
          path="/customer/tickets/:id"
          element={<TicketDetails />}
        />

        <Route
          path="/customer/tickets/:id/edit"
          element={<EditTicket />}
        />
        <Route
          path="/agent/dashboard"
          element={<AgentDashboard />}
        />

        <Route
  path="/agent/tickets/:id"
  element={<AgentTicketDetails />}
/>


      </Routes>

      <ToastContainer />

    </BrowserRouter>

  );
};



export default App