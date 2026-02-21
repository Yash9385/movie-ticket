import React from "react";

const theaters = [
  { id: 1, name: "PVR Cinemas", location: "Delhi" },
  { id: 2, name: "INOX", location: "Noida" },
  { id: 3, name: "Cinepolis", location: "Ghaziabad" },
  { id: 4, name: "Wave Cinemas", location: "Meerut" },
];

const Theaters = () => {
  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 mt-32">
      <h1 className="text-3xl font-bold mb-8">🎬 Cinema Halls</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {theaters.map((hall) => (
          <div
            key={hall.id}
            className="bg-gray-800 p-6 rounded-2xl hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{hall.name}</h2>
            <p className="text-gray-400 mt-2">{hall.location}</p>
            <button className="mt-4 px-4 py-2 bg-primary rounded-full text-sm">
              View Shows
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Theaters;