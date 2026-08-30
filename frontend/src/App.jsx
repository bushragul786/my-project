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
import { ToastContainer } from 'react-toastify';

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


      </Routes>

     <ToastContainer /> 

    </BrowserRouter>
    
  );
};
  


export default App