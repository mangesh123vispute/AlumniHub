// PostEventPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Home from "../Dashboard/Home"; // Import the Home layout
import axios from "axios";

gsap.registerPlugin();

const PostEventPageContent = () => {
  const formRef = useRef(null);

  // Animate form on mount
  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    mode: "",
    description: "",
    category: "",
    imageFile: null,
    register_link: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setEventData({ ...eventData, imageFile: files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(eventData).forEach((key) => {
        if (key === "imageFile" && eventData[key]) {
            // Append the image file correctly
            formData.append("image", eventData[key]);
        } else {
            formData.append(key, eventData[key]);
        }
    });

    try {
        const response = await axios.post("/api/events/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 201) {
            alert("Event posted successfully!");
            setEventData({
                title: "",
                date: "",
                time: "",
                location: "",
                mode: "",
                description: "",
                category: "",
                imageFile: null,
                register_link: "",
            });
        }
    } catch (error) {
        console.error("Error posting event:", error.response?.data || error.message);
        alert("Failed to post event.");
    }
};

  return (
    <div>
      <div
        ref={formRef}
        className="max-w-3xl mx-auto bg-white border border-purple-100 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-2">
          Post a New Event
        </h2>
        <p className="text-gray-600 mb-6">
          Let alumni know about your upcoming gathering, workshop or reunion.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
            placeholder="Event Title"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          />

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Location & Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
              placeholder="Venue (e.g., Building A, Room 101)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
            />
            <select
              name="mode"
              value={eventData.mode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
            >
              <option value="" disabled>
                Mode
              </option>
              <option>In-Person</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Category */}
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          >
            <option value="" disabled>
              Category
            </option>
            <option>Workshop</option>
            <option>Reunion</option>
            <option>Webinar</option>
            <option>Networking</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Event Description"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          />

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Event Image
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-700"
            />
          </div>

          {/* Registration Link */}
          <input
            name="register_link"
            value={eventData.register_link}
            onChange={handleChange}
            placeholder="Registration URL"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Post Event
          </button>
        </form>
      </div>
    </div>
  );
};


const PostEventPage = () => (
    <Home
        DynamicContent={PostEventPageContent}
        url="event_post"
        heading="Event Post"
    />
);

export default PostEventPage;
