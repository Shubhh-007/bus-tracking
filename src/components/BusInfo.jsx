
import React from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
     import { FiPhoneCall, FiUser } from "react-icons/fi";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  shadowUrl: iconShadowUrl,
});

const buses = [
  {
    busNumber: "PB20480001",
    name: "Shiv Shakti Express",
    status: "Running",
    statusText: "Running",
    statusColor: "bg-green-600",
    source: "Banaras",
    destination: "Gorakhpur",
    driverName: "Rajesh Singh",
    driverPhone: "+91 9898989898",
    seatAvailable: 17,
    seatCapacity: 50,
    currentStop: "Ayodhya - Bypass (W)",
    routeStops: [
      { name: "Banaras", scheduled: "07:00 AM" },
      { name: "Jaunpur", scheduled: "07:40 AM" },
      { name: "Sultanpur", scheduled: "08:30 AM" },
      { name: "Ayodhya - Bypass (W)", scheduled: "09:30 AM" },
      { name: "Gonda", scheduled: "10:20 AM" },
      { name: "Gorakhpur", scheduled: "11:10 AM" },
    ],
    currentLocation: { city: "Ayodhya", lat: 26.7997, lng: 82.2043 },
  },
];

export default function BusInfo() {
  const { busNumber } = useParams();
  const bus = buses.find((b) => b.busNumber === busNumber);

  if (!bus)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 font-semibold text-xl">
        Bus not found.
      </div>
    );

  const seatPercent = (bus.seatAvailable / bus.seatCapacity) * 100;
  const currentIdx = bus.routeStops.findIndex((stop) => stop.name === bus.currentStop);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 p-12 font-sans max-w-7xl mx-auto rounded-3xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-12 bg-white rounded-3xl shadow-xl p-10">
        {/* LEFT INFO PANEL */}
        <div className="flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl font-extrabold text-green-900 tracking-tight max-w-[320px] truncate">
              {bus.name}{" "}
              <span className="text-gray-400 text-2xl font-normal ml-2">
                ({bus.busNumber})
              </span>
            </h1>
            <div
              className={`px-5 py-2 rounded-full text-white font-semibold text-lg ${bus.statusColor} shadow-md select-none`}
              aria-label={`Status: ${bus.statusText}`}
            >
              {bus.statusText}
            </div>
          </div>

          {/* Source-Destination */}
          <p className="text-green-700 text-2xl font-bold mb-8 flex items-center gap-3">
            <span>{bus.source}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#22c55e"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>{bus.destination}</span>
          </p>


{/* Driver Info */}
<div className="mb-10 space-y-2">
  <div className="flex items-center gap-2 text-gray-900 text-lg font-semibold leading-none">
    <FiUser className="text-green-600 w-6 h-6 flex-shrink-0" aria-hidden="true" />
    <span className="ml-1 leading-none">Driver: {bus.driverName}</span>
  </div>

  <div className="flex items-center gap-2 text-green-700 text-lg font-semibold leading-none">
    <FiPhoneCall className="text-green-600 w-6 h-6 flex-shrink-0" aria-hidden="true" />
    <a
      href={`tel:${bus.driverPhone}`}
      className="hover:underline ml-1 leading-none"
      aria-label={`Call ${bus.driverName}`}
    >
      {bus.driverPhone}
    </a>
  </div>
</div>


          {/* Seat availability */}
          <div>
            <label className="block mb-2 text-xl font-bold text-green-800">
              Seats Available
            </label>
            <div className="relative rounded-full h-12 bg-green-200 overflow-hidden shadow-inner cursor-pointer group">
              <div
                className="h-full bg-gradient-to-r from-green-700 via-green-600 to-green-500 rounded-full transition-all duration-1000 group-hover:from-green-800 group-hover:via-green-700 group-hover:to-green-600"
                style={{ width: `${seatPercent}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-extrabold text-green-900 text-3xl select-none pointer-events-none">
                {bus.seatAvailable} / {bus.seatCapacity}
              </div>
            </div>
          </div>

          {/* Horizontal Route Timeline */}
          <div className="mt-14">
            <h2 className="text-green-800 font-bold text-2xl mb-6">Route Timeline</h2>
            <div className="overflow-x-auto relative pb-6 -mx-6 px-6 border rounded-lg bg-green-50 shadow-inner">
              <div className="flex items-center space-x-14 min-w-max">
                {/* Progress bar background */}
                <div
                  className="absolute top-[36px] left-6 right-6 h-1 bg-gradient-to-r from-green-600 via-green-400 to-green-300 rounded-full z-0"
                  style={{ transform: "translateY(-50%)" }}
                />
                {bus.routeStops.map((stop, idx) => {
                  const isCurrent = idx === currentIdx;
                  const done = idx < currentIdx;

                  return (
                    <div
                      key={stop.name}
                      className="relative z-10 flex flex-col items-center cursor-default min-w-[120px] text-center"
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${
                          isCurrent
                            ? "bg-green-600 border-green-900 animate-pulse"
                            : done
                            ? "bg-green-400 border-green-700"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {done && !isCurrent && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {isCurrent && <span className="w-4 h-4 bg-white rounded-full" />}
                      </div>
                      <p
                        className={`mt-3 font-semibold ${
                          isCurrent ? "text-green-700" : done ? "text-green-600" : "text-gray-400"
                        }`}
                        title={stop.name}
                      >
                        {stop.name}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isCurrent ? "text-green-700" : "text-gray-400"
                        }`}
                      >
                        {stop.scheduled}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - MAP */}
        <div className="bg-green-50 rounded-tr-3xl rounded-br-3xl p-8 flex flex-col items-center justify-start md:w-full">
          <h2 className="text-center text-3xl font-bold text-green-800 mb-10">
            Current Location: <span className="text-green-700">{bus.currentLocation.city}</span>
          </h2>
          <div className="w-full rounded-xl shadow-xl overflow-hidden" style={{ height: 420 }}>
            <MapContainer
              center={[bus.currentLocation.lat, bus.currentLocation.lng]}
              zoom={12}
              scrollWheelZoom
              style={{ height: "100%", width: "100%" }}
              key={`${bus.currentLocation.lat}-${bus.currentLocation.lng}`}
            >
              <TileLayer
                attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[bus.currentLocation.lat, bus.currentLocation.lng]}>
                <Popup>{bus.name} is located here.</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
