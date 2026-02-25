# Hong Kong Interactive Map with Leaflet

## Overview
Bản đồ tương tác chi tiết của Hong Kong sử dụng Leaflet (OpenStreetMap) hiển thị các venue và events tại Hong Kong với các tính năng thực tế.

## Dependencies Added
- `leaflet`: ^1.9.4 - Thư viện bản đồ mã nguồn mở
- `react-leaflet`: ^4.2.3 - React wrapper cho Leaflet
- `@types/leaflet`: ^1.9.8 - TypeScript types

## Key Features

### 1. Real Hong Kong Map
- Dựa trên OpenStreetMap (miễn phí, không cần API key)
- Hiển thị địa hình thực tế, đường phố, tên địa danh
- Zoom từ level 10-19
- Center tại 22.3°N, 114.17°E (Hong Kong central)

### 2. Interactive Markers
- Venue markers: Cyan (📍)
- Event markers: Purple (🎪) - Upcoming, Red (animate pulse) - Live
- Click markers → Popup với thông tin
- Click events → Detail modal hiển thị

### 3. Tab Switching
- **Venues Tab**: Hiển thị 7 venues tại HK với filters
- **Events Tab**: Hiển thị 15 events tại HK

### 4. Event Locations (Hong Kong)
```
Central (22.2854°N, 114.1569°E)
Causeway Bay (22.2808°N, 114.1848°E)
Tsim Sha Tsui (22.2964°N, 114.1732°E)
Mong Kok (22.3193°N, 114.1689°E)
Wan Chai (22.2704°N, 114.1844°E)
Sheung Wan (22.2868°N, 114.1458°E)
Repulse Bay (22.2844°N, 114.1806°E)
```

### 5. New Events (15 total)
1. **Jazz Festival** - Central Ballroom (Dec 28)
2. **Tech Summit** - Wan Chai Convention (Dec 30)
3. **Cantonese Cuisine** - Causeway Bay (Dec 29)
4. **Yoga at Repulse Bay** - Repulse Bay (Dec 27)
5. **Art Expo** - Causeway Bay (Dec 31, LIVE)
6. **Night Market** - Tsim Sha Tsui, FREE (Dec 26)
7. **Tech Pitch Competition** - Mong Kok (Jan 5)
8. **Heritage Walk** - Sheung Wan (Jan 2)
9. **New Year Gala** - Central (Jan 1)
10. **Digital Marketing** - Mong Kok (Jan 8)
11. **Food Festival** - Tsim Sha Tsui, FREE (Jan 15)
12. **Dance Showcase** - Wan Chai (Jan 20)
13. **Blockchain & Web3** - Mong Kok (Jan 18)
14. **Lunar New Year** - Central (Jan 29)
15. **Photography Workshop** - Tsim Sha Tsui (Jan 25)

## User Interaction Flow

### Viewing Events on Map
1. Click "Events" tab in sidebar
2. Map displays 15 events at their actual HK locations
3. Click event marker → Popup appears with event info
4. Click "View Details" → Full event modal opens

### Booking Event
1. From event popup: Click marker → View event modal
2. From sidebar: Click event card → Detail modal opens
3. Click **"Get Tickets"** → Opens booking modal
4. Fill booking form → Select venue/dates → Confirm booking
5. Success! Booking saved in dashboard

### Viewing Venues
1. Click "Venues" tab in sidebar
2. Map displays 7 venues with filters
3. Click venue marker → Popup shows venue info
4. Click venue in sidebar → Opens details

## Map UI Elements
- **Legend**: Top-left shows marker types
- **Marker Count**: Shows total events/venues
- **Zoom Controls**: Top-right (built-in Leaflet)
- **Attribution**: Bottom-left (OpenStreetMap)
- **Event Popups**: Rich content with event name, type, venue, date, price

## Technical Details

### HongKongMap Component
- Uses Leaflet with OpenStreetMap tiles
- Custom div icons for markers (emoji + color coding)
- Dynamic marker updates based on activeTab
- Popup content with click handlers

### Integration
- MapContainer wraps HongKongMap
- EventDetail modal shown when selectedEvent exists
- BookingModal triggered from "Get Tickets" button
- Context manages selectedEvent, activeTab state

### Styling
- Leaflet CSS imported in globals.css
- Custom dark theme styling for map containers
- Popup styled to match app's dark theme
- Marker animations for live events

## Performance
- SVG custom icons (faster than image-based markers)
- Lazy marker rendering
- Efficient event polling (30-second intervals)
- Optimized Leaflet configuration

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Mobile responsive (Leaflet is touch-optimized)

## Future Enhancements
- Clustering for many markers
- Search by area on map
- Heatmap showing event density
- Street view integration
- User location detection
