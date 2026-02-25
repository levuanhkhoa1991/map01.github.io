'use client';

import React from 'react';
import { useVenue } from '@/context/VenueContext';
import { Event, Venue } from '@/types';
import { X, MapPin, Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventModalProps {
  event: Event;
  venue: Venue;
}

export default function EventModal({ event, venue }: EventModalProps) {
  const { setSelectedEvent, setIsBookingModalOpen, setSelectedVenue } = useVenue();

  const handleClose = () => {
    setSelectedEvent(null);
  };

  const handleGetTickets = () => {
    setSelectedVenue(venue);
    setIsBookingModalOpen(true);
    setSelectedEvent(null);
  };

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-background rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Event Image */}
          <div className="relative w-full h-80 bg-gradient-to-br from-purple-500/20 to-violet-500/20 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop';
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`text-sm font-bold px-4 py-2 rounded-full ${
                  event.status === 'live'
                    ? 'bg-red-500 text-white animate-pulse'
                    : event.status === 'upcoming'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-500 text-white'
                }`}
              >
                {event.status === 'live' ? 'LIVE NOW' : event.status.toUpperCase()}
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-4 right-4 bg-black/80 text-accent font-bold px-4 py-2 rounded-lg text-lg">
              {event.price === 0 ? 'FREE' : `HK$${event.price}`}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Title & Type */}
            <div className="mb-6">
              <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {event.type}
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{event.title}</h1>
              <p className="text-lg text-muted-foreground">{venue.name}</p>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-background rounded-lg border border-border">
              {/* Date */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Date</p>
                  <p className="text-foreground font-semibold">{formattedDate}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Time</p>
                  <p className="text-foreground font-semibold">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 col-span-2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Location</p>
                  <p className="text-foreground font-semibold">{venue.address}</p>
                  <p className="text-sm text-muted-foreground">{venue.location}</p>
                </div>
              </div>

              {/* Attendees */}
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Attendees</p>
                  <p className="text-foreground font-semibold">{event.attendees}</p>
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold">Capacity</p>
                  <p className="text-foreground font-semibold">{venue.capacity} guests</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3">About This Event</h2>
              <p className="text-foreground leading-relaxed text-base">{event.description}</p>
            </div>

            {/* Venue Details */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3">Venue Information</h2>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-foreground font-semibold mb-2">{venue.name}</p>
                <p className="text-muted-foreground text-sm mb-3">{venue.description}</p>
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground font-semibold mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-primary/20 text-primary px-2.5 py-1.5 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <Button
                variant="outline"
                className="flex-1 border-border hover:bg-background text-foreground"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleGetTickets}
              >
                Get Tickets Now
              </Button>
            </div>

            {/* Contact Info */}
            <div className="text-center text-xs text-muted-foreground border-t border-border pt-4">
              <p>Questions? Contact us or visit our website</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
