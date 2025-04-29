import React ,{useState , useEffect} from "react";
import { FaCalendarAlt, FaGlobe } from "react-icons/fa";
import Home from "../Dashboard/Home"; // Import the Home layout
import axios from "axios";

const EventPortalContent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("/api/events/");
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-purple-700">
                    Stay Connected with Upcoming Events and Reunions
                </h1>
                <p className="text-sm text-gray-600 italic">
                    Join us for gatherings, workshops, and reunions to reconnect with your
                    peers and alma mater.
                </p>
                <p className="mt-2 text-purple-600 font-medium">
                    View Upcoming Events
                </p>
                <hr className="mt-2 border-purple-200" />
            </div>

            {/* Event Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden"
                    >
                        <img
                            src={event.image}
                            alt={event.title}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-semibold mb-2 inline-block">
                                {event.category}
                            </span>

                            <div className="flex items-center text-sm text-gray-500 space-x-4 mt-1">
                                <div className="flex items-center gap-1">
                                    <FaCalendarAlt />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaGlobe />
                                    <span>{event.mode}</span>
                                </div>
                            </div>

                            <h3 className="text-md font-bold text-purple-700 mt-3">
                                {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2">{event.description}</p>

                            <button 
                            onClick={() => window.open(event.register_link, "_blank")}
                            className="mt-4 text-sm bg-purple-100 text-purple-600 font-semibold px-4 py-2 rounded hover:bg-purple-200 transition">
                                Register Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EventPortal = () => (
    <Home
        DynamicContent={EventPortalContent}
        url="event_portal"
        heading="Event Portal"
    />
);

export default EventPortal;
