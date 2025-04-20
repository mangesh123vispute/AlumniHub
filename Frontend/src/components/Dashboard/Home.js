import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
import AddAdmin from "../Pages/AddAdmin";
import Footer from "./Footer";

const Home = ({ DynamicContent, url, heading = "Dashboard" }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-white to-purple-200">
      {/* Top Header */}
      <Header />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64">
          <SideNav />
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Page Header / Breadcrumbs */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-purple-700 mb-2 md:mb-0">
              {heading}
            </h1>
            <nav>
              <ol className="flex items-center text-sm  space-x-2">
                <li>
                  <Link to="/" className="hover:text-purple-700">
                    Home
                  </Link>
                </li>
                <li>/</li>
                {/* <li className="text-gray-500">{url || "Home"}</li> */}
              </ol>
            </nav>
          </div>

          {/* Divider + Dynamic Content + Divider */}
          {/* <div className="bg-white shadow rounded-lg p-5"> */}
            <hr className="border-purple-200 mb-5" />
            {DynamicContent && <DynamicContent />}
            <hr className="border-purple-200 mt-5" />
          {/* </div> */}
        </main>
      </div>

      {/* Modals and Footer */}
      <AddAdmin />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
