'use client';

import React from 'react';
import { useVenue } from '@/context/VenueContext';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  const { searchQuery, setSearchQuery, venues, filteredVenues } = useVenue();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between p-4 max-w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <MapPin className="w-6 h-6 text-foreground" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-foreground">EventSpace</h1>
            <p className="text-xs text-muted-foreground">{filteredVenues.length} venues found</p>
          </div>
        </div>

        <div className="flex-1 mx-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search venues or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-border hover:bg-card text-foreground"
          >
            Events
          </Button>
          <Button
            variant="outline"
            className="border-border hover:bg-card text-foreground"
            onClick={() => window.location.href = '/dashboard'}
          >
            My Bookings
          </Button>
          <Button
            variant="outline"
            className="border-border hover:bg-card text-foreground"
          >
            Host an Event
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
