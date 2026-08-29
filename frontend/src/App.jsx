import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home"
import Signup from "./Components/Pages/Signup";
import MyNavbar from "./Components/Pages/Navbar";
import Login from "./Components/Pages/Login";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
     <BrowserRouter>
    <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* <Route path="/Projects" element={<Projects />} /> */}
        
         {/* <Route path="/addProject" element={<AddProject />} /> */}


      </Routes>

     <ToastContainer /> 

    </BrowserRouter>
    
  );
};
  


export default App