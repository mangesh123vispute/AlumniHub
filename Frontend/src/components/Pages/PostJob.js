// PostJobPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Home from "../Dashboard/Home"; // Import the Home layout
import axios from "axios";

gsap.registerPlugin();

const PostJobPageContent = () => {
    const formRef = useRef(null);

    // Animate form on mount
    useEffect(() => {
        gsap.from(formRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
        });
    }, []);

    const [jobData, setJobData] = useState({
        title: "",
        company: "",
        location: "",
        job_type: "",
        experience: "",
        employment: "",
        description: "",
        apply_link: "",
    });

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/jobs/", jobData);
            alert("Job posted successfully!");
            setJobData({
                title: "",
                company: "",
                location: "",
                job_type: "",
                experience: "",
                employment: "",
                description: "",
                apply_link: "",
            });
        } catch (error) {
            console.error("Error posting job:", error);
            alert("Failed to post job.");
        }
    };

    return (
        <div>
            <div
                ref={formRef}
                className="max-w-2xl mx-auto bg-white border border-purple-100 rounded-2xl shadow-xl p-8"
            >
                <h2 className="text-2xl font-bold text-purple-700 mb-2">
                    Post a New Job
                </h2>
                <p className="text-gray-600 mb-6">
                    Fill in the details below to list your opportunity.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Job Title & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="title"
                            value={jobData.title}
                            onChange={handleChange}
                            required
                            placeholder="Job Title"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
                        />
                        <input
                            name="company"
                            value={jobData.company}
                            onChange={handleChange}
                            required
                            placeholder="Company Name"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
                        />
                    </div>

                    {/* Location & Employment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            name="location"
                            value={jobData.location}
                            onChange={handleChange}
                            required
                            placeholder="Location (e.g. Remote or City, State)"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
                        />
                        <select
                            name="employment"
                            value={jobData.employment}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
                        >
                            <option value="" disabled>
                                Employment Type
                            </option>
                            <option>On-site</option>
                            <option>Remote</option>
                            <option>Hybrid</option>
                        </select>
                    </div>

                    {/* Job Type & Experience */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                            name="job_type"
                            value={jobData.job_type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
                        >
                            <option value="" disabled>
                                Job Type
                            </option>
                            <option>Full-Time</option>
                            <option>Part-Time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                        </select>
                        <select
                            name="experience"
                            value={jobData.experience}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
                        >
                            <option value="" disabled>
                                Experience Level
                            </option>
                            <option>Entry Level</option>
                            <option>Mid Level</option>
                            <option>Senior Level</option>
                        </select>
                    </div>

                    {/* Description */}
                    <textarea
                        name="description"
                        value={jobData.description}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Job Description"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
                    />

                    {/* Apply Link */}
                    <input
                        name="apply_link"
                        value={jobData.apply_link}
                        onChange={handleChange}
                        required
                        placeholder="Application URL"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
                    />

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                        Post Job
                    </button>
                </form>
            </div>
        </div>
    );
};


const PostJobPage = () => (
    <Home
        DynamicContent={PostJobPageContent}
        url="job_post"
        heading="Job Post"
    />
);

export default PostJobPage;
