// Famous Punjab Bus Routes with Detailed Information
export const famousRoutesPunjab = [
  {
    id: "PB001",
    route: "Amritsar → Wagah Border",
    distance: "28.3 km",
    duration: "45-60 minutes",
    frequency: "Every 15 minutes",
    startTime: "05:00 AM",
    endTime: "10:00 PM",
    highlights: [
      "Golden Temple",
      "Kapurthala architecture", 
      "Jalandhar sports hub",
      "Wagah Border ceremony"
    ],
    start_location: {
      name: "Amritsar Bus Stand",
      latitude: 31.6340,
      longitude: 74.8723,
      address: "Amritsar Railway Station Road, Amritsar"
    },
    end_location: {
      name: "Wagah Border",
      latitude: 31.5820,
      longitude: 74.5730,
      address: "Wagah Border, Attari"
    },
    stops: [
      { name: "Amritsar Bus Stand", time: "05:00", lat: 31.6340, lng: 74.8723 },
      { name: "Golden Temple", time: "05:15", lat: 31.6200, lng: 74.8765 },
      { name: "Jallianwala Bagh", time: "05:20", lat: 31.6206, lng: 74.8769 },
      { name: "Partition Museum", time: "05:25", lat: 31.6210, lng: 74.8770 },
      { name: "Attari Railway Station", time: "05:45", lat: 31.6000, lng: 74.6000 },
      { name: "Wagah Border", time: "06:00", lat: 31.5820, lng: 74.5730 }
    ],
    buses: [
      {
        busNumber: "PB20480001",
        name: "Heritage Express",
        type: "AC Deluxe",
        capacity: 50,
        currentSeats: 35,
        fare: "₹25",
        driver: "Rajinder Singh",
        phone: "+91 98765 43210",
        status: "Running",
        nextStop: "Golden Temple",
        eta: "2 min"
      },
      {
        busNumber: "PB20480002", 
        name: "Golden Temple Special",
        type: "Non-AC",
        capacity: 60,
        currentSeats: 45,
        fare: "₹15",
        driver: "Gurpreet Singh",
        phone: "+91 98765 43211",
        status: "Running",
        nextStop: "Jallianwala Bagh",
        eta: "5 min"
      },
      {
        busNumber: "PB20480003",
        name: "Border Express",
        type: "AC Semi-Sleeper",
        capacity: 40,
        currentSeats: 20,
        fare: "₹35",
        driver: "Harjinder Singh",
        phone: "+91 98765 43212",
        status: "Running",
        nextStop: "Attari Railway Station",
        eta: "8 min"
      }
    ]
  },
  {
    id: "PB002",
    route: "Chandigarh → Amritsar",
    distance: "230 km",
    duration: "4-5 hours",
    frequency: "Every 30 minutes",
    startTime: "04:00 AM",
    endTime: "11:00 PM",
    highlights: [
      "Mohali IT hub",
      "Jalandhar Devi Talab Mandir",
      "Pushpa Gujral Science City",
      "Golden Temple"
    ],
    start_location: {
      name: "Chandigarh ISBT",
      latitude: 30.7333,
      longitude: 76.7794,
      address: "Inter State Bus Terminal, Sector 17, Chandigarh"
    },
    end_location: {
      name: "Amritsar Bus Stand",
      latitude: 31.6340,
      longitude: 74.8723,
      address: "Amritsar Railway Station Road, Amritsar"
    },
    stops: [
      { name: "Chandigarh ISBT", time: "04:00", lat: 30.7333, lng: 76.7794 },
      { name: "Mohali", time: "04:30", lat: 30.7046, lng: 76.7179 },
      { name: "Ropar", time: "05:30", lat: 30.9685, lng: 76.5262 },
      { name: "Jalandhar", time: "07:00", lat: 31.3260, lng: 75.5762 },
      { name: "Kapurthala", time: "07:45", lat: 31.3800, lng: 75.3800 },
      { name: "Amritsar Bus Stand", time: "08:30", lat: 31.6340, lng: 74.8723 }
    ],
    buses: [
      {
        busNumber: "PB20480004",
        name: "Chandigarh Express",
        type: "AC Volvo",
        capacity: 50,
        currentSeats: 25,
        fare: "₹450",
        driver: "Manpreet Singh",
        phone: "+91 98765 43213",
        status: "Running",
        nextStop: "Mohali",
        eta: "10 min"
      },
      {
        busNumber: "PB20480005",
        name: "Punjab Superfast",
        type: "AC Deluxe",
        capacity: 45,
        currentSeats: 30,
        fare: "₹380",
        driver: "Jasbir Singh",
        phone: "+91 98765 43214",
        status: "Running",
        nextStop: "Ropar",
        eta: "15 min"
      },
      {
        busNumber: "PB20480006",
        name: "Golden Express",
        type: "Non-AC",
        capacity: 60,
        currentSeats: 40,
        fare: "₹280",
        driver: "Sukhdev Singh",
        phone: "+91 98765 43215",
        status: "Running",
        nextStop: "Jalandhar",
        eta: "20 min"
      }
    ]
  },
  {
    id: "PB003",
    route: "Heritage Street, Amritsar",
    distance: "1.1 km",
    duration: "10-15 minutes",
    frequency: "Every 5 minutes",
    startTime: "06:00 AM",
    endTime: "10:00 PM",
    highlights: [
      "Jallianwala Bagh",
      "Partition Museum",
      "Heritage architecture"
    ],
    start_location: {
      name: "Golden Temple",
      latitude: 31.6200,
      longitude: 74.8765,
      address: "Golden Temple, Amritsar"
    },
    end_location: {
      name: "Jallianwala Bagh",
      latitude: 31.6206,
      longitude: 74.8769,
      address: "Jallianwala Bagh, Amritsar"
    },
    stops: [
      { name: "Golden Temple", time: "06:00", lat: 31.6200, lng: 74.8765 },
      { name: "Heritage Street", time: "06:05", lat: 31.6203, lng: 74.8767 },
      { name: "Partition Museum", time: "06:10", lat: 31.6205, lng: 74.8768 },
      { name: "Jallianwala Bagh", time: "06:15", lat: 31.6206, lng: 74.8769 }
    ],
    buses: [
      {
        busNumber: "PB20480007",
        name: "Heritage Shuttle",
        type: "Electric Bus",
        capacity: 30,
        currentSeats: 20,
        fare: "₹10",
        driver: "Balwinder Singh",
        phone: "+91 98765 43216",
        status: "Running",
        nextStop: "Heritage Street",
        eta: "1 min"
      },
      {
        busNumber: "PB20480008",
        name: "Temple Express",
        type: "Mini Bus",
        capacity: 25,
        currentSeats: 15,
        fare: "₹8",
        driver: "Gurdeep Singh",
        phone: "+91 98765 43217",
        status: "Running",
        nextStop: "Partition Museum",
        eta: "3 min"
      }
    ]
  },
  {
    id: "PB004",
    route: "Guru Gobind Singh Marg",
    distance: "577 km",
    duration: "8-10 hours",
    frequency: "Every 2 hours",
    startTime: "05:00 AM",
    endTime: "08:00 PM",
    highlights: [
      "Anandpur Sahib",
      "Chamkaur Sahib",
      "Muktsar",
      "Talwandi Sabo"
    ],
    start_location: {
      name: "Anandpur Sahib",
      latitude: 31.2360,
      longitude: 76.4997,
      address: "Anandpur Sahib Bus Stand"
    },
    end_location: {
      name: "Talwandi Sabo",
      latitude: 29.9850,
      longitude: 75.0910,
      address: "Talwandi Sabo Bus Stand"
    },
    stops: [
      { name: "Anandpur Sahib", time: "05:00", lat: 31.2360, lng: 76.4997 },
      { name: "Chamkaur Sahib", time: "06:30", lat: 30.9000, lng: 76.4000 },
      { name: "Muktsar", time: "10:00", lat: 30.4740, lng: 74.5160 },
      { name: "Talwandi Sabo", time: "12:00", lat: 29.9850, lng: 75.0910 }
    ],
    buses: [
      {
        busNumber: "PB20480009",
        name: "Guru Marg Express",
        type: "AC Sleeper",
        capacity: 40,
        currentSeats: 20,
        fare: "₹650",
        driver: "Harbhajan Singh",
        phone: "+91 98765 43218",
        status: "Running",
        nextStop: "Chamkaur Sahib",
        eta: "25 min"
      },
      {
        busNumber: "PB20480010",
        name: "Sikh Heritage",
        type: "AC Deluxe",
        capacity: 45,
        currentSeats: 30,
        fare: "₹580",
        driver: "Kuldeep Singh",
        phone: "+91 98765 43219",
        status: "Running",
        nextStop: "Muktsar",
        eta: "35 min"
      }
    ]
  },
  {
    id: "PB005",
    route: "Chandigarh → Shimla",
    distance: "110 km",
    duration: "3-4 hours",
    frequency: "Every 45 minutes",
    startTime: "05:30 AM",
    endTime: "07:00 PM",
    highlights: [
      "Mall Road Shimla",
      "Jakhoo Temple",
      "Kasauli sunset points",
      "Parwanoo Timber Trail"
    ],
    start_location: {
      name: "Chandigarh ISBT",
      latitude: 30.7333,
      longitude: 76.7794,
      address: "Inter State Bus Terminal, Sector 17, Chandigarh"
    },
    end_location: {
      name: "Shimla ISBT",
      latitude: 31.1048,
      longitude: 77.1734,
      address: "Shimla Inter State Bus Terminal"
    },
    stops: [
      { name: "Chandigarh ISBT", time: "05:30", lat: 30.7333, lng: 76.7794 },
      { name: "Zirakpur", time: "06:00", lat: 30.6426, lng: 76.8173 },
      { name: "Parwanoo", time: "06:45", lat: 30.8372, lng: 76.9614 },
      { name: "Kasauli", time: "07:30", lat: 30.9000, lng: 76.9600 },
      { name: "Shimla ISBT", time: "09:00", lat: 31.1048, lng: 77.1734 }
    ],
    buses: [
      {
        busNumber: "PB20480011",
        name: "Himalayan Express",
        type: "AC Volvo",
        capacity: 50,
        currentSeats: 35,
        fare: "₹320",
        driver: "Ravinder Singh",
        phone: "+91 98765 43220",
        status: "Running",
        nextStop: "Zirakpur",
        eta: "8 min"
      },
      {
        busNumber: "PB20480012",
        name: "Hill Station Special",
        type: "AC Deluxe",
        capacity: 45,
        currentSeats: 25,
        fare: "₹280",
        driver: "Narinder Singh",
        phone: "+91 98765 43221",
        status: "Running",
        nextStop: "Parwanoo",
        eta: "12 min"
      }
    ]
  },
  {
    id: "PB006",
    route: "Himalayan Expressway",
    distance: "27.5 km",
    duration: "25-30 minutes",
    frequency: "Every 10 minutes",
    startTime: "06:00 AM",
    endTime: "09:00 PM",
    highlights: [
      "Smooth modern highway",
      "Gateway to Himachal hills"
    ],
    start_location: {
      name: "Zirakpur",
      latitude: 30.6426,
      longitude: 76.8173,
      address: "Zirakpur Bus Stand"
    },
    end_location: {
      name: "Parwanoo",
      latitude: 30.8372,
      longitude: 76.9614,
      address: "Parwanoo Bus Stand"
    },
    stops: [
      { name: "Zirakpur", time: "06:00", lat: 30.6426, lng: 76.8173 },
      { name: "Expressway Toll", time: "06:15", lat: 30.7000, lng: 76.8500 },
      { name: "Parwanoo", time: "06:30", lat: 30.8372, lng: 76.9614 }
    ],
    buses: [
      {
        busNumber: "PB20480013",
        name: "Expressway Express",
        type: "AC Deluxe",
        capacity: 40,
        currentSeats: 30,
        fare: "₹45",
        driver: "Jagtar Singh",
        phone: "+91 98765 43222",
        status: "Running",
        nextStop: "Expressway Toll",
        eta: "5 min"
      },
      {
        busNumber: "PB20480014",
        name: "Highway Shuttle",
        type: "Non-AC",
        capacity: 50,
        currentSeats: 40,
        fare: "₹35",
        driver: "Gurmeet Singh",
        phone: "+91 98765 43223",
        status: "Running",
        nextStop: "Parwanoo",
        eta: "8 min"
      }
    ]
  }
];

// Helper functions
export const getRouteById = (id) => {
  return famousRoutesPunjab.find(route => route.id === id);
};

export const getRouteByCities = (from, to) => {
  return famousRoutesPunjab.find(route => 
    route.route.toLowerCase().includes(from.toLowerCase()) && 
    route.route.toLowerCase().includes(to.toLowerCase())
  );
};

export const getAllRoutes = () => {
  return famousRoutesPunjab;
};

export const getBusByNumber = (busNumber) => {
  for (const route of famousRoutesPunjab) {
    const bus = route.buses.find(b => b.busNumber === busNumber);
    if (bus) {
      return { bus, route };
    }
  }
  return null;
};



