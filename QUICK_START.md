# EventSpace - Quick Start Guide

## What's Built

A fully functional event booking platform with map-based venue discovery, real-time updates, and multi-step booking checkout flow - all in English.

## Get Started in 60 Seconds

1. **Click "Preview"** in the v0 interface to see the app live
2. **Explore the map** - scroll through venues in the left sidebar or click markers on the map
3. **Filter venues** - click "Filters" to search by price, type, and capacity
4. **Book a venue** - click "Book Now" on any venue and complete the booking flow
5. **View your bookings** - click "My Bookings" in the header to see your reservations

## App Structure

```
app/
├── page.tsx                 # Main map interface
├── dashboard/               # Bookings dashboard
├── api/
│   ├── venues/              # Venue data endpoint
│   ├── events/              # Events data endpoint
│   ├── bookings/            # Booking creation/retrieval
│   └── realtime/updates/    # Live availability updates
│
components/
├── Header.tsx               # Top navigation
├── MapContainer.tsx         # Interactive map with venues
├── VenuesSidebar.tsx        # Venue list and filters
├── BookingModal.tsx         # Multi-step booking form
│
context/
├── VenueContext.tsx         # Global state management
│
hooks/
├── useRealtimeUpdates.ts    # Real-time data polling
│
data/
├── mockData.ts              # 7 venues + 12 events
```

## Key Features Implemented

✅ **Interactive Map** - Click venues to view details  
✅ **Live Search & Filters** - Find venues by name, price, type, capacity  
✅ **Real-Time Updates** - Availability changes every 5 seconds  
✅ **Multi-Step Booking** - 3-step checkout flow with validation  
✅ **User Dashboard** - View all bookings with details  
✅ **Dark Theme** - Purple (primary) + Cyan (accent) colors  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Mock Data** - No external API or database required  

## Advanced Setup

### To Enable Real Google Maps:

1. Get API key from Google Cloud Console
2. Add to Vars: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. App automatically switches to real Google Maps

### To Add Real Backend:

1. Connect Supabase or Neon database
2. Replace mock data API endpoints with real database queries
3. Add user authentication (optional)

## Testing Scenarios

**Test Booking Flow:**
1. Select a venue from sidebar
2. Click "Book Now"
3. Fill details: date (any future date), time, guest count
4. Click "Continue"
5. Enter name, email, phone
6. Click "Confirm Booking"
7. See confirmation page

**Test Filters:**
1. Click "Filters" in sidebar
2. Drag price slider to $100-200
3. Check "Rooftop" venue type
4. Venues update in real-time

**Test Dashboard:**
1. Make 2-3 bookings
2. Click "My Bookings" header button
3. View all bookings with status

## No Setup Required!

All features work out of the box with mock data. The SVG map works without any API keys. Optionally add Google Maps API for real map visualization.

---

Built with Next.js, React, Tailwind CSS, and shadcn/ui components.
