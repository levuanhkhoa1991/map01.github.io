'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import MapContainer from '@/components/MapContainer';
import VenuesSidebar from '@/components/VenuesSidebar';
import BookingModal from '@/components/BookingModal';
import { VenueProvider } from '@/context/VenueContext';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <VenueProvider>
      <div className="h-screen w-full flex flex-col bg-background">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex flex-1 flex-col md:flex-row overflow-hidden relative">
          <VenuesSidebar isSidebarOpen={isSidebarOpen} />
          <MapContainer isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <BookingModal />
      </div>
    </VenueProvider>
  );
}
