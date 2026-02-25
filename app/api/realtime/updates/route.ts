import { MOCK_VENUES, MOCK_EVENTS } from '@/data/mockData';
import { NextResponse } from 'next/server';

// Simulate real-time data changes
const generateRealtimeUpdates = () => {
  // Simulate availability changes
  const venueUpdates = MOCK_VENUES.map((venue) => ({
    venueId: venue.id,
    availableSpots: Math.max(0, venue.availableSpots - Math.floor(Math.random() * 3)),
    status:
      Math.random() > 0.7 ? 'busy' : Math.random() > 0.3 ? 'available' : 'full',
    lastUpdated: new Date().toISOString(),
  }));

  // Simulate event attendance changes
  const eventUpdates = MOCK_EVENTS.map((event) => ({
    eventId: event.id,
    attendees: event.attendees + Math.floor(Math.random() * 10),
    lastUpdated: new Date().toISOString(),
  }));

  return {
    venues: venueUpdates,
    events: eventUpdates,
    timestamp: new Date().toISOString(),
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stream = searchParams.get('stream') === 'true';

  if (stream) {
    // Return SSE stream for real-time updates
    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      start(controller) {
        // Send initial message
        controller.enqueue(
          encoder.encode('data: ' + JSON.stringify({ type: 'connected' }) + '\n\n')
        );

        // Simulate updates every 5 seconds
        const interval = setInterval(() => {
          const updates = generateRealtimeUpdates();
          controller.enqueue(
            encoder.encode('data: ' + JSON.stringify(updates) + '\n\n')
          );
        }, 5000);

        // Cleanup on connection close
        const cleanup = () => clearInterval(interval);
        controller.signal.addEventListener('abort', cleanup);
      },
    });

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } else {
    // Single poll endpoint
    const updates = generateRealtimeUpdates();
    return NextResponse.json({
      success: true,
      data: updates,
    });
  }
}
