import React from 'react'

function ConductorPanel() {
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

export default ConductorPanel
