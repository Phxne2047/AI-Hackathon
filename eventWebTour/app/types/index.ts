export interface User {
  user_id: string;
  name: string;
  email: string;
  phone: string;
  loyalty_points: number;
  role: 'MEMBER' | 'VIP';
  accessibility_profile?: 'physical' | 'visual' | 'hearing' | 'sensory' | 'none';
}

export interface Event {
  event_id: string;
  title: string;
  date: string; // ISO date string
  location: string; // Venue name matching LocationInfo name or ref_id
  ticket_price: number;
  accessibility_features?: string[];
  special_seating_quota?: {
    [key: string]: number;
  };
}

export interface Flight {
  flight_id: string;
  airline: string;
  origin: string;
  destination: string;
  departure_time: string; // ISO date string
  price: number;
  buffer_time_hours?: number;
  assistance_services?: string[];
}

export interface Hotel {
  hotel_id: string;
  name: string;
  location: string; // City name (e.g., "Bangkok", "Chiang Mai")
  rating: number;
  price_per_night: number;
  amenities: string[];
  universal_design_amenities?: string[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationInfo {
  location_id: string;
  name: string;
  type: 'HOTEL' | 'EVENT_VENUE';
  ref_id: string;
  address: string;
  coordinates: Coordinates;
  operating_hours: string;
}

export interface Review {
  review_id: string;
  user_id: string;
  target_id: string;
  target_type: 'HOTEL' | 'EVENT' | 'PRODUCT' | 'DOCTOR';
  rating: number;
  comment: string;
  timestamp: string;
  images?: string[];
}

export interface Transaction {
  txn_id: string;
  user_id: string;
  type: 'INCOME' | 'EXPENSE';
  category: 'Salary' | 'Rent' | 'Food' | 'Shopping' | 'Entertainment' | string;
  amount: number;
  date: string;
  note?: string;
}

export interface Booking {
  booking_id: string;
  user_id: string;
  event: Event;
  flight_arrival: Flight | null;
  flight_departure: Flight | null;
  hotel: Hotel | null;
  nights: number;
  event_ticket_qty: number;
  special_seating_selected: string;
  special_needs_selected: string;
  total_cost: number;
  points_applied: number;
  final_price: number;
  status: 'confirmed' | 'pending';
  created_at: string;
  readiness: {
    flight: number;
    hotel: number;
    venue: number;
  };
  facility_details: Array<{
    name: string;
    type: string;
    size: string;
    status: 'pass' | 'pending' | 'fail';
  }>;
}
