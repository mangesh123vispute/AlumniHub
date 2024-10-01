import Home from "./components/Dashboard/Home.js";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/authentication/Login.js";
import Register from "./components/authentication/Register.js";
import Profile from "./components/Pages/Profile.js";
import Error from "./components/Pages/Error.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import Reset_password from "./components/authentication/Reset_password.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
 


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
          {/* <Route path="/forgot_password" element={<ProtectedRoute element={<Reset_password />} />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
