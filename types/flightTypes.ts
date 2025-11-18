
export type airpotType = {
    code: string,
    city: string,
    name: string,
}


export type flightSearchParams = {
   
}

export type flightType = {
    id: string,
    airline: string,
    airlineInfo: {
        code: string,
        color: string,
        logo: string,
        name: string,
    },
    flightNumber: string,
    from: string,
    to: string,
    departureTime: string,
    arrivalTime: string,
    duration: string,
    stops: number,
    baggage: string,
    seatClass: string,
    price: number,
    date: string,
    available: boolean,
}

export type ticketType = {
    id: string,
    airline: string,
    airlineInfo: {
        code: string,
        color: string,
        logo: string,
        name: string,
    },
    flightNumber: string,
    from: string,
    to: string,
    departureTime: string,
    arrivalTime: string,
    duration: string,
    stops: number,
    baggage: string,
    seatClass: string,
    price: number,
    date: string,
    available: boolean,
    status: 'active' | 'completed' | 'cancelled',
    ticketId: string,
    purchaseDate: string,
}