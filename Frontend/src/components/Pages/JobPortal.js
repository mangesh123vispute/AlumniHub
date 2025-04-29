import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Home from "../Dashboard/Home"; // Import the Home layout
import axios from "axios";

const JobPortalContent = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        location: "",
        type: "",
        experience: "",
        search: "",
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("/api/jobs/");
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-purple-700">
                    Explore Career Opportunities
                </h1>
                <p className="text-sm text-gray-600 italic">
                    Connect with Employers and Advance Your Career
                </p>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                    Discover a wide range of job opportunities tailored to our alumni community. Whether you're
                    looking to advance your career, find a new challenge, or explore remote work, our Job Portal
                    connects you with top employers and exclusive job postings.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-center mb-10">
                <select
                    className="px-4 py-2 border border-purple-500 text-black rounded-lg"
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                    <option value="">Job Location</option>
                    {Array.from(new Set(jobs.map((job) => job.location))).map((location, index) => (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
                <select
                    className="px-4 py-2 border border-purple-500 text-black rounded-lg"
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                    <option value="">Job Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                </select>
                <select
                    className="px-4 py-2 border border-purple-500 text-black rounded-lg"
                    onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                >
                    <option value="">Experience Level</option>
                    {Array.from(new Set(jobs.map((job) => job.experience))).map((experience, index) => (
                        <option key={index} value={experience}>
                            {experience}
                        </option>
                    ))}
                </select>
                <div className="flex items-center px-4 py-2 border-purple-500 text-black rounded-lg w-60">
                    <input
                        type="text"
                        placeholder="Search bar"
                        className="flex-1 outline-none px-4 py-2 border border-purple-500 text-black rounded-lg"
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                    >
                        <h2 className="text-xl font-semibold text-purple-700">
                            {job.title}{" "}
                            <span className="text-sm text-gray-500 font-medium">
                                {job.experience}
                            </span>
                        </h2>
                        <div className="flex items-center mt-2 gap-x-4 flex-wrap">
                            <p className="text-gray-700">Company: {job.company}</p>
                            <p className=" text-gray-600">Location: {job.location}</p>
                            <p className=" text-gray-600">Job Type: {job.job_type}</p>
                        </div>

                        <p className="mt-2 text-gray-700">
                            <span className="font-bold">Job Description –</span> {job.description}
                        </p>
                        <button
                            onClick={() => window.open(job.apply_link, "_blank")}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">
                            Apply Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const JobPortal = () => (
    <Home
        DynamicContent={JobPortalContent}
        url="job_portal"
        heading="Job Portal"
    />
);

export default JobPortal;
