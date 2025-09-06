import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <section className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Admin Portal
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Select a panel to continue with your administrative tasks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/conductor" 
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl"
            >
              Conductor Panel
            </Link>
            <Link 
              to="/manager" 
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Transport Manager
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Conductor() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [userId, setUserId] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [authError, setAuthError] = React.useState('')

  const buses = React.useMemo(() => ([
    { id: 'bus-1', busNumber: 'PB20AB0001', driverName: 'Arjun Singh', route: 'Amritsar → Jalandhar', totalSeats: 40, occupiedSeats: 18 },
    { id: 'bus-2', busNumber: 'PB08CD1122', driverName: 'Meera Sharma', route: 'Ludhiana → Chandigarh', totalSeats: 36, occupiedSeats: 20 },
    { id: 'bus-3', busNumber: 'PB10EF3344', driverName: 'Harpreet Kaur', route: 'Patiala → Mohali', totalSeats: 42, occupiedSeats: 25 },
    { id: 'bus-4', busNumber: 'PB02GH5566', driverName: 'Rohit Verma', route: 'Bathinda → Faridkot', totalSeats: 38, occupiedSeats: 12 },
    { id: 'bus-5', busNumber: 'PB15IJ7788', driverName: 'Navdeep Singh', route: 'Hoshiarpur → Pathankot', totalSeats: 40, occupiedSeats: 30 },
  ]), [])

  const [state, setState] = React.useState({
    selectedBusId: 'bus-1',
    seats: Object.fromEntries(buses.map(b => [b.id, b.occupiedSeats]))
  })

  // Route-specific passwords (demo values)
  const routePasswords = React.useMemo(() => ({
    'bus-1': 'amr-jal-001',
    'bus-2': 'ldh-chd-002',
    'bus-3': 'pta-moh-003',
    'bus-4': 'btd-frk-004',
    'bus-5': 'hsp-ptk-005',
  }), [])

  const selectedBus = buses.find(b => b.id === state.selectedBusId) || buses[0]
  const occupiedSeats = state.seats[selectedBus.id]
  const availableSeats = selectedBus.totalSeats - occupiedSeats

  function handleLogin(e) {
    e.preventDefault()
    const requiredPassword = routePasswords[state.selectedBusId]
    const isUserOk = userId.trim().length > 0 // any non-empty ID for demo
    if (isUserOk && password === requiredPassword) {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Invalid credentials for selected route')
    }
  }

  function addSeat() {
    setState(prev => ({
      ...prev,
      seats: { ...prev.seats, [selectedBus.id]: Math.max(0, prev.seats[selectedBus.id] - 1) }
    }))
  }

  function subtractSeat() {
    setState(prev => ({
      ...prev,
      seats: { ...prev.seats, [selectedBus.id]: Math.min(selectedBus.totalSeats, prev.seats[selectedBus.id] + 1) }
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <section className="flex items-center justify-center min-h-[80vh] px-6 py-16">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-green-100 p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Conductor Panel</h2>

          {/* Step 1: Route/Bus selection shown first */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Route / Bus
            </label>
            <select
              value={state.selectedBusId}
              onChange={e => setState(s => ({ ...s, selectedBusId: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {buses.map(b => (
                <option key={b.id} value={b.id}>{b.busNumber} — {b.route}</option>
              ))}
            </select>
          </div>

          {/* Step 2: Authentication after route selection */}
          {!isAuthenticated && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Login</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <input 
                    value={userId} 
                    onChange={e => setUserId(e.target.value)} 
                    placeholder="conductor"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password (route-specific)</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="enter route password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                {!!authError && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{authError}</div>}
                <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                  Sign in
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Controls after auth */}
          {isAuthenticated && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50">
                  <span className="text-gray-600">Bus Number</span>
                  <span className="font-semibold text-gray-900">{selectedBus.busNumber}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50">
                  <span className="text-gray-600">Driver Name</span>
                  <span className="font-semibold text-gray-900">{selectedBus.driverName}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50">
                  <span className="text-gray-600">Route</span>
                  <span className="font-semibold text-gray-900">{selectedBus.route}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50">
                  <span className="text-gray-600">Total Seats</span>
                  <span className="font-semibold text-gray-900">{selectedBus.totalSeats}</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-green-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Occupied Seats</span>
                  <span className="text-2xl font-bold text-gray-900">{occupiedSeats}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Available Seats</span>
                  <span className={`text-2xl font-bold ${availableSeats > 0 ? "text-green-700" : "text-red-600"}`}>
                    {availableSeats}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6">
                <button 
                  onClick={addSeat} 
                  className="px-8 py-4 bg-green-600 text-white font-bold text-xl rounded-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl"
                >
                  +
                </button>
                <button 
                  onClick={subtractSeat} 
                  className="px-8 py-4 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transition shadow-lg hover:shadow-xl"
                >
                  -
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function TransportManager() {
  const [activeTab, setActiveTab] = React.useState('routes')

  // Dummy data for routes
  const routes = [
    { id: 'R01', name: 'Downtown Loop', stops: 15, activeBuses: 2 },
    { id: 'R02', name: 'University Express', stops: 8, activeBuses: 1 },
    { id: 'R03', name: 'Crosstown Connector', stops: 22, activeBuses: 2 },
    { id: 'R04', name: 'Suburb Shuttle', stops: 18, activeBuses: 0 },
    { id: 'R05', name: 'Airport Express', stops: 12, activeBuses: 1 }
  ]

  // Dummy data for buses
  const buses = [
    { id: 'B101', assignedRoute: 'R01', totalSeats: 40 },
    { id: 'B102', assignedRoute: 'R01', totalSeats: 40 },
    { id: 'B201', assignedRoute: 'R02', totalSeats: 30 },
    { id: 'B301', assignedRoute: 'R03', totalSeats: 50 },
    { id: 'B302', assignedRoute: 'R03', totalSeats: 50 }
  ]

  // Dummy data for announcements
  const announcements = [
    {
      title: 'Service Update: Route R02',
      description: 'Route R02 will have a temporary detour on 5th Ave due to road construction. Expect minor delays.',
      timestamp: '8/15/2024, 4:00:00 PM'
    },
    {
      title: 'New Electric Buses Deployed',
      description: 'We are excited to announce the deployment of 5 new all-electric buses on the Crosstown Connector route!',
      timestamp: '8/14/2024, 7:30:00 PM'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'routes' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>Routes</span>
          </button>
          <button
            onClick={() => setActiveTab('buses')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'buses' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
            </svg>
            <span>Buses</span>
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'announcements' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span>Announcements</span>
          </button>
        </div>

        {/* Routes Section */}
        {activeTab === 'routes' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Routes</h2>
                <p className="text-gray-600">Add, edit, or remove bus routes from the system.</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Route</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Buses</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {routes.map((route) => (
                    <tr key={route.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.stops}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.activeBuses}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Buses Section */}
        {activeTab === 'buses' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Buses</h2>
                <p className="text-gray-600">View and manage the fleet of buses.</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Bus</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Seats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {buses.map((bus) => (
                    <tr key={bus.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bus.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bus.assignedRoute}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bus.totalSeats}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Announcements Section */}
        {activeTab === 'announcements' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Post Announcement */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Post an Announcement</h3>
              <p className="text-gray-600 mb-6">Publish updates to all commuters.</p>
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>New Announcement</span>
              </button>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Announcements</h3>
              <p className="text-gray-600 mb-6">A log of previously posted announcements.</p>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                    <p className="text-xs text-gray-500">{announcement.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/conductor" element={<Conductor />} />
        <Route path="/manager" element={<TransportManager />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}
