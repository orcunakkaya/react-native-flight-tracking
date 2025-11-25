export const airlines = {
  TK: {
    code: 'TK',
    name: 'Turkish Airlines',
    logo: '🇹🇷',
    color: '#E30A17',
  },
  PC: {
    code: 'PC',
    name: 'Pegasus',
    logo: '🐴',
    color: '#FFD500',
  },
  XQ: {
    code: 'XQ',
    name: 'SunExpress',
    logo: '☀️',
    color: '#FFCC00',
  },
  AJ: {
    code: 'AJ',
    name: 'AnadoluJet',
    logo: '✈️',
    color: '#003087',
  },
};

export const generateFlights = (from, to, date) => {
  const flightTemplates = [
    {
      airline: 'TK',
      flightNumber: 'TK2310',
      departureTime: '08:00',
      arrivalTime: '09:15',
      duration: '1s 15dk',
      price: 520,
      stops: 0,
      baggage: '15kg',
      seatClass: 'Ekonomi',
    },
    {
      airline: 'TK',
      flightNumber: 'TK2312',
      departureTime: '10:30',
      arrivalTime: '11:45',
      duration: '1s 15dk',
      price: 450,
      stops: 0,
      baggage: '15kg',
      seatClass: 'Ekonomi',
    },
    {
      airline: 'PC',
      flightNumber: 'PC2934',
      departureTime: '13:00',
      arrivalTime: '14:15',
      duration: '1s 15dk',
      price: 380,
      stops: 0,
      baggage: '15kg',
      seatClass: 'Ekonomi',
    },
    {
      airline: 'PC',
      flightNumber: 'PC2936',
      departureTime: '16:45',
      arrivalTime: '18:00',
      duration: '1s 15dk',
      price: 420,
      stops: 0,
      baggage: '15kg',
      seatClass: 'Ekonomi',
    },
    {
      airline: 'XQ',
      flightNumber: 'XQ5432',
      departureTime: '19:30',
      arrivalTime: '20:45',
      duration: '1s 15dk',
      price: 390,
      stops: 0,
      baggage: '15kg',
      seatClass: 'Ekonomi',
    },
    {
      airline: 'AJ',
      flightNumber: 'AJ1478',
      departureTime: '07:15',
      arrivalTime: '08:30',
      duration: '1s 15dk',
      price: 410,
      stops: 0,
      baggage: '15kg',
      seatClass: 'Ekonomi',
    },
  ];

  return flightTemplates.map((flight, index) => ({
    id: `flight_${index + 1}`,
    ...flight,
    from,
    to,
    date,
    airlineInfo: airlines[flight.airline],
    available: true,
  }));
};

// Tek bir uçuşun detaylı bilgisi
export const getFlightById = (flights, id) => {
  return flights.find(flight => flight.id === id);
};

// Fiyat sıralama
export const sortFlightsByPrice = (flights, ascending = true) => {
  return [...flights].sort((a, b) => 
    ascending ? a.price - b.price : b.price - a.price
  );
};

// Havayoluna göre filtreleme
export const filterFlightsByAirline = (flights, airlineCode) => {
  if (!airlineCode) return flights;
  return flights.filter(flight => flight.airline === airlineCode);
};