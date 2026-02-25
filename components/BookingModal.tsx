'use client';

import React, { useState } from 'react';
import { useVenue } from '@/context/VenueContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Calendar, Users, Clock } from 'lucide-react';
import { Booking } from '@/types';

export default function BookingModal() {
  const { selectedVenue, isBookingModalOpen, setIsBookingModalOpen, addBooking } = useVenue();
  const [step, setStep] = useState<'details' | 'checkout' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: 2,
    guestCount: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  if (!isBookingModalOpen || !selectedVenue) return null;

  const totalPrice = formData.duration * selectedVenue.pricePerHour;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' || name === 'guestCount' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('checkout');
    } else if (step === 'checkout') {
      // Simulate API call
      const booking: Booking = {
        id: `booking_${Date.now()}`,
        venueId: selectedVenue.id,
        venueName: selectedVenue.name,
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        guestCount: formData.guestCount,
        totalPrice: totalPrice,
        status: 'confirmed',
        bookingDate: new Date(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };

      addBooking(booking);
      setStep('confirmation');
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setStep('details');
        setFormData({
          date: '',
          time: '',
          duration: 2,
          guestCount: 0,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Book Your Event</h2>
            <p className="text-sm text-muted-foreground">{selectedVenue.name}</p>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-background/50 hover:bg-background flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'confirmation' ? (
            // Confirmation Screen
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground mb-6">
                Your reservation has been successfully created. A confirmation email will be sent to{' '}
                <span className="font-semibold text-foreground">{formData.email}</span>
              </p>
              <div className="bg-background/50 border border-border rounded-lg p-4 text-left mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Venue</p>
                    <p className="font-semibold text-foreground">{selectedVenue.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Date & Time</p>
                    <p className="font-semibold text-foreground">
                      {formData.date} at {formData.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold text-foreground">{formData.duration} hours</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Total Cost</p>
                    <p className="font-semibold text-accent text-lg">${totalPrice}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Redirecting you back...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 'details' && (
                <>
                  {/* Event Details */}
                  <div className="bg-background/50 border border-border rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Event Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Date
                        </label>
                        <Input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="bg-card border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Time
                        </label>
                        <Input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          className="bg-card border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                          Duration (hours)
                        </label>
                        <select
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="w-full bg-card border border-border text-foreground rounded-md px-3 py-2 text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((h) => (
                            <option key={h} value={h}>
                              {h} hour{h > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                          <Users className="w-3 h-3 inline mr-1" />
                          Guest Count
                        </label>
                        <Input
                          type="number"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleInputChange}
                          min="1"
                          max={selectedVenue.capacity}
                          required
                          className="bg-card border-border text-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing Summary */}
                  <div className="bg-background/50 border border-border rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Price Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          ${selectedVenue.pricePerHour} × {formData.duration} hours
                        </span>
                        <span className="text-foreground font-semibold">${totalPrice}</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-lg font-bold text-accent">${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 'checkout' && (
                <>
                  {/* Order Review */}
                  <div className="bg-background/50 border border-border rounded-lg p-4 space-y-3 text-sm">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Order Review</h3>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Venue:</span>
                      <span className="text-foreground font-semibold">{selectedVenue.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date & Time:</span>
                      <span className="text-foreground font-semibold">
                        {formData.date} at {formData.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-foreground font-semibold">{formData.duration} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests:</span>
                      <span className="text-foreground font-semibold">{formData.guestCount}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-accent text-lg">${totalPrice}</span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-background/50 border border-border rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                      />
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                      />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="col-span-2 bg-card border-border text-foreground placeholder:text-muted-foreground"
                      />
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="col-span-2 bg-card border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-background/50 border border-border rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Payment Method</h3>
                    <div className="bg-card border border-border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-2">Card Number</p>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground mb-3"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Expiry</p>
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">CVC</p>
                          <Input
                            type="text"
                            placeholder="123"
                            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                {step !== 'confirmation' && (
                  <>
                    {step === 'checkout' && (
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-border hover:bg-background text-foreground"
                        onClick={() => setStep('details')}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className={`flex-1 ${
                        step === 'checkout'
                          ? 'bg-primary hover:bg-primary/90'
                          : 'bg-accent hover:bg-accent/90'
                      } text-primary-foreground`}
                    >
                      {step === 'details' ? 'Continue' : 'Confirm Booking'}
                    </Button>
                  </>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
