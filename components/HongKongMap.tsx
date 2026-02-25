'use client';

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { useVenue } from '@/context/VenueContext';
import { MOCK_VENUES } from '@/data/mockData';
import { Event, Venue } from '@/types';

export default function HongKongMap() {
  const { setSelectedEvent, filteredVenues, events, activeTab, setSelectedVenue } = useVenue();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());

  const markers = useMemo(() => {
    const currentMarkers = activeTab === 'events' ? events : filteredVenues;
    return currentMarkers.map((item) => {
      const isEvent = activeTab === 'events';
      const event = item as Event;
      const venue = isEvent ? MOCK_VENUES.find((v) => v.id === event.venueId) : (item as Venue);

      return {
        type: isEvent ? 'event' : 'venue',
        data: item,
        lat: isEvent ? event.latitude || venue?.latitude : (item as Venue).latitude,
        lng: isEvent ? event.longitude || venue?.longitude : (item as Venue).longitude,
        venueName: venue?.name || 'Unknown Venue',
      };
    });
  }, [activeTab, events, filteredVenues]);

  const addMarkers = useCallback(
    (map: any, L: any) => {
      markers.forEach((marker) => {
        const isEvent = marker.type === 'event';
        const eventData = marker.data as Event;

        const markerElement = document.createElement('div');
        markerElement.className = `flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-lg cursor-pointer hover:scale-110 transition-transform ${
          isEvent
            ? eventData.status === 'live'
              ? 'bg-red-500 border-red-600 animate-pulse'
              : 'bg-purple-500 border-purple-600'
            : 'bg-cyan-500 border-cyan-600'
        }`;
        markerElement.innerHTML = `<span class="text-white text-lg">${isEvent ? '🎪' : '📍'}</span>`;

        const leafletMarker = L.marker([marker.lat, marker.lng], {
          icon: L.divIcon({
            html: markerElement.outerHTML,
            className: 'event-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          }),
        }).addTo(map);

        leafletMarker.on('click', () => {
          if (isEvent) {
            setSelectedEvent(eventData);
          } else {
            setSelectedVenue(marker.data as Venue);
          }
        });

        markersRef.current.set(`${marker.type}-${marker.data.id}`, leafletMarker);
      });
    },
    [markers, setSelectedEvent, setSelectedVenue]
  );

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    (async () => {
      try {
        const L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');

        const map = L.map(mapContainer.current).setView([22.3, 114.17], 12);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap, © CartoDB',
        }).addTo(map);

        mapRef.current = { map, L };
        addMarkers(map, L);
      } catch (error) {
        console.error('[v0] Error loading Leaflet:', error);
      }
    })();

    return () => {
      if (mapRef.current?.map) {
        mapRef.current.map.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
  }, [addMarkers]);

  useEffect(() => {
    if (!mapRef.current?.map) return;

    const { map, L } = mapRef.current;

    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current.clear();

    addMarkers(map, L);
  }, [markers, addMarkers]);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-border shadow-lg bg-white relative">
      <div ref={mapContainer} className="w-full h-full z-0" />

      {/* Overlay Info */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-900 border border-gray-300 shadow-md z-10">
        <div className="font-semibold">{activeTab === 'events' ? 'Events' : 'Venues'} in Hong Kong</div>
        <div className="text-xs text-gray-600">Total: {markers.length}</div>
      </div>

      {/* Legend */}
      <div className="absolute top-20 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg text-xs text-gray-900 border border-gray-300 shadow-md space-y-2 z-10">
        <div className="font-semibold mb-2">Legend</div>
        {activeTab === 'events' ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span>Live Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span>Upcoming Events</span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span>Venues</span>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg text-xs text-gray-600 border border-gray-300 shadow-md z-10">
        Powered by CartoDB & OpenStreetMap
      </div>
    </div>
  );
}

