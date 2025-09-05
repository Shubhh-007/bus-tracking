import React from "react";
import { useNavigate } from "react-router-dom";

const buses = [
  {
    name: "ABC Bus",
    busNumber: "PB20480001",
    driver: "Ram Sharma",
    status: "Running",
    seatAvailable: 30,
    totalSeats: 50,
  },
  {
    name: "BAC Bus",
    busNumber: "PB20480002",
    driver: "Vikas Verma",
    status: "Delayed",
    seatAvailable: 12,
    totalSeats: 50,
  },
  {
    name: "CBC Bus",
    busNumber: "PB20480003",
    driver: "Sohan Lal",
    status: "On Time",
    seatAvailable: 46,
    totalSeats: 50,
  },
];

const statusStyles = {
  Running: "bg-green-400 text-white shadow-lg",
  Delayed: "bg-yellow-400 text-white shadow-lg",
  "On Time": "bg-blue-500 text-white shadow-lg",
};

export default function BusDetails() {
  const fromCity = "Banaras";
  const toCity = "Gorakhpur";
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 py-16 px-6 font-poppins container mx-auto">
      {/* Route */}
      <div className="max-w-4xl mx-auto flex justify-center space-x-6 rounded-3xl bg-white/40 backdrop-blur-md shadow-lg p-6 mb-12 select-none">
        <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-full px-5 py-3 shadow-md border border-green-400 w-40 text-green-800 font-semibold text-xl justify-center cursor-not-allowed">
          {fromCity}
        </div>
        <div className="text-4xl text-green-700 self-center select-text animate-pulse">⇄</div>
        <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-sm rounded-full px-5 py-3 shadow-md border border-green-400 w-40 text-green-800 font-semibold text-xl justify-center cursor-not-allowed">
          {toCity}
        </div>
      </div>

      {/* Header */}
      <h2 className="max-w-4xl mx-auto text-center text-3xl md:text-4xl font-extrabold text-green-800 drop-shadow-md mb-12">
        Live Bus Status
      </h2>

      {/* Bus Cards */}
      <div className="max-w-4xl mx-auto space-y-10">
        {buses.map((bus) => {
          const seatPercentage = (bus.seatAvailable / bus.totalSeats) * 100;

          return (
            <div
              key={bus.busNumber}
              onClick={() => navigate(`/details/${encodeURIComponent(bus.busNumber)}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(`/details/${encodeURIComponent(bus.busNumber)}`);
              }}
              aria-label={`View details for ${bus.name}`}
              className="relative bg-white/[0.15] backdrop-blur-lg rounded-3xl shadow-2xl px-8 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:scale-[1.025] transition-transform duration-300 ease-in-out cursor-pointer"
            >
              <div>
                <h3 className="text-2xl font-bold text-green-900">{bus.name}</h3>
                <p className="text-green-800 mt-1 text-sm font-semibold tracking-wide select-text">
                  Bus Number: <span className="font-bold">{bus.busNumber}</span>
                </p>
                <p className="mt-2 text-green-800 text-sm select-text">
                  <b>Driver:</b> {bus.driver}
                </p>
                <p
                  className={`inline-block mt-3 px-4 py-1 rounded-full text-white text-sm font-semibold tracking-wide cursor-default select-none ${
                    statusStyles[bus.status]
                  }`}
                  title={`Status: ${bus.status}`}
                >
                  {bus.status}
                </p>
              </div>

              <div className="w-full md:w-60 flex flex-col items-end">
                <label className="mb-2 text-green-900 font-semibold tracking-wide select-none">
                  Seat Availability
                </label>
                <div
                  className="w-full h-6 relative rounded-full bg-green-300 overflow-hidden shadow-inner group"
                  role="progressbar"
                  aria-valuenow={seatPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-gradient-to-r from-green-600 via-green-500 to-green-400 rounded-full transition-all duration-700 ease-in-out group-hover:from-green-700 group-hover:via-green-600 group-hover:to-green-500"
                    style={{ width: `${seatPercentage}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-green-900 font-extrabold drop-shadow-sm select-none pointer-events-none">
                    {bus.seatAvailable} / {bus.totalSeats}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
