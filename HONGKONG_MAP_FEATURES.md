# Hong Kong Event Booking Platform - Map Features

## Overview

Trang chủ của EventSpace giờ đây tích hợp một bản đồ Hong Kong tương tác hiển thị các sự kiện và venue tại Hong Kong, được thiết kế để cho phép người dùng dễ dàng khám phá và đặt vé cho các sự kiện.

## Core Features

### 1. Interactive Hong Kong Map
- **Geographic Boundaries**: Bản đồ được giới hạn trong phạm vi địa lý chính xác của Hong Kong (22.15°N - 22.5°N, 113.95°E - 114.4°E)
- **Stylized Visualization**: Sử dụng SVG rendering để hiển thị bản đồ Hong Kong theo phong cách, bao gồm biên giới, đảo và vùng nước
- **Real-time Coordinates**: Tất cả venue và event đều có tọa độ GPS chính xác cho Hong Kong

### 2. Dual Tab Interface
**Venues Tab**:
- Hiển thị 7 venue tại Hong Kong (Central, Causeway Bay, Tsim Sha Tsui, Mong Kok, Wan Chai, Sheung Wan, Repulse Bay)
- Filters: Giá, loại venue, sức chứa
- Markers màu cyan trên bản đồ
- Click vào marker để xem chi tiết venue

**Events Tab**:
- Hiển thị 10 sự kiện đang diễn ra hoặc sắp tới tại Hong Kong
- Markers màu purple (sắp tới) hoặc đỏ (đang diễn ra) 
- Animated pulse effect cho các sự kiện live
- Click vào marker để mở chi tiết event

### 3. Venue Markers & Display
- **Cyan Dots (Venues)**: Hiển thị vị trí các venue trên bản đồ
- **Purple Dots (Upcoming Events)**: Sự kiện sắp tới vào ngày trong tương lai
- **Red Dots (Live Events)**: Sự kiện đang diễn ra hiện tại (với pulse animation)
- **Hover Tooltip**: Hiển thị tên khi hover qua marker
- **Click Interaction**: Click vào marker để xem chi tiết đầy đủ

### 4. Event Detail Modal
Khi click vào event marker, modal sẽ hiển thị:
- Hình ảnh sự kiện
- Tên và loại sự kiện (Music, Conference, Workshop, etc.)
- Ngày, giờ, và địa điểm chi tiết
- Số người đã đăng ký
- Mô tả đầy đủ về sự kiện
- Thông tin venue
- Giá vé hoặc "FREE" nếu miễn phí
- Nút "Get Tickets" để đặt vé

### 5. Real-time Updates
- **Venue Availability**: Cập nhật số ghế trống mỗi 5 giây
- **Event Attendance**: Cập nhật số người đăng ký mỗi 30 giây
- **Live Status**: Sự kiện đang diễn ra được đánh dấu "LIVE NOW" với animation
- **Polling Mechanism**: Sử dụng polling từ `/api/realtime/updates`

### 6. Legend & Controls
- **Map Legend**: Hiển thị màu sắc cho venues, events sắp tới, và live events
- **Zoom Controls**: Nút +/- để phóng to/thu nhỏ bản đồ
- **Marker Count**: Hiển thị số venue/event được hiển thị
- **Location Info**: Tọa độ và tên khu vực (Hong Kong)

## Data Structure

### Venues (7 tại Hong Kong)
1. Central Grand Ballroom - Central (22.2854°N, 114.1569°E)
2. Causeway Bay Arts Studio - Causeway Bay (22.2808°N, 114.1848°E)
3. Tsim Sha Tsui Waterfront Venue - Tsim Sha Tsui (22.2964°N, 114.1732°E)
4. Mong Kok Industrial Loft - Mong Kok (22.3193°N, 114.1689°E)
5. Wan Chai Convention Hall - Wan Chai (22.2704°N, 114.1844°E)
6. Sheung Wan Heritage Space - Sheung Wan (22.2868°N, 114.1458°E)
7. Repulse Bay Outdoor Pavilion - Repulse Bay (22.2844°N, 114.1806°E)

### Events (10 tại Hong Kong)
- Distributed across December 2024 - January 2025
- Types: Music, Conference, Workshop, Wellness, Wedding
- Price range: Free - HK$699
- Attendance: 45 - 1200 people

## User Interaction Flow

1. User tiba trang chủ và thấy bản đồ Hong Kong
2. Default: **Venues Tab** được chọn, hiển thị 7 venue
3. User có thể:
   - **Switch to Events Tab** để xem các sự kiện
   - **Click trên marker** để xem chi tiết
   - **Use zoom controls** để phóng to/thu nhỏ
   - **Apply filters** (venues only) - giá, loại, sức chứa
4. Khi click vào event, modal hiển thị toàn bộ thông tin
5. User nhấn "Get Tickets" để mở booking flow

## Technical Components

### New Components
- `HongKongMap.tsx` - SVG-based interactive map
- `EventDetail.tsx` - Modal hiển thị chi tiết sự kiện

### Updated Components
- `VenueContext.tsx` - Added events state, selectedEvent, activeTab
- `VenuesSidebar.tsx` - Added Venues/Events tab switching
- `MapContainer.tsx` - Integrated HongKongMap and EventDetail

### APIs
- `/api/realtime/updates` - Real-time venue/event updates
- `/api/venues` - Venue data
- `/api/events` - Event data

## Feature Highlights

✅ Bản đồ HTML/SVG không cần API key  
✅ Interactive venue & event markers  
✅ Real-time availability updates  
✅ Tab switching giữa Venues & Events  
✅ Event detail modal với booking CTA  
✅ Responsive design - mobile friendly  
✅ Dark theme với accent colors (cyan/purple)  
✅ All text in English  
✅ Mock data - không cần backend thực  

## Future Enhancements

- Integration with actual Google Maps API
- WebSocket for true real-time updates
- User authentication & saved favorites
- Advanced filters (date, distance, etc.)
- Event booking confirmation & payment
- Review & rating system
- Map clustering for dense areas
