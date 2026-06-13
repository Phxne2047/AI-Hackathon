# CareGo Oasis - Nuxt 4 Conversion

นี่คือการแปลง HTML + Tailwind CSS จาก Google Stitch เป็น Nuxt 4 Component-Based Architecture ด้วย TypeScript และ Composition API

## 📁 Project Structure

```
carego-oasis/
├── app/
├── pages/
│   ├── index.vue           # Dashboard Page (แผงควบคุม)
│   ├── venue.vue           # Venue Details Page (รายละเอียดสถานที่)
│   └── search.vue          # Search Results Page (ค้นหาและจองบริการ)
├── layouts/
│   └── default.vue         # Default Layout
├── composables/
│   ├── useDashboardData.ts      # Dashboard mock data
│   ├── useVenueDetailData.ts    # Venue details mock data
│   └── useSearchResultsData.ts  # Search results mock data
├── types/
│   └── index.ts            # TypeScript type definitions
├── assets/
│   └── css/
│       └── main.css        # Global styles + Tailwind
├── tailwind.config.ts      # Tailwind configuration
├── nuxt.config.ts          # Nuxt configuration
└── package.json
```

## ✅ Implementation Checklist

- ✅ TypeScript + Composition API
- ✅ ทุก Tailwind class ยังคงเหมือนเดิม (ไม่มีการเปลี่ยน)
- ✅ Mock data แยกออกจากไฟล์ component (ใช้ composables)
- ✅ TypeScript types สำหรับ data ทั้งหมด
- ✅ Best practice folder structure

## 🎨 Features

### Dashboard Page (`pages/index.vue`)
- ✅ Timeline แผนการเดินทาง (Flight → Hotel → Event → Return)
- ✅ Accessibility KPI Cards (สายการบิน, ที่พัก, สถานที่)
- ✅ Facility Details Table
- ✅ Help Cards Section

### Venue Details Page (`pages/venue.vue`)
- ✅ Hero Image Section
- ✅ Info Summary (ราคา, วันที่ว่าง, คะแนนความสะดวก)
- ✅ Map Section with Interactive Markers
- ✅ About Description with Amenities Grid
- ✅ Gemini AI Analysis Box
- ✅ Booking Widget (sticky sidebar)
- ✅ Live Chat Simulator

### Search Results Page (`pages/search.vue`)
- ✅ Search Bar + Tab Switcher
- ✅ Accessibility Filters Sidebar
- ✅ Result Cards Grid
- ✅ Pagination Controls

## 📦 Data Structure

### Types (`types/index.ts`)

```typescript
// Dashboard
interface TimelineStep { ... }
interface AccessibilityKPI { ... }
interface FacilityDetail { ... }
interface DashboardData { ... }

// Venue Details
interface VenueDetail { ... }
interface ChatMessage { ... }

// Search Results
interface SearchResultCard { ... }
interface AccessibilityFilter { ... }
```

### Mock Data (Composables)

```typescript
// useDashboardData.ts
export const useDashboardData = (): DashboardData => { ... }

// useVenueDetailData.ts
export const useVenueDetailData = (): VenueDetail => { ... }
export const useChatMessages = (): ChatMessage[] => { ... }

// useSearchResultsData.ts
export const useSearchResultsData = () => { ... }
```

## 🎯 Key Improvements

1. **Component Reusability**: Pages เป็น composable functions ที่สามารถ reuse ได้
2. **Type Safety**: Full TypeScript type coverage
3. **Data Separation**: Mock data แยกออกจาก UI components
4. **Tailwind Preservation**: ทุก class ยังคงเดิม 100%
5. **Best Practices**:
   - Composition API ใหม่ (ไม่ใช้ Options API)
   - Composables สำหรับ logic
   - TypeScript strict mode
   - Clear folder structure

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
# หรือ
pnpm install
```

### Development Server
```bash
npm run dev
# Server จะรัน http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🎨 Tailwind Configuration

Custom theme colors, spacing, และ typography ได้ถูก configure ใน `tailwind.config.ts`:

```typescript
colors: {
  primary: '#091426',
  secondary: '#0051d5',
  tertiary: '#00190e',
  // ... และอีก 40+ colors
}

spacing: {
  sm: '8px',
  md: '16px',
  lg: '24px',
  // ... และอีก custom values
}

fontSize: {
  headline-lg: '32px',
  body-md: '16px',
  label-lg: '16px',
  // ... และอื่น ๆ
}
```

## 🔄 Navigation

- Dashboard: `/` (หน้าแรก)
- Venue Details: `/venue` (รายละเอียดสถานที่)
- Search Results: `/search` (ค้นหาและจองบริการ)

## 📝 Pages Breakdown

### Dashboard (index.vue)
**Mock Data**: `useDashboardData()`
- Timeline steps (4 items)
- 3 KPI cards
- 4 Facility details
- 2 Help cards

### Venue Details (venue.vue)
**Mock Data**: `useVenueDetailData()`, `useChatMessages()`
- Single venue information
- 5 amenities
- 2 safety badges
- 1 chat message

### Search Results (search.vue)
**Mock Data**: `useSearchResultsData()`
- 4 search result cards
- 4 accessibility filters
- Pagination (simplified)

## 🔐 TypeScript Type Safety

ทุก component มี strict type checking:
```typescript
const data = useDashboardData() // ✅ Returns DashboardData type
const venue = useVenueDetailData() // ✅ Returns VenueDetail type
const { cards, filters } = useSearchResultsData() // ✅ Returns typed object
```

## 📱 Responsive Design

ทั้งหมด layout ใช้ Tailwind responsive utilities:
- `grid-cols-1 lg:grid-cols-12` (Mobile first)
- `px-md md:px-xl` (Spacing)
- `flex-col md:flex-row` (Direction)

## 🎯 Future Enhancements

1. Connect to real API endpoints (replace composables with API calls)
2. Add state management (Pinia) for global state
3. Add form validation (VeeValidate)
4. Add image optimization (Nuxt Image)
5. Add animations (Framer Motion)
6. Add dark mode support

## 📞 Support

- Dashboard สำหรับแผนการเดินทาง
- Venue details สำหรับข้อมูลสถานที่
- Search สำหรับค้นหาประสบการณ์

---

**Built with ❤️ for Accessibility** ♿
