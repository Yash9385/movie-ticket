import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const theaters = [
  { id: 1, name: "PVR Cinemas", location: "Delhi" },
  { id: 2, name: "INOX", location: "Noida" },
  { id: 3, name: "Cinepolis", location: "Ghaziabad" },
  { id: 4, name: "Wave Cinemas", location: "Meerut" },
];

const Theaters = () => {
  const navigate = useNavigate(); // 👈 important

  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 mt-32">
      <h1 className="text-3xl font-bold mb-10 flex items-center gap-2">
        🎬 <span>Cinema Halls</span>
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {theaters.map((hall) => (
          <div
            key={hall.id}
            className="relative group bg-gradient-to-br from-gray-800 to-gray-900 
            p-6 rounded-2xl border border-gray-700 shadow-lg 
            hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

            <h2 className="text-xl font-semibold relative z-10">
              {hall.name}
            </h2>

            <p className="text-gray-400 mt-3 flex items-center gap-2 relative z-10">
              <MapPin size={16} /> {hall.location}
            </p>

            <button
              onClick={() => navigate(`/theater/${hall.id}`)}
              className="mt-4 px-4 py-2 bg-primary rounded-full text-sm"
            >
              View Shows
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Theaters;