# 🚀 Quick Start Guide

## ⚡ 5-Minute Setup

### 1️⃣ Navigate to Project
```bash
cd /Users/pattama/Documents/AI-Hackathon/carego-oasis
```

### 2️⃣ Install Dependencies
```bash
# Using npm (recommended for macOS)
npm install

# OR using pnpm
pnpm install
```

### 3️⃣ Start Development Server
```bash
npm run dev
```

### 4️⃣ Open in Browser
```
http://localhost:3000
```

✅ **You're done!** The app is now running.

---

## 🧭 Navigate the App

### Dashboard (Default Page)
- **URL**: `http://localhost:3000`
- **File**: `pages/index.vue`
- **Shows**: Travel timeline, KPIs, facility details

### Venue Details
- **URL**: `http://localhost:3000/venue`
- **File**: `pages/venue.vue`
- **Shows**: Hotel information, amenities, booking form

### Search Results
- **URL**: `http://localhost:3000/search`
- **File**: `pages/search.vue`
- **Shows**: Searchable results, filters, cards

---

## 📝 File Locations Quick Reference

```
Project Root: /Users/pattama/Documents/AI-Hackathon/carego-oasis

📄 Pages (UI Components)
   pages/index.vue          ← Dashboard
   pages/venue.vue          ← Venue details
   pages/search.vue         ← Search results

📊 Data Layer
   composables/useDashboardData.ts      ← Dashboard data
   composables/useVenueDetailData.ts    ← Venue data
   composables/useSearchResultsData.ts  ← Search data

🔷 TypeScript Types
   types/index.ts           ← All interfaces

⚙️ Configuration
   tailwind.config.ts       ← Tailwind setup
   nuxt.config.ts           ← Nuxt setup
   package.json             ← Dependencies

📚 Documentation
   CONVERSION_GUIDE.md      ← Detailed guide
   DEVELOPER_GUIDE.md       ← Developer reference
   BEFORE_AFTER.md          ← Comparison
```

---

## 🎨 Editing Components

### Edit a Page
```vue
<!-- pages/index.vue -->
<script setup lang="ts">
const data = useDashboardData()  // Get data from composable
</script>

<template>
  <!-- Edit HTML here -->
  <div class="font-display text-display text-primary">
    {{ data.greeting }}
  </div>
</template>
```

### Edit Mock Data
```typescript
// composables/useDashboardData.ts
export const useDashboardData = (): DashboardData => {
  return {
    greeting: 'สวัสดี!',  // ← Edit this
    timeline: [...],
    kpis: [...],
  }
}
```

**Changes auto-reload in browser!** ✨

---

## 🔍 Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Type checking
npm run typecheck        # Check TypeScript (if configured)

# Linting
npm run lint             # Lint code (if configured)
```

---

## 🧪 Quick Testing

### Test Dashboard Link
1. Open `http://localhost:3000`
2. See "สวัสดีครับ คุณนัท" greeting
3. See travel timeline

### Test Navigation
1. Look for navigation links at top
2. Click "Search" → goes to `/search`
3. Click "Dashboard" → goes to `/`

### Test Data Flow
1. Open DevTools (F12)
2. Go to Console
3. Type `useSearchResultsData()` → see data returned

---

## ⚠️ Troubleshooting

### Problem: Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
# Then visit http://localhost:3001
```

### Problem: Dependencies not installing
```bash
# Clear cache
rm -rf node_modules pnpm-lock.yaml
npm install
```

### Problem: Styles not loading
```bash
# Rebuild Tailwind
npm run build
```

### Problem: TypeScript errors
```bash
# Check tsconfig.json
# Run type checking
npm run typecheck  # (if configured)
```

---

## 💡 Pro Tips

### 🔥 Hot Reload
- Edit a `.vue` file → auto updates in browser
- Edit `composables/` → auto updates components
- Edit `types/` → type errors shown in editor

### 🎯 TypeScript IntelliSense
```typescript
// Start typing to see suggestions
const data = useDashboard   // ← Shows autocomplete
const item = data.          // ← Shows available properties
```

### 🖼️ Vue DevTools
```
Press: Shift + Alt + D
```
Opens Nuxt DevTools panel to inspect components

### 📱 Responsive Testing
- Open DevTools (F12)
- Click device toggle (mobile icon)
- Test on different screen sizes

---

## 📚 Next Steps

### If you want to **add new data**:
1. Add interface to `types/index.ts`
2. Create composable in `composables/`
3. Use in page component with `useYourComposable()`

### If you want to **connect to API**:
1. Replace composables with API calls
2. Add loading states
3. Add error handling

### If you want to **modify styling**:
1. Edit `tailwind.config.ts` for config changes
2. Edit `assets/css/main.css` for global styles
3. Edit `pages/*.vue` for component classes

### If you want to **add new pages**:
1. Create `pages/newpage.vue`
2. Use router: `<NuxtLink to="/newpage">`
3. Nuxt auto-generates routes!

---

## 🔗 Resources

- [Nuxt Docs](https://nuxt.com)
- [Vue 3 Docs](https://vuejs.org)
- [Tailwind Docs](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org)

---

## ✅ Verification Checklist

Run this to verify everything works:

```bash
# 1. Start dev server
npm run dev
# ✅ Should see "listening on port 3000"

# 2. Visit http://localhost:3000
# ✅ Should see dashboard with greeting

# 3. Click navigation links
# ✅ Should navigate to /venue and /search

# 4. Open DevTools (F12)
# ✅ Should see no console errors

# 5. Try HotReload
# ✅ Edit pages/index.vue → should auto-update
```

---

## 🎉 You're Ready!

Everything is set up and ready to go. Start developing! 

**Key Commands to Remember**:
```bash
npm install     # Install dependencies
npm run dev     # Start development
npm run build   # Build for production
```

**Happy coding!** 🚀

---

> 💬 Questions? Check `DEVELOPER_GUIDE.md` or `CONVERSION_GUIDE.md`
