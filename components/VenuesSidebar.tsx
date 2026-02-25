'use client';

import React, { useState } from 'react';
import { useVenue } from '@/context/VenueContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, Filter } from 'lucide-react';

const VENUE_TYPES = ['Ballroom', 'Loft', 'Warehouse', 'Rooftop', 'Outdoor', 'Garden'];

export default function VenuesSidebar() {
  const { 
    filteredVenues, 
    selectedVenue, 
    setSelectedVenue, 
    selectedFilters, 
    setSelectedFilters, 
    setIsBookingModalOpen,
    events,
    activeTab,
    setActiveTab,
    selectedEvent,
    setSelectedEvent,
    venues,
  } = useVenue();
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterKey: string, value: any) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterKey]: value,
    });
  };

  const handleTypeToggle = (type: string) => {
    const current = selectedFilters.eventType;
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    handleFilterChange('eventType', updated);
  };

  const handleBookNow = (e: React.MouseEvent, venueId: string) => {
    e.stopPropagation();
    const venue = filteredVenues.find((v) => v.id === venueId);
    if (venue) {
      setSelectedVenue(venue);
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div className="w-96 bg-card border-r border-border flex flex-col h-full">
      {/* Header with Tabs */}
      <div className="border-b border-border">
        {/* Tab Buttons */}
        <div className="flex gap-0 p-0">
          <button
            onClick={() => setActiveTab('venues')}
            className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'venues'
                ? 'text-primary border-b-primary bg-primary/10'
                : 'text-muted-foreground border-b-transparent hover:text-foreground'
            }`}
          >
            Venues ({filteredVenues.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'events'
                ? 'text-primary border-b-primary bg-primary/10'
                : 'text-muted-foreground border-b-transparent hover:text-foreground'
            }`}
          >
            Events ({events.length})
          </button>
        </div>

        {/* Filters Button */}
        {activeTab === 'venues' && (
          <div className="px-4 py-3 border-t border-border">
            <Button
              size="sm"
              variant="outline"
              className="w-full border-border hover:bg-background text-foreground"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-1" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="px-4 py-3 border-b border-border space-y-4 bg-background/50">
          {/* Price Range */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              PRICE RANGE
            </label>
            <div className="space-y-2">
              <Slider
                min={0}
                max={500}
                step={10}
                value={selectedFilters.priceRange}
                onValueChange={(val) =>
                  handleFilterChange('priceRange', [val[0], val[1]])
                }
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-foreground">
                <span>${selectedFilters.priceRange[0]}</span>
                <span>${selectedFilters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Capacity Range */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              CAPACITY
            </label>
            <div className="space-y-2">
              <Slider
                min={0}
                max={500}
                step={10}
                value={selectedFilters.capacity}
                onValueChange={(val) =>
                  handleFilterChange('capacity', [val[0], val[1]])
                }
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-foreground">
                <span>{selectedFilters.capacity[0]} guests</span>
                <span>{selectedFilters.capacity[1]} guests</span>
              </div>
            </div>
          </div>

          {/* Venue Types */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              VENUE TYPE
            </label>
            <div className="space-y-2">
              {VENUE_TYPES.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={type}
                    checked={selectedFilters.eventType.includes(type)}
                    onCheckedChange={() => handleTypeToggle(type)}
                  />
                  <label
                    htmlFor={type}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content List - Venues or Events */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'venues' ? (
          // VENUES TAB
          <>
            {filteredVenues.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center px-4">
                <div>
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-muted-foreground text-sm">
                    No venues match your filters. Try adjusting your search criteria.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 p-3">
                {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className={`group relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedVenue?.id === venue.id
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:ring-1 hover:ring-border'
                }`}
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="relative h-32 bg-gradient-to-br from-primary/30 to-accent/30 overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1519167758993-3d7e6be97264?w=400&h=300&fit=crop';
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        venue.status === 'available'
                          ? 'bg-accent text-accent-foreground'
                          : venue.status === 'busy'
                            ? 'bg-destructive text-destructive-foreground'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {venue.status === 'available'
                        ? 'Available'
                        : venue.status === 'busy'
                          ? 'Busy'
                          : 'Full'}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {venue.featured && (
                    <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                      TRENDING
                    </div>
                  )}

                  {/* Verified Badge */}
                  {venue.verified && (
                    <div className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                      ✓ VERIFIED
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-accent font-bold px-2 py-1 rounded text-sm">
                    ${venue.pricePerHour}/hr
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-3 bg-card border-t border-border">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="text-sm font-bold text-foreground line-clamp-1">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{venue.location}</p>
                    </div>
                    <div className="text-right ml-2">
                      <span className="text-xs font-semibold text-foreground">
                        {venue.rating}
                      </span>
                      <span className="text-xs text-accent ml-1">★</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="bg-background/50 px-2 py-1 rounded">
                      <div className="text-muted-foreground">Capacity</div>
                      <div className="font-bold text-foreground">{venue.capacity}</div>
                    </div>
                    <div className="bg-background/50 px-2 py-1 rounded">
                      <div className="text-muted-foreground">Available</div>
                      <div className="font-bold text-accent">{venue.availableSpots}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs border-border hover:bg-background text-foreground"
                    >
                      Details
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 text-xs bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={(e) => handleBookNow(e, venue.id)}
                    >
                      Book
                    </Button>
                  </div>

                  {/* Amenities Tags */}
                  <div className="flex gap-1 flex-wrap mt-2">
                    {venue.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {venue.amenities.length > 3 && (
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5">
                        +{venue.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // EVENTS TAB
          <>
            {events.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center px-4">
                <div>
                  <div className="text-4xl mb-2">📅</div>
                  <p className="text-muted-foreground text-sm">
                    No events currently available.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 p-3">
                {events.map((event) => {
                  const venue = venues.find((v) => v.id === event.venueId);
                  return (
                    <div
                      key={event.id}
                      className={`group relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedEvent?.id === event.id
                          ? 'ring-2 ring-primary shadow-lg'
                          : 'hover:ring-1 hover:ring-border'
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      {/* Image */}
                      <div className="relative h-28 bg-gradient-to-br from-purple-500/30 to-violet-500/30 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-2 right-2">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              event.status === 'live'
                                ? 'bg-red-500 text-white animate-pulse'
                                : event.status === 'upcoming'
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {event.status === 'live' ? 'LIVE' : event.status.toUpperCase()}
                          </span>
                        </div>

                        {/* Price Tag */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-accent font-bold px-2 py-1 rounded text-sm">
                          {event.price === 0 ? 'FREE' : `HK$${event.price}`}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 bg-card border-t border-border">
                        <div className="mb-1">
                          <h3 className="text-sm font-bold text-foreground line-clamp-1">
                            {event.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{event.type}</p>
                        </div>

                        <div className="space-y-1 text-xs mb-2">
                          <div className="text-muted-foreground">
                            📍 {venue?.name}
                          </div>
                          <div className="text-muted-foreground">
                            📅 {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {event.time}
                          </div>
                          <div className="text-muted-foreground">
                            👥 {event.attendees} attending
                          </div>
                        </div>

                        <Button
                          size="sm"
                          className="w-full text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(event);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
