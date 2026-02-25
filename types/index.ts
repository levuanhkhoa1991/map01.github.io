export interface Venue {
  id: string;
  name: string;
  type: 'Ballroom' | 'Loft' | 'Warehouse' | 'Rooftop' | 'Outdoor' | 'Garden';
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  availableSpots: number;
  image: string;
  description: string;
  amenities: string[];
  status: 'available' | 'busy' | 'full';
  featured?: boolean;
  verified?: boolean;
}

export interface Event {
  id: string;
  title: string;
  type: 'Music' | 'Conference' | 'Workshop' | 'Wedding' | 'Party' | 'Wellness';
  date: string;
  time: string;
  venueId: string;
  price: number;
  status: 'upcoming' | 'live' | 'past';
  attendees: number;
  image: string;
  description: string;
  latitude?: number;
  longitude?: number;
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  date: string;
  time: string;
  duration: number;
  guestCount: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  eventType: string[];
  capacity: [number, number];
}
