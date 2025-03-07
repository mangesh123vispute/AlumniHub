import Error from "./components/ErrorPage/Error.js";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/authentication/Login.js";
import ActivateEmail from "./components/authentication/ActivateEmail.js";
import UpdateStudentProfileInfo from "./components/Pages/UpdateStudentProfileInfo.js";
import UpdateAlumniProfileInfo from "./components/Pages/UpdateAlumniProfileInfo.js";
import Register from "./components/authentication/Register.js";
import Profile from "./components/Pages/Profile.js";
import Requests from "./components/Pages/Requests.js";
import AllAlumnis from "./components/Pages/AllAlumnis.js";
import AllHods from "./components/Pages/AllHods.js";
import AllStudent from "./components/Pages/AllStudents.js";
import AboutUs from "./components/Pages/Aboutus.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./components/Landing.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import AddHodPost from "./components/Pages/HOD/AddHodPost.js";
import AddAlumniPost from './components/Pages/AddAlumniPost.js'
import AllPost from "./components/Pages/AllPost.js";
import UnverifiedAlumniPost from "./components/Pages/UnverifiedAlumniPost.js";
import YourPosts from "./components/Pages/YourPosts.js";
import ForgotPassword from "./components/authentication/Forgot_password.js";
import ForgotUsername from "./components/authentication/Forgot_username.js";
import GetActivationEmail from "./components/authentication/GetActivationEmail.js";
import ResetPassword from "./components/authentication/Reset_password.js";
import ResetUsername from "./components/authentication/Reset_username.js";
import MyProfile from "./components/Pages/MyProfile.js";

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/*No authorization routes  */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/activate_email/:useremail"
            element={<ActivateEmail />}
          />
          <Route
            path="/update_Student_profile_info/:id/:username/:graduation_year/"
            element={<UpdateStudentProfileInfo />}
          />
          <Route
            path="/update_Alumni_profile_info/:id/:username/:graduation_year/"
            element={<UpdateAlumniProfileInfo />}
          />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/forgot_username" element={<ForgotUsername />} />
          <Route
            path="/send_activation_Email"
            element={<GetActivationEmail />}
          />
          <Route
            path="/reset-password/:uidb64/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/reset-username/:uidb64/:token"
            element={<ResetUsername />}
          />

          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/myprofile"
            element={<ProtectedRoute element={<MyProfile />} />}
          />
          <Route
            path="/all_alumnis"
            element={<ProtectedRoute element={<AllAlumnis />} />}
          />
          <Route
            path="/all_hods"
            element={<ProtectedRoute element={<AllHods />} />}
          />
          <Route
            path="/all_students"
            element={<ProtectedRoute element={<AllStudent />} />}
          />

          <Route
            path="/all_posts"
            element={<ProtectedRoute element={<AllPost />} />}
          />

          {/* only admin  */}

          <Route
            path="/requests"
            element={
              <ProtectedRoute
                element={<Requests />}
                Admin_only={true}
                is_AllowedtoAccessRequestPage={true}
              />
            }
          />

          <Route
            path="/unverifiedalumni_posts"
            element={
              <ProtectedRoute
                element={<UnverifiedAlumniPost />}
                Admin_only={true}
                is_AllowedtoAccessAlumniPostRequestPage={true}
              />
            }
          />

          {/* tested */}

          <Route
            path="/add_hod_post"
            element={
              <ProtectedRoute element={<AddHodPost />} Admin_only={true} />
            }
          />

          {/* only alumni  */}

          <Route
            path="/add_alumni_post"
            element={
              <ProtectedRoute element={<AddAlumniPost />} alumni_only={true} />
            }
          />

          <Route
            path="/your_posts"
            element={<ProtectedRoute element={<YourPosts  />} notByStudent={true} />}
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
