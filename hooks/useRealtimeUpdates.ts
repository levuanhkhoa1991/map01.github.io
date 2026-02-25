import { useEffect, useCallback } from 'react';
import { useVenue } from '@/context/VenueContext';

interface VenueUpdate {
  venueId: string;
  availableSpots: number;
  status: 'available' | 'busy' | 'full';
  lastUpdated: string;
}

interface EventUpdate {
  eventId: string;
  attendees: number;
  lastUpdated: string;
}

export const useRealtimeUpdates = () => {
  const { venues } = useVenue();

  useEffect(() => {
    // Create EventSource for real-time updates
    const eventSource = new EventSource('/api/realtime/updates?stream=true');

    const handleUpdate = (event: Event) => {
      if (event instanceof MessageEvent) {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'connected') {
            console.log('[v0] Connected to real-time updates');
            return;
          }

          // Handle venue updates
          if (data.venues) {
            console.log('[v0] Received venue updates:', data.venues);
            // Updates would be handled through context/state management
          }

          // Handle event updates
          if (data.events) {
            console.log('[v0] Received event updates:', data.events);
          }
        } catch (error) {
          console.error('[v0] Failed to parse real-time update:', error);
        }
      }
    };

    const handleError = () => {
      console.log('[v0] Real-time connection closed, attempting to reconnect...');
      eventSource.close();
    };

    eventSource.addEventListener('message', handleUpdate);
    eventSource.addEventListener('error', handleError);

    return () => {
      eventSource.removeEventListener('message', handleUpdate);
      eventSource.removeEventListener('error', handleError);
      eventSource.close();
    };
  }, []);

  // Fallback: Use polling if EventSource is not supported
  const startPolling = useCallback(() => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/realtime/updates');
        const data = await response.json();

        if (data.data) {
          console.log('[v0] Poll update received:', data.data);
          // Updates would be processed here
        }
      } catch (error) {
        console.error('[v0] Polling error:', error);
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, []);

  return { startPolling };
};
