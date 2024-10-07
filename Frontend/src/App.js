import Home from "./components/Dashboard/Home.js";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/authentication/Login.js";
import Register from "./components/authentication/Register.js";
import Profile from "./components/Pages/Profile.js";
import AboutUs from "./components/Pages/Aboutus.js";
import Home2 from "./components/Pages/Home2.js";
import Error from "./components/Pages/Error.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AddHodPost from "./components/Pages/HOD/AddHodPost.js";
import AllPost from "./components/Pages/AllPost.js";
import YourPosts from "./components/Pages/YourPosts.js";

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
            path="/home2"
            element={<ProtectedRoute element={<Home2 />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/add_hod_post"
            element={<ProtectedRoute element={<AddHodPost />} />}
          />
          <Route
            path="/all_posts"
            element={<ProtectedRoute element={<AllPost />} />}
          />
          <Route
            path="/your_posts"
            element={<ProtectedRoute element={<YourPosts />} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<Error />} />
          {/* <Route path="/forgot_password" element={<ProtectedRoute element={<Reset_password />} />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
