import { NextResponse } from 'next/server';
import { Booking } from '@/types';

// In-memory storage for bookings (would be database in production)
const bookings: Booking[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Simulate filtering from query parameters
  const email = searchParams.get('email');
  const status = searchParams.get('status');

  let result = bookings;

  if (email) {
    result = result.filter((b) => b.email === email);
  }

  if (status) {
    result = result.filter((b) => b.status === status);
  }

  return NextResponse.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (
      !body.venueId ||
      !body.venueName ||
      !body.date ||
      !body.time ||
      !body.firstName ||
      !body.lastName ||
      !body.email
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Create new booking
    const booking: Booking = {
      id: `booking_${Date.now()}`,
      venueId: body.venueId,
      venueName: body.venueName,
      date: body.date,
      time: body.time,
      duration: body.duration || 2,
      guestCount: body.guestCount || 1,
      totalPrice: body.totalPrice || 0,
      status: 'confirmed',
      bookingDate: new Date(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || '',
    };

    // Store booking (in production, save to database)
    bookings.push(booking);

    // Simulate sending confirmation email
    console.log(`[Booking Confirmation] Booking created for ${body.email}`);

    return NextResponse.json(
      {
        success: true,
        data: booking,
        message: 'Booking confirmed successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create booking',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.bookingId || !body.status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Find and update booking
    const bookingIndex = bookings.findIndex((b) => b.id === body.bookingId);

    if (bookingIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    bookings[bookingIndex].status = body.status;

    return NextResponse.json({
      success: true,
      data: bookings[bookingIndex],
    });
  } catch (error) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update booking',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing booking ID',
        },
        { status: 400 }
      );
    }

    const bookingIndex = bookings.findIndex((b) => b.id === bookingId);

    if (bookingIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    bookings.splice(bookingIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled',
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to cancel booking',
      },
      { status: 500 }
    );
  }
}
