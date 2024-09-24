import Home from "./components/Dashboard/Home.js";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/authentication/Login.js";
import Register from "./components/authentication/Register.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import Reset_password from "./components/authentication/Reset_password.js";
import Otp from "./components/authentication/Otp.js";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot_password" element={<Reset_password />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
