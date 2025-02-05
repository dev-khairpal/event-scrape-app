import { useEffect, useState } from "react";
import axios from "axios";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const Card = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://event-scrape-app-production.up.railway.app/events"
      );
      setEvents(response.data);
    };
    fetchData();
  }, []);

  // Function to proceed without actual verification
  const proceedToBooking = () => {
    window.location.href = selectedEvent;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((item) => (
        <div
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:transform hover:translate-y-1 hover:shadow-xl transition duration-300"
          key={item.title}
        >
          <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
          <div className="flex gap-2">
            <MdDateRange />
            <p className="text-base mb-2 text-gray-400">{item.date}</p>
          </div>
          <div className="flex gap-2">
            <FaLocationDot />
            <p className="text-base mb-4 text-gray-400">{item.hostedBy}</p>
          </div>
          <button
            onClick={() => {
              setSelectedEvent(item.link);
              setShowModal(true);
              setStep(1);
              setEmail("");
              setOtp("");
            }}
            className=" border border-white px-4 py-2 rounded-full text-teal-400 hover:text-teal-600 cursor-pointer"
          >
            Book Tickets
          </button>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40">
          <div className="bg-gray-900 text-white p-12 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-8 text-center">
              {step === 1 ? "Enter Your Email" : "Enter OTP"}
            </h2>

            {step === 1 ? (
              <>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-black p-3 mb-8 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (email.trim() !== "") {
                      setStep(2);
                    } else {
                      alert("Please enter your email.");
                    }
                  }}
                  className="w-full border  rounded-full bg-gray-900 hover:bg-gray-800 cursor-pointer text-teal-400 py-3 transition"
                >
                  Generate OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 mb-4 border bg-white text-black border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-center">test OTP = 1234</p>
                <button
                  onClick={proceedToBooking}
                  className="w-full border mt-4   rounded-full bg-gray-900 hover:bg-gray-800 cursor-pointer text-green-500 py-3 transition"
                >
                  Proceed
                </button>
              </>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full border mt-4   rounded-full bg-gray-900 hover:bg-gray-800 cursor-pointer text-red-500 py-3 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
