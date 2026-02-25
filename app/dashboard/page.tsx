'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useVenue } from '@/context/VenueContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Users, MapPin, DollarSign, Download, Mail } from 'lucide-react';

export default function Dashboard() {
  const { bookings } = useVenue();
  const [selectedBooking, setSelectedBooking] = useState(bookings[0] || null);

  const getBookingStatus = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-accent text-accent-foreground';
      case 'pending':
        return 'bg-primary text-primary-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </Link>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {bookings.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No Bookings Yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't made any event bookings yet. Explore venues and book your first event today!
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore Venues
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bookings List */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Your Bookings</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {bookings.map((booking) => (
                  <Card
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    className={`p-3 cursor-pointer transition-all border ${
                      selectedBooking?.id === booking.id
                        ? 'ring-2 ring-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground line-clamp-1">
                          {booking.venueName}
                        </p>
                        <p className="text-xs text-muted-foreground">{booking.date}</p>
                      </div>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ml-2 ${getBookingStatus(booking.status)}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Booking Details */}
            {selectedBooking && (
              <div className="lg:col-span-2">
                <Card className="border-border p-6">
                  {/* Header */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {selectedBooking.venueName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${getBookingStatus(selectedBooking.status)}`}
                      >
                        {selectedBooking.status.charAt(0).toUpperCase() +
                          selectedBooking.status.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Booking ID: {selectedBooking.id}
                      </span>
                    </div>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-background/50 border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                        <Calendar className="w-4 h-4" />
                        Date & Time
                      </div>
                      <p className="font-semibold text-foreground">
                        {selectedBooking.date} at {selectedBooking.time}
                      </p>
                    </div>

                    <div className="bg-background/50 border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                        <Users className="w-4 h-4" />
                        Guests
                      </div>
                      <p className="font-semibold text-foreground">
                        {selectedBooking.guestCount} guests
                      </p>
                    </div>

                    <div className="bg-background/50 border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                        <Clock className="w-4 h-4" />
                        Duration
                      </div>
                      <p className="font-semibold text-foreground">
                        {selectedBooking.duration} hours
                      </p>
                    </div>

                    <div className="bg-background/50 border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                        <DollarSign className="w-4 h-4" />
                        Total Cost
                      </div>
                      <p className="font-semibold text-accent text-lg">
                        ${selectedBooking.totalPrice}
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-background/50 border border-border rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Name</p>
                        <p className="font-semibold text-foreground">
                          {selectedBooking.firstName} {selectedBooking.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Phone</p>
                        <p className="font-semibold text-foreground">{selectedBooking.phone}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground mb-1">Email</p>
                        <p className="font-semibold text-foreground break-all">
                          {selectedBooking.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Timeline */}
                  <div className="bg-background/50 border border-border rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Booking Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Booking Created</span>
                        <span className="text-foreground">
                          {new Date(selectedBooking.bookingDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Event Date</span>
                        <span className="text-foreground font-semibold">{selectedBooking.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send Confirmation
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-border hover:bg-background text-foreground flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Receipt
                    </Button>
                  </div>

                  {/* Cancel Booking */}
                  {selectedBooking.status === 'confirmed' && (
                    <Button
                      variant="outline"
                      className="w-full mt-3 border-destructive text-destructive hover:bg-destructive/10"
                    >
                      Cancel Booking
                    </Button>
                  )}
                </Card>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Clock icon import
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
