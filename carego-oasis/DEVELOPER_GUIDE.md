# Developer Quick Reference

## 📊 Data Flow Architecture

```
Pages (Vue Components)
    ↓
Composables (useDashboardData, etc.)
    ↓
Mock Data / API
    ↓
Types (TypeScript Interfaces)
    ↓
UI Rendering with Tailwind Classes
```

## 📝 Component Template Pattern

ทุก page component ใช้ pattern นี้:

```vue
<template>
  <!-- HTML with Tailwind classes -->
</template>

<script setup lang="ts">
// 1. Import types
import type { TimelineStep } from '~/types'

// 2. Use composables
const data = useDashboardData()

// 3. Define computed/methods
const getStepIcon = (type: TimelineStep['type']): string => {
  // implementation
}
</script>

<style scoped>
/* Scoped styles if needed */
</style>
```

## 🔄 Adding New Pages

### Step 1: Define Types
```typescript
// types/index.ts
export interface MyData {
  id: string
  title: string
}
```

### Step 2: Create Mock Data Composable
```typescript
// composables/useMyData.ts
export const useMyData = (): MyData[] => {
  return [{ id: '1', title: 'Example' }]
}
```

### Step 3: Create Page Component
```vue
<!-- pages/mypage.vue -->
<script setup lang="ts">
const data = useMyData()
</script>
```

## 🎨 Using Tailwind Classes

ทั้งหมด custom classes ยังคงใช้ได้เหมือนเดิม:

```html
<!-- Custom colors -->
<div class="text-primary bg-secondary-container">

<!-- Custom spacing -->
<div class="px-lg py-md gap-xl">

<!-- Custom font sizes -->
<p class="font-headline-md text-headline-md">

<!-- Responsive -->
<div class="grid-cols-1 lg:grid-cols-12 gap-xl">
```

## 📱 Material Symbols Icons

ใช้ Material Symbols Outlined icon font:

```html
<span class="material-symbols-outlined">accessibility_new</span>
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">verified</span>
```

## 🔗 Navigation Links

```vue
<!-- Using NuxtLink (recommended) -->
<NuxtLink to="/">Dashboard</NuxtLink>
<NuxtLink to="/venue">Venue Details</NuxtLink>
<NuxtLink to="/search">Search</NuxtLink>

<!-- Regular links -->
<a href="#">External Link</a>
```

## 🎯 TypeScript Best Practices

### ✅ Good
```typescript
const data: DashboardData = useDashboardData()
const getIcon = (type: TimelineStep['type']): string => { ... }
```

### ❌ Avoid
```typescript
const data = useDashboardData() as any
const getIcon = (type: any): any => { ... }
```

## 📦 Exported Composables

### useDashboardData.ts
- Returns: `DashboardData`
- Contains: timeline, kpis, facilities

### useVenueDetailData.ts
- Returns: `VenueDetail`
- Also: `useChatMessages()` → `ChatMessage[]`

### useSearchResultsData.ts
- Returns: `{ cards, filters, totalCount, location }`
- Types: `SearchResultCard[]`, `AccessibilityFilter[]`

## 🧪 Testing Data

### Mock Data Locations
- Dashboard mock: `/composables/useDashboardData.ts`
- Venue mock: `/composables/useVenueDetailData.ts`
- Search mock: `/composables/useSearchResultsData.ts`

### Modifying Mock Data
```typescript
// Edit the array in composables and component auto-updates
export const useDashboardData = (): DashboardData => {
  return {
    greeting: 'สวัสดี', // ✏️ Change here
    timeline: [...],
    kpis: [...],
    facilities: [...]
  }
}
```

## 🚀 Performance Tips

1. **Lazy Load Pages**: Nuxt auto-code-splits pages
2. **Image Optimization**: Replace hardcoded img src with Nuxt Image
3. **Component Reusability**: Extract repeated UI into components
4. **Tailwind Purging**: Only used classes are included in build

## 🔍 Debugging

### Chrome DevTools
```javascript
// Check component data
$el.__vue__.$data

// Access composable data
useMyData()
```

### Nuxt DevTools
Press `Shift+Alt+D` to open Nuxt DevTools

## 📚 Resources

- [Nuxt 4 Docs](https://nuxt.com)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Material Symbols](https://fonts.google.com/icons)

## ✅ Checklist Before Deploy

- [ ] All composables return correct types
- [ ] Pages import from composables
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile
- [ ] Tailwind classes apply correctly
- [ ] TypeScript strict mode passes
- [ ] Navigation links work
- [ ] Images load correctly

---

**Last Updated**: 2025-01-15
**Version**: Nuxt 4.4.8
