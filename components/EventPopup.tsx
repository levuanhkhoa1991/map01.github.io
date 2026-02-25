'use client';

import React from 'react';
import { useVenue } from '@/context/VenueContext';
import { Event, Venue } from '@/types';
import { Button } from '@/components/ui/button';
import { X, Calendar, Clock, MapPin, Users, DollarSign, ChevronDown } from 'lucide-react';

interface EventPopupProps {
  event: Event;
  venue: Venue;
}

export default function EventPopup({ event, venue }: EventPopupProps) {
  const { setSelectedEvent, setIsBookingModalOpen, setSelectedVenue } = useVenue();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleGetTickets = () => {
    setSelectedVenue(venue);
    setSelectedEvent(null);
    setIsBookingModalOpen(true);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm w-full sm:w-96">
      <div className={`bg-card border border-border rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isExpanded ? 'max-h-[80vh]' : 'max-h-fit'
      } overflow-y-auto`}>
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-3 flex items-start justify-between border-b border-border">
          <div className="flex-1 pr-2">
            <h3 className="text-sm font-bold text-foreground line-clamp-2">{event.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{venue.name}</p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 bg-background/50 hover:bg-background rounded p-1.5 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Quick Info */}
        <div className="px-4 py-3 space-y-2 border-b border-border bg-background/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span>
              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            <span className="line-clamp-1">{venue.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>{event.attendees} attending</span>
            </div>
            <div className="text-sm font-bold text-accent">
              {event.price === 0 ? 'FREE' : `HK$${event.price}`}
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="px-4 py-3 border-b border-border space-y-3">
            {/* Status Badge */}
            <div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                event.status === 'live'
                  ? 'bg-red-500/20 text-red-500'
                  : event.status === 'upcoming'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
              }`}>
                {event.status === 'live' ? 'LIVE NOW' : event.status.toUpperCase()}
              </span>
            </div>

            {/* Event Type */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Type</p>
              <p className="text-sm text-foreground">{event.type}</p>
            </div>

            {/* Venue Details */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Venue</p>
              <p className="text-sm text-foreground font-medium">{venue.name}</p>
              <p className="text-xs text-muted-foreground">{venue.address}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">About</p>
              <p className="text-sm text-foreground line-clamp-4">{event.description}</p>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="bg-background/50 rounded p-2">
                <p className="text-xs text-muted-foreground mb-0.5">Capacity</p>
                <p className="text-sm font-bold text-accent">{venue.capacity} guests</p>
              </div>
              <div className="bg-background/50 rounded p-2">
                <p className="text-xs text-muted-foreground mb-0.5">Venue Type</p>
                <p className="text-sm font-bold text-accent">{venue.type}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-4 py-3 flex gap-2 bg-background/50 border-t border-border">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs h-8 border-border hover:bg-background"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown className={`w-3 h-3 mr-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded ? 'Less' : 'More'}
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs h-8 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleGetTickets}
          >
            Get Tickets
          </Button>
        </div>
      </div>
    </div>
  );
}
