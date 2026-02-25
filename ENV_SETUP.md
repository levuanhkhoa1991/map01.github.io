# Environment Setup

## To get the app fully working:

### Option 1: Use with Fallback Map (Recommended for testing)
The app works out of the box with an SVG-based map visualization. All features are functional without any API keys.

**Just run the app!** No additional setup needed.

### Option 2: Enable Real Google Maps
If you want to use real Google Maps visualization:

1. **Get a Google Maps API Key:**
   - Go to https://console.cloud.google.com
   - Create a new project or select existing one
   - Enable "Maps JavaScript API"
   - Create API key credentials
   - Copy your API key

2. **Add to Environment Variables:**
   - Open the "Vars" sidebar in v0
   - Add variable: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = your_api_key_here
   - The app will automatically use real Google Maps

## App Features (All Work Without Setup):

✅ View live venues on interactive map  
✅ Filter venues by price, type, and capacity  
✅ Search venues in sidebar  
✅ Real-time venue availability updates (simulated)  
✅ Multi-step booking checkout flow  
✅ View all bookings in dashboard  
✅ Download booking receipts  

## Mock Data Included:

- 7 pre-loaded venues with images and amenities
- 12 live events with different categories
- Realistic booking data and pricing
- Live status updates every 5 seconds

## Testing the App:

1. Click on any venue marker on the map or select from sidebar
2. Click "Book Now" to open the booking modal
3. Fill in event details (date, time, guests)
4. Complete checkout with contact info
5. View your booking in the dashboard
6. Try the filters and search in the sidebar
