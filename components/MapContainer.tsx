'use client';

import React, { useMemo } from 'react';
import { useVenue } from '@/context/VenueContext';
import { MOCK_VENUES } from '@/data/mockData';
import HongKongMap from './HongKongMap';
import EventModal from './EventModal';

export default function MapContainer({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean, setIsSidebarOpen: (isOpen: boolean) => void }) {
  const { selectedEvent } = useVenue();

  // Get venue data for selected event
  const selectedEventVenue = useMemo(() => {
    if (!selectedEvent) return null;
    return MOCK_VENUES.find((v) => v.id === selectedEvent.venueId) || null;
  }, [selectedEvent]);

  return (
    <div className="flex-1 relative bg-background overflow-hidden">
      {/* Hong Kong Map */}
      <div className="w-full h-full">
        <HongKongMap />
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="absolute inset-0 bg-black/50 z-10 md:hidden"
        />
      )}

      {/* Event Modal Overlay */}
      {selectedEvent && selectedEventVenue && (
        <EventModal event={selectedEvent} venue={selectedEventVenue} />
      )}
    </div>
  );
}
