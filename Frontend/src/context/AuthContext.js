import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState('success');
  const [title, setTitle] = useState('Notification');

  const showNotification = (msg, iconType, titleText) => {
    
    setMessage(msg);
    setIcon(iconType);
    setTitle(titleText);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false); // This closes the notification
  };

  const navigate = useNavigate();
  //* initial values and states
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(false);

  //* login
  let loginUser = async (e) => {
    console.log("logging in", e.target.username.value, e.target.password.value);

    e.preventDefault();
    try {
      let response = await fetch("http://127.0.0.1:8000/api/accounts/login2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      let data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data.token);
        setUser(jwtDecode(data.token.access));
        localStorage.setItem("authTokens", JSON.stringify(data.token));
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(data.data.message);
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      // Handle the error here, e.g., show a message to the user
    }
  };
  //Profile
  // let  viewProfile = async()=>{
  //   try {
  //     let response = await fetch("http://127.0.0.1:8000/api/settings2", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: e.target.username.value,
  //         password: e.target.password.value,
  //       }),
  //     });

  //     let data = await response.json();

  
  //   } catch (error) {
  //     console.error("An error occurred while logging in:", error);
  //     // Handle the error here, e.g., show a message to the user
  //   }
  // }
  //* logout
  let logoutUser = () => {
    console.log("logging out");
    try {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      alert("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("An error occurred while logging out:", error);
      // Handle the error here, e.g., show a message to the user
    }
  };

  //* update tokens
  let updateTokens = async () => {
    try {
      if (!authTokens) {
        return;
      }
      let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      });

      let data = await response.json();
      console.log("i am updating data", data);

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      }
    } catch (error) {
      console.error("An error occurred while updating tokens:", error);
      // Handle the error here, e.g., show a message to the user
    }
  };

  //* verify tokens and update if needed
  const verifyTokensAndUpdate = async () => {
    try {
      if (!authTokens) {
        return;
      }

      // Verify access token
      let response = await fetch("http://127.0.0.1:8000/api/token/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authTokens?.access }),
      });

      console.log("verifyAccessTokenAndUpdate", response.status, response.ok);
      if (!response.ok) {
        // If access token is not valid, update tokens
        await updateTokens();
        return;
      }

      // Check if refresh token needs refreshing
      response = await fetch("http://127.0.0.1:8000/api/token/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authTokens?.refresh }),
      });

      console.log("verifyRefreshTokenAndUpdate", response.status, response.ok);
      if (!response.ok) {
        // If refresh token is not valid, log out the user
        await logoutUser();
        return;
      }
    } catch (error) {
      console.error(
        "An error occurred while verifying and updating tokens:",
        error
      );
      // Handle the error here, e.g., show a message to the user
    }
  };

  let registerUser = async (e) => {
    console.log("registering user");
    e.preventDefault();
    try {
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      const email = e.target.email.value;
      const username = e.target.username.value;
      const password1 = e.target.password1.value;
      const password2 = e.target.password2.value;

      // validation
      if (
        !(firstName && lastName && email && username && password1 && password2)
      ) {
        alert("All fields are required");
        return;
      }
      if (password1 !== password2) {
        alert("Passwords do not match");
        return;
      }

      setLoading(true);
      // calling to the backend
      let response = await fetch(
        "http://127.0.0.1:8000/api/accounts/register2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: password1,
          }),
        }
      );
      setLoading(false);

      let data = await response.json();
      console.log("This is the data", data);

      if (response.status === 200) {
        alert(data.data.message);
        setAuthTokens(data.token);
        setUser(jwtDecode(data.token.access));
        localStorage.setItem("authTokens", JSON.stringify(data.token));
        navigate("/login");
      } else {
        alert(data.data.message);
      }
    } catch (error) {
      console.error("An error occurred while registering:", error);
    }
  };

  //* context data and functions
  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    loading: loading,
    setLoading: setLoading,
    setIsOpen:setIsOpen,
    setMessage: setMessage,
    setIcon: setIcon,
    setTitle: setTitle,
    isOpen: isOpen,
    message: message,
    icon: icon,
    title: title,
    showNotification: showNotification,
    handleClose:handleClose

  };

  //* useEffect
  useEffect(() => {
    verifyTokensAndUpdate();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
