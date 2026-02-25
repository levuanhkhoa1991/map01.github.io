'use client';

import React from 'react';
import Header from '@/components/Header';
import MapContainer from '@/components/MapContainer';
import VenuesSidebar from '@/components/VenuesSidebar';
import BookingModal from '@/components/BookingModal';
import { VenueProvider } from '@/context/VenueContext';

export default function Home() {
  return (
    <VenueProvider>
      <div className="h-screen w-full flex flex-col bg-background">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <VenuesSidebar />
          <MapContainer />
        </div>
        <BookingModal />
      </div>
    </VenueProvider>
  );
}
