import { MOCK_VENUES } from '@/data/mockData';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Simulate filtering from query parameters
  const type = searchParams.get('type');
  const maxPrice = searchParams.get('maxPrice');
  const minCapacity = searchParams.get('minCapacity');

  let venues = MOCK_VENUES;

  if (type) {
    venues = venues.filter((v) => v.type === type);
  }

  if (maxPrice) {
    const price = parseFloat(maxPrice);
    venues = venues.filter((v) => v.pricePerHour <= price);
  }

  if (minCapacity) {
    const capacity = parseInt(minCapacity);
    venues = venues.filter((v) => v.capacity >= capacity);
  }

  // Simulate real-time data (availability changes)
  venues = venues.map((venue) => ({
    ...venue,
    availableSpots: Math.max(0, venue.availableSpots - Math.floor(Math.random() * 2)),
  }));

  return NextResponse.json({
    success: true,
    data: venues,
    timestamp: new Date().toISOString(),
  });
}
