'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Venue, Booking, Event } from '@/types';
import { MOCK_VENUES, MOCK_EVENTS } from '@/data/mockData';

interface VenueContextType {
  venues: Venue[];
  events: Event[];
  selectedVenue: Venue | null;
  setSelectedVenue: (venue: Venue | null) => void;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  selectedFilters: {
    priceRange: [number, number];
    eventType: string[];
    capacity: [number, number];
  };
  setSelectedFilters: (filters: any) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredVenues: Venue[];
  activeTab: 'venues' | 'events';
  setActiveTab: (tab: 'venues' | 'events') => void;
}

const VenueContext = createContext<VenueContextType | undefined>(undefined);

export const VenueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'venues' | 'events'>('venues');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 500] as [number, number],
    eventType: [] as string[],
    capacity: [0, 500] as [number, number],
  });

  // Simulate real-time updates - both venues and events
  useEffect(() => {
    // Poll for venue updates every 5 seconds
    const venueInterval = setInterval(() => {
      setVenues((prev) =>
        prev.map((venue) => ({
          ...venue,
          availableSpots: Math.max(0, venue.availableSpots - Math.floor(Math.random() * 2)),
        }))
      );
    }, 5000);

    // Poll for event updates every 30 seconds
    const eventInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/realtime/updates');
        if (response.ok) {
          const data = await response.json();
          // Update event attendees based on response
          if (data.data?.events) {
            setEvents((prev) =>
              prev.map((event) => {
                const update = data.data.events.find((e: any) => e.eventId === event.id);
                return update ? { ...event, attendees: update.attendees } : event;
              })
            );
          }
        }
      } catch (error) {
        console.log('[v0] Event update polling error:', error);
      }
    }, 30000);

    return () => {
      clearInterval(venueInterval);
      clearInterval(eventInterval);
    };
  }, []);

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      searchQuery === '' ||
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice =
      venue.pricePerHour >= selectedFilters.priceRange[0] &&
      venue.pricePerHour <= selectedFilters.priceRange[1];

    const matchesType =
      selectedFilters.eventType.length === 0 ||
      selectedFilters.eventType.includes(venue.type);

    const matchesCapacity =
      venue.capacity >= selectedFilters.capacity[0] &&
      venue.capacity <= selectedFilters.capacity[1];

    return matchesSearch && matchesPrice && matchesType && matchesCapacity;
  });

  const addBooking = useCallback((booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
    setSelectedVenue(null);
    setIsBookingModalOpen(false);
  }, []);

  return (
    <VenueContext.Provider
      value={{
        venues,
        events,
        selectedVenue,
        setSelectedVenue,
        selectedEvent,
        setSelectedEvent,
        selectedFilters,
        setSelectedFilters,
        bookings,
        addBooking,
        isBookingModalOpen,
        setIsBookingModalOpen,
        searchQuery,
        setSearchQuery,
        filteredVenues,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};

export const useVenue = () => {
  const context = useContext(VenueContext);
  if (context === undefined) {
    throw new Error('useVenue must be used within a VenueProvider');
  }
  return context;
};
