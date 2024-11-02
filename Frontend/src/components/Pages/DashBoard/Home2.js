import React, { useContext } from "react";
import Home from "../../Dashboard/Home.js";
import AuthContext from "../../../context/AuthContext.js";
import AlumniDashboard from "./AlumniDashboard.js";
import StudentDashboard from "./StudentDashboard.js";
import AdminDashboard from "./AdminDashboard.js";


const Home2Content = () => {
 
    
};
const Home2 = () => {
  return <Home DynamicContent={Home2Content} url="home" heading="Home"/>;
};
export default Home2;
