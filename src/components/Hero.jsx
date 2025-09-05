// import React from "react";
// import { ArrowLeftRight } from "lucide-react";

// export default function Hero() {
//   return (
//     <section className="flex flex-col md:flex-row items-center px-6 md:px-16 py-16 
//                     min-h-[90vh] bg-gradient-to-l from-green-100 via-white to-green-100">

//       {/* Left: Search Section */}
//       <div className="md:w-1/2 flex flex-col items-start gap-8">
//         <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//           Track Your Bus in Real-Time
//         </h1>
//         <p className="font-inter text-lg text-gray-600 max-w-md">
//           Enter your source & destination or directly search by bus number.
//         </p>

//         {/* Search Box */}
//         <div className="w-full bg-white/90 backdrop-blur-md px-6 py-6 rounded-2xl shadow-lg border border-gray-200 space-y-4">
//           {/* Row 1: From & To */}
//           <div className="flex gap-3">
//             <input
//               type="text"
//               placeholder="Source City"
//               className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />

//             <ArrowLeftRight className="w-6 h-6 text-green-600 self-center hidden md:block" />

//             <input
//               type="text"
//               placeholder="Destination"
//               className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>

//           {/* Row 2: Bus Number */}
//           <div className="flex flex-col">
//             <span className="font-semibold text-gray-600 mb-2">OR</span>
//             <input
//               type="text"
//               placeholder="Enter Bus Number (Eg. PB20AB0001)"
//               className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>

//           {/* Row 3: Button */}
//           <button className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
//             Track Bus
//           </button>
//         </div>
//       </div>

//       {/* Right: Image */}
//       <div className="md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
//         <img
//           src="bus.png"
//           alt="Bus Tracking"
//           className="w-[420px] h-auto"
//         />
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";

export default function Hero() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const navigate = useNavigate();

  const handleTrackBus = (e) => {
    e.preventDefault();
    if (busNumber.trim().length > 0) {
      navigate(`/details?busNumber=${encodeURIComponent(busNumber.trim())}`);
    } else if (fromCity.trim().length > 0 && toCity.trim().length > 0) {
      navigate(
        `/details?from=${encodeURIComponent(fromCity.trim())}&to=${encodeURIComponent(toCity.trim())}`
      );
    } else {
      alert("Please enter either both cities or the bus number.");
    }
  };

  return (
    <section
      className="flex flex-col md:flex-row items-center px-6 md:px-16 py-16
                  min-h-[90vh] bg-gradient-to-l from-green-100 via-white to-green-100"
    >
      {/* Left: Search Section */}
      <div className="md:w-1/2 flex flex-col items-start gap-8">
        <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Track Your Bus in Real-Time
        </h1>
        <p className="font-inter text-lg text-gray-600 max-w-md">
          Enter your source & destination or directly search by bus number.
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleTrackBus}
          className="w-full bg-white/90 backdrop-blur-md px-6 py-6 rounded-2xl shadow-lg border border-gray-200 space-y-4"
        >
          {/* Row 1: From & To */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Source City"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              autoComplete="off"
            />

            <ArrowLeftRight className="w-6 h-6 text-green-600 self-center hidden md:block" />

            <input
              type="text"
              placeholder="Destination"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Row 2: Bus Number */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-600 mb-2">OR</span>
            <input
              type="text"
              placeholder="Enter Bus Number (Eg. PB20AB0001)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Row 3: Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Track Bus
          </button>
        </form>
      </div>

      {/* Right: Image */}
      <div className="md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
        <img src="bus.png" alt="Bus Tracking" className="w-[420px] h-auto" />
      </div>
    </section>
  );
}

