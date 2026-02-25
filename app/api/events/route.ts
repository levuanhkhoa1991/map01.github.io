import { MOCK_EVENTS } from '@/data/mockData';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Simulate filtering from query parameters
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const venueId = searchParams.get('venueId');

  let events = MOCK_EVENTS;

  if (type) {
    events = events.filter((e) => e.type === type);
  }

  if (status) {
    events = events.filter((e) => e.status === status);
  }

  if (venueId) {
    events = events.filter((e) => e.venueId === venueId);
  }

  return NextResponse.json({
    success: true,
    data: events,
    timestamp: new Date().toISOString(),
  });
}
