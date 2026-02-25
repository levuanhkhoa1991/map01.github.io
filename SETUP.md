# EventSpace - Booking Platform Setup Guide

## Overview

EventSpace is a modern event booking platform with an interactive map interface for discovering and booking venues. The application features real-time venue availability tracking, multi-step booking flows, and a user dashboard for managing reservations.

## Features

- **Map-Based Interface**: Interactive map with venue markers showing real-time availability
- **Venue Discovery**: Browse and filter venues by price, type, and capacity
- **Real-Time Updates**: Live availability tracking via polling and SSE
- **Booking System**: Multi-step checkout flow with confirmation
- **User Dashboard**: Track and manage all bookings in one place
- **Mock Data**: Pre-populated with 7 venues and 6 events for testing
- **Dark Theme**: Modern dark interface with cyan and purple accents

## Project Structure

```
app/
├── page.tsx                 # Main booking platform page
├── dashboard/
│   └── page.tsx            # User dashboard for managing bookings
├── api/
│   ├── venues/route.ts     # Venues API with filtering
│   ├── events/route.ts     # Events API with filtering
│   ├── bookings/route.ts   # Bookings CRUD operations
│   └── realtime/
│       └── updates/route.ts # Real-time venue updates (SSE/polling)
├── globals.css             # Theme colors and design tokens
└── layout.tsx              # Root layout

components/
├── Header.tsx              # Navigation and search bar
├── MapContainer.tsx        # Interactive map with venue markers
├── VenuesSidebar.tsx       # Venues list with filtering
├── BookingModal.tsx        # Multi-step booking checkout
└── ui/                     # shadcn/ui components

context/
└── VenueContext.tsx        # Global state management

hooks/
└── useRealtimeUpdates.ts   # Real-time updates hook

data/
└── mockData.ts             # Mock venues and events

types/
└── index.ts                # TypeScript interfaces
```

## Installation & Setup

1. **Install dependencies** (handled automatically):
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

## Key Components

### Header
- Search venues and locations
- Navigation to dashboard
- Quick access buttons

### Map Container
- Interactive map with venue markers
- Real-time status indicators (available/busy/full)
- Venue details card on selection
- Zoom controls

### Venues Sidebar
- Filterable venue list
- Advanced filters: price range, capacity, venue type
- Venue cards with images and ratings
- Quick booking button

### Booking Modal
- Step 1: Event details (date, time, duration, guests)
- Step 2: Contact information and payment
- Step 3: Confirmation screen
- Automatic data management

### Dashboard
- View all bookings
- Booking status indicators
- Detailed booking information
- Download receipts and send confirmations

## API Endpoints

### GET /api/venues
Fetch venues with optional filters
- Query params: `type`, `maxPrice`, `minCapacity`

### GET /api/events
Fetch events with optional filters
- Query params: `type`, `status`, `venueId`

### GET /api/bookings
Fetch user bookings
- Query params: `email`, `status`

### POST /api/bookings
Create a new booking
- Body: `{ venueId, venueName, date, time, firstName, lastName, email, phone, ... }`

### GET /api/realtime/updates
Get real-time updates
- Query params: `stream=true` for SSE stream or polling

## Real-Time Updates

The app supports two real-time update mechanisms:

1. **Server-Sent Events (SSE)**: 
   - Endpoint: `/api/realtime/updates?stream=true`
   - Updates every 5 seconds
   - Falls back to polling if SSE unavailable

2. **Polling**:
   - Endpoint: `/api/realtime/updates`
   - Manual poll interval configurable
   - Used as fallback mechanism

## Theme Customization

Design tokens are defined in `app/globals.css`:
- **Primary Color**: Purple (280°)
- **Accent Color**: Cyan (190°)
- **Background**: Dark navy/black (oklch 0.1)
- **Border**: Purple tinted (oklch 0.25 0.08 280)

Modify the CSS variables to customize colors:
```css
--primary: oklch(0.65 0.2 280);    /* Purple */
--accent: oklch(0.6 0.22 190);     /* Cyan */
--background: oklch(0.1 0 0);      /* Dark */
```

## Mock Data

### Venues (7 total)
- Grand Ballroom Downtown - Ballroom, $500/hr
- The Loft Space - Loft, $150/hr
- Sunny Garden Patio - Garden, $100/hr
- Industrial Warehouse - Warehouse, $300/hr
- Skyline Rooftop - Rooftop, $450/hr
- Creative Studio Loft - Loft, $200/hr
- Outdoor Park Pavilion - Outdoor, $80/hr

### Events (6 total)
- Jazz & Blues Night (Music)
- Future of AI Summit (Conference)
- Artisan Cooking Workshop (Workshop)
- Sunset Yoga Session (Wellness)
- Tech Conference 2024 (Conference)
- Weekend Music Festival (Music)

## Usage Tips

1. **Search**: Use the header search to find venues by name or location
2. **Filter**: Click "Filters" in sidebar to refine by price, type, or capacity
3. **Select**: Click a venue marker on map or in list to view details
4. **Book**: Click "Book Now" and complete the multi-step checkout
5. **Dashboard**: Click "My Bookings" in header to view reservations

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

Currently using mock data - no external API keys required. If integrating with real services:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Performance Optimizations

- Component-level memoization
- Lazy image loading with fallbacks
- Debounced search/filters
- SSE with polling fallback
- Optimistic UI updates

## Future Enhancements

1. Real Google Maps integration
2. User authentication system
3. Payment processing (Stripe)
4. Email notifications
5. Admin dashboard for hosts
6. Advanced analytics
7. Review and rating system
8. Wishlist functionality

## Support

For issues or questions, refer to the component files for implementation details. Each component is self-contained with clear prop interfaces defined in `/types/index.ts`.
