'use client';

import React from 'react';
import { useVenue } from '@/context/VenueContext';
import { Event, Venue } from '@/types';
import { Button } from '@/components/ui/button';
import { X, Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';

interface EventDetailProps {
  event: Event;
  venue: Venue;
}

export default function EventDetail({ event, venue }: EventDetailProps) {
  const { setSelectedEvent, setIsBookingModalOpen, setSelectedVenue } = useVenue();

  const handleGetTickets = () => {
    setSelectedVenue(venue);
    setSelectedEvent(null);
    setIsBookingModalOpen(true);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.status === 'live'
                  ? 'bg-red-500 text-white'
                  : event.status === 'upcoming'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {event.status === 'live' ? 'LIVE NOW' : event.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{event.title}</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {event.type}
            </p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                <p className="text-foreground font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Time</p>
                <p className="text-foreground font-medium">{event.time} HKT</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Location</p>
                <p className="text-foreground font-medium">{venue.name}</p>
                <p className="text-sm text-muted-foreground">{venue.location}</p>
              </div>
            </div>

            {/* Attendees */}
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Attendees
                </p>
                <p className="text-foreground font-medium">{event.attendees.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">About Event</h3>
            <p className="text-foreground/80 leading-relaxed">{event.description}</p>
          </div>

          {/* Venue Info */}
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-2">Venue Information</h3>
            <p className="text-sm text-foreground/80">{venue.address}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Capacity: {venue.capacity} guests
            </p>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Price</p>
                <p className="text-2xl font-bold text-foreground">
                  {event.price === 0 ? 'FREE' : `HK$${event.price}`}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleGetTickets}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 rounded-lg font-semibold"
            >
              Get Tickets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
