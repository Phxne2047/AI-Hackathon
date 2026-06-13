<template>
  <div class="bg-surface text-on-surface min-h-screen flex flex-col">
    <main class="flex-grow max-w-container-max mx-auto w-full px-md md:px-xl py-xl">
      <!-- Search & Switcher Tabs -->
      <section class="mb-xl">
        <div class="flex flex-col md:flex-row gap-lg items-end">
          <div class="flex-grow w-full">
            <h1 class="font-headline-lg text-headline-lg mb-md">ค้นหาประสบการณ์การเดินทางที่เข้าถึงได้</h1>
            <div class="relative w-full">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined">search</span>
              <input 
                v-model="searchQuery"
                class="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl focus:border-secondary focus:ring-0 transition-all font-body-md text-body-md shadow-sm focus-ring" 
                placeholder="ค้นหาจุดหมายปลายทาง กิจกรรม หรือเมืองจัดงาน..." 
                type="text"
              />
            </div>
          </div>
        </div>

        <!-- Tabs Switcher (Simulated) -->
        <div class="flex flex-wrap gap-md mt-lg">
          <button 
            @click="activeCategory = 'events'"
            class="flex-1 min-w-[140px] flex items-center justify-center gap-sm py-4 rounded-xl font-label-lg focus-ring transition-all"
            :class="activeCategory === 'events' ? 'bg-secondary text-on-secondary shadow-lg' : 'bg-surface-container-lowest text-on-surface-variant border-2 border-outline-variant'"
          >
            <span class="material-symbols-outlined fill-icon">confirmation_number</span>
            ตั๋วเข้าชมอีเวนต์
          </button>
          <button 
            @click="activeCategory = 'flights'"
            class="flex-1 min-w-[140px] flex items-center justify-center gap-sm py-4 rounded-xl font-label-lg focus-ring transition-all"
            :class="activeCategory === 'flights' ? 'bg-secondary text-on-secondary shadow-lg' : 'bg-surface-container-lowest text-on-surface-variant border-2 border-outline-variant hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed'"
          >
            <span class="material-symbols-outlined">flight</span>
            เที่ยวบิน
          </button>
          <button 
            @click="activeCategory = 'hotels'"
            class="flex-1 min-w-[140px] flex items-center justify-center gap-sm py-4 rounded-xl font-label-lg focus-ring transition-all"
            :class="activeCategory === 'hotels' ? 'bg-secondary text-on-secondary shadow-lg' : 'bg-surface-container-lowest text-on-surface-variant border-2 border-outline-variant hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed'"
          >
            <span class="material-symbols-outlined">hotel</span>
            โรงแรมที่พัก
          </button>
        </div>
      </section>

      <!-- Category Filtered Section -->
      <div v-if="activeCategory === 'events'" class="grid grid-cols-1 lg:grid-cols-4 gap-xl">
        <!-- Accessibility Priority Filter Bar (Left Side) -->
        <aside class="lg:col-span-1">
          <div class="bg-surface-container-lowest p-lg rounded-xl shadow-sm sticky top-28 space-y-md border border-outline-variant">
            <h2 class="font-headline-md text-headline-md mb-lg">ตัวกรองสิ่งอำนวยความสะดวก</h2>
            
            <div class="space-y-md">
              <label class="flex items-center gap-md group cursor-pointer p-sm rounded-lg hover:bg-surface-container transition-colors focus-within:ring-2 focus-within:ring-secondary">
                <input v-model="filterWheelchair" class="w-6 h-6 rounded custom-checkbox border-2 border-outline-variant focus:ring-0 text-secondary" type="checkbox"/>
                <span class="flex items-center gap-sm font-label-lg text-label-lg">
                  <span class="material-symbols-outlined text-secondary">accessible</span>
                  ทางลาดสำหรับรถเข็น
                </span>
              </label>

              <label class="flex items-center gap-md group cursor-pointer p-sm rounded-lg hover:bg-surface-container transition-colors focus-within:ring-2 focus-within:ring-secondary">
                <input v-model="filterInterpreter" class="w-6 h-6 rounded custom-checkbox border-2 border-outline-variant focus:ring-0 text-secondary" type="checkbox"/>
                <span class="flex items-center gap-sm font-label-lg text-label-lg">
                  <span class="material-symbols-outlined text-secondary">sign_language</span>
                  ล่ามภาษามือ
                </span>
              </label>

              <label class="flex items-center gap-md group cursor-pointer p-sm rounded-lg hover:bg-surface-container transition-colors focus-within:ring-2 focus-within:ring-secondary">
                <input v-model="filterQuiet" class="w-6 h-6 rounded custom-checkbox border-2 border-outline-variant focus:ring-0 text-secondary" type="checkbox"/>
                <span class="flex items-center gap-sm font-label-lg text-label-lg">
                  <span class="material-symbols-outlined text-secondary">volume_off</span>
                  พื้นที่สงบ/ห้องเงียบ
                </span>
              </label>

              <label class="flex items-center gap-md group cursor-pointer p-sm rounded-lg hover:bg-surface-container transition-colors focus-within:ring-2 focus-within:ring-secondary">
                <input v-model="filterAudio" class="w-6 h-6 rounded custom-checkbox border-2 border-outline-variant focus:ring-0 text-secondary" type="checkbox"/>
                <span class="flex items-center gap-sm font-label-lg text-label-lg">
                  <span class="material-symbols-outlined text-secondary">audio_description</span>
                  บริการคำบรรยายเสียง
                </span>
              </label>
            </div>

            <div class="mt-xl pt-xl border-t border-outline-variant">
              <button 
                @click="clearFilters"
                class="w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg hover:bg-primary-container transition-colors focus-ring"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          </div>
        </aside>

        <!-- Visual-Heavy Cards Grid (Right Side) -->
        <section class="lg:col-span-3 space-y-md">
          <div class="flex justify-between items-center mb-lg">
            <p class="font-body-md text-body-md text-on-surface-variant">
              พบอีเวนต์ทั้งหมด <span class="font-bold text-on-surface">{{ filteredEvents.length }}</span> รายการ
            </p>
            <div class="flex items-center gap-sm text-sm text-on-surface-variant bg-surface-container-low px-sm py-xs rounded-lg">
              <span class="material-symbols-outlined text-sm">stars</span>
              <span>AI จัดเรียงแนะนำตามโพรไฟล์ผู้ใช้: <strong>{{ currentUser.accessibility_profile || 'ปกติ' }}</strong></span>
            </div>
          </div>

          <!-- Event Cards List -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <article 
              v-for="ev in filteredEvents" 
              :key="ev.event_id"
              class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md flex flex-col group border-2 border-transparent hover:border-secondary transition-all"
              tabindex="0"
            >
              <div class="relative h-48">
                <img 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  :alt="ev.title" 
                  :src="getEventImage(ev.event_id)"
                />
                
                <!-- Match Score Badge -->
                <div 
                  v-if="isHighlyMatched(ev)"
                  class="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container px-3 py-1.5 rounded-full flex items-center gap-2 font-label-sm shadow-md"
                >
                  <span class="material-symbols-outlined text-sm">verified</span>
                  แนะนำพิเศษตามโพรไฟล์
                </div>
              </div>

              <div class="p-lg flex-grow flex flex-col space-y-sm">
                <!-- Title & Rating -->
                <div class="flex justify-between items-start">
                  <h3 class="font-headline-md text-headline-md text-primary leading-snug">
                    {{ ev.title }}
                  </h3>
                  <div class="flex items-center text-secondary flex-shrink-0">
                    <span class="material-symbols-outlined fill-icon text-sm">star</span>
                    <span class="font-label-lg ml-xs">4.9</span>
                  </div>
                </div>

                <!-- Date & Location -->
                <p class="text-xs text-on-surface-variant font-semibold flex items-center gap-xs">
                  <span class="material-symbols-outlined text-sm">event</span>
                  {{ formatDate(ev.date) }}
                  <span class="material-symbols-outlined text-sm ml-sm">location_on</span>
                  {{ ev.location }}
                </p>

                <!-- Amenities Badges -->
                <div class="flex flex-wrap gap-xs py-1">
                  <span 
                    v-for="feature in ev.accessibility_features" 
                    :key="feature"
                    class="bg-surface-container text-on-surface-variant px-2 py-1 rounded text-xs font-semibold capitalize flex items-center gap-xs"
                  >
                    <span class="material-symbols-outlined text-xs">{{ getFeatureIcon(feature) }}</span>
                    {{ getFeatureText(feature) }}
                  </span>
                </div>

                <!-- Gemini AI Scan Review (Summarized accessibility details) -->
                <div class="bg-primary-container text-on-primary-fixed p-sm rounded-lg border border-white/10 relative">
                  <div class="flex items-center gap-xs mb-xs text-xs text-white font-semibold">
                    <span class="material-symbols-outlined text-xs">temp_preferences_custom</span>
                    <span>AI Guardian Verification Report</span>
                  </div>
                  <p class="text-xs text-white/95 leading-relaxed italic" :class="textScaleClass">
                    "{{ getAIScanSummary(ev) }}"
                  </p>
                  
                  <!-- Speech & Large text controls -->
                  <div class="flex items-center gap-sm mt-sm">
                    <button 
                      @click.stop="speakSummary(getAIScanSummary(ev))" 
                      class="flex items-center gap-xs text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors focus-ring"
                      aria-label="ฟังเสียงรายงาน"
                    >
                      <span class="material-symbols-outlined text-[10px]">volume_up</span>
                      <span>ฟังเสียงสรุป</span>
                    </button>
                    <button 
                      @click.stop="isLargeText = !isLargeText"
                      class="flex items-center gap-xs text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors focus-ring"
                      aria-label="ขยายตัวอักษรใหญ่พิเศษ"
                    >
                      <span class="material-symbols-outlined text-[10px]">text_fields</span>
                      <span>{{ isLargeText ? 'ตัวหนังสือปกติ' : 'ตัวหนังสือใหญ่พิเศษ' }}</span>
                    </button>
                  </div>
                </div>

                <!-- Footer Selections and Action -->
                <div class="mt-auto pt-sm flex justify-between items-center">
                  <div>
                    <span class="text-on-surface-variant text-[10px] block font-bold">ราคาบัตรเริ่มต้น</span>
                    <span class="text-secondary font-headline-md font-bold">
                      {{ ev.ticket_price === 0 ? 'ฟรี (ลงทะเบียน)' : `฿${ev.ticket_price.toLocaleString()}` }}
                    </span>
                  </div>
                  <button 
                    @click="selectEventAndPlan(ev)"
                    class="bg-secondary text-on-secondary px-6 py-3 rounded-xl font-label-lg hover:bg-secondary-container transition-colors focus-ring shadow-sm"
                  >
                    จองและจัดแผนทริป
                  </button>
                </div>
              </div>
            </article>
          </div>

          <!-- Pagination (Static Mock) -->
          <div class="mt-xl flex justify-center gap-sm">
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-high hover:bg-outline-variant focus-ring">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary text-on-secondary font-label-lg focus-ring">1</button>
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-low hover:bg-surface-container-high font-label-lg focus-ring">2</button>
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-high hover:bg-outline-variant focus-ring">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </div>

      <!-- Other Categories Stub (Flight/Hotel search simulation) -->
      <div v-else class="bg-surface-container-lowest p-xl rounded-xl shadow-md border text-center py-xxl space-y-md">
        <span class="material-symbols-outlined text-[64px] text-secondary">
          {{ activeCategory === 'flights' ? 'flight' : 'hotel' }}
        </span>
        <h2 class="font-headline-md text-headline-md text-primary">
          {{ activeCategory === 'flights' ? 'บริการค้นหาเที่ยวบินอัจฉริยะ' : 'บริการค้นหาที่พักอารยสถาปัตยกรรม' }}
        </h2>
        <p class="font-body-md text-on-surface-variant max-w-md mx-auto">
          เพื่อประสิทธิภาพและความปลอดภัยสูงสุดของทริป แนะนำให้คุณเริ่มเลือกอีเวนต์/วันงานที่ต้องการเข้าร่วมก่อนเป็นอันดับแรก จากนั้นระบบ AI ของเราจะดึงข้อมูลเที่ยวบินและโรงแรมรอบพิกัดงานที่ตรงกับโพรไฟล์ของคุณให้กดจองในหน้าเดียวโดยอัตโนมัติ
        </p>
        <button 
          @click="activeCategory = 'events'" 
          class="bg-secondary text-white py-sm px-xl rounded-xl font-label-lg hover:bg-secondary-container transition-all focus-ring shadow-md"
        >
          กลับไปเลือกอีเวนต์
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppState } from '~/composables/useAppState'
import type { Event } from '~/types'

const router = useRouter()
const state = useAppState()
const { events, currentUser, reviews, selectedEvent } = state

// Search and filter States
const searchQuery = ref('')
const activeCategory = ref<'events' | 'flights' | 'hotels'>('events')
const filterWheelchair = ref(false)
const filterInterpreter = ref(false)
const filterQuiet = ref(false)
const filterAudio = ref(false)
const isLargeText = ref(false)

const textScaleClass = computed(() => {
  return isLargeText.value ? 'text-lg font-bold' : 'text-xs'
})

// Clear Filters
const clearFilters = () => {
  filterWheelchair.value = false
  filterInterpreter.value = false
  filterQuiet.value = false
  filterAudio.value = false
  searchQuery.value = ''
}

// Check if event matches user accessibility profile
const isHighlyMatched = (ev: Event) => {
  const profile = currentUser.value.accessibility_profile
  if (!profile || !ev.accessibility_features) return false
  
  if (profile === 'physical' && ev.accessibility_features.includes('wheelchair_ramp')) return true
  if (profile === 'hearing' && ev.accessibility_features.includes('sign_interpreter')) return true
  if (profile === 'sensory' && (ev.accessibility_features.includes('quiet_zone') || ev.accessibility_features.includes('sensory_friendly'))) return true
  if (profile === 'visual' && ev.accessibility_features.includes('audio_description')) return true
  
  return false
}

// Sort & Filter events list
const filteredEvents = computed(() => {
  let list = [...events.value]

  // Filter by Search Query
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(ev => 
      ev.title.toLowerCase().includes(q) || 
      ev.location.toLowerCase().includes(q)
    )
  }

  // Filter by Checkbox Amenities
  if (filterWheelchair.value) {
    list = list.filter(ev => ev.accessibility_features?.includes('wheelchair_ramp'))
  }
  if (filterInterpreter.value) {
    list = list.filter(ev => ev.accessibility_features?.includes('sign_interpreter'))
  }
  if (filterQuiet.value) {
    list = list.filter(ev => ev.accessibility_features?.includes('quiet_zone'))
  }
  if (filterAudio.value) {
    list = list.filter(ev => ev.accessibility_features?.includes('audio_description'))
  }

  // Sort: prioritize matches based on active user accessibility profile
  list.sort((a, b) => {
    const matchA = isHighlyMatched(a) ? 1 : 0
    const matchB = isHighlyMatched(b) ? 1 : 0
    return matchB - matchA // Decending order (true matches on top)
  })

  return list
})

// Get Event Image (rotate through mock images)
const getEventImage = (eventId: string) => {
  const images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCc4Vdgt0bPLdz25zebZdFXA8W5Qolf1q5C6OuRAtyEO4hZwRYK0KUDx7HrZDS6IXvKIY8jbSztsDdkD3xPYji4zL5m5ftlEpX6iCNZALS6pjWmci9LUyYXW7ZoxLRF7zjj6D9Np-0aM8gePt-2qHkN1SFNTuOOMtCNSfZYGpbgvlyCRKOeSrxwpQN52agNUB0MaespgPb3wWO9174-okKemNk50fBUWOGpCvQNN6mWq0Au25mKeN_bScpJwd-6NcVP7Pxu5hslynXz',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBoRl9q5NqbgLpRCDOY9KrUYtm6-gruaNlKCnGbMyJZ74KnOyDuzp-kBPKC9kpPtwosWbh0WajlRpDOjL1uULnL8GP8fyzRXMg-4hBYvBf73_LXG9yL--EBDNmRyW7OetYtj5px0-I9uhoWM5ccP4c7ZGJGwO-gr59iq7_SniqvL2obiZMM45QPDABNSSZXhCDLoSmIuO8utF6iQKKvXODG6rOcLOm9O-VCLyskHHLRhNo7Wf6uceyP7sf8KFS3ksn-YdegTQs_0s1K',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDl7Y8jCZ5XagyDZ7dTWTy03y3nGzM5mPpzJrvq9SCVFUNrs6Cw8T9YLt7YtwbKZ2903h4UT29I3zkKy0xvf_ANKEpxo91BvcjKFLMIz8J3p-O4PlMhOsCYps7OkLYTEDTX0ASk9ErOnU2qcsGPngmjJQJpMIRROewkdk3FdnVsk2rD_rlwsJ6hLfLAJ0FxEQjUDvczgwVlJ4w2Vf0wMOC9U-ZzEdF4tVx0CtoPN3Dz_n_0TY1NHoRyxE5BalYW4q_YiJl2X9U-cCPA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDK8FhCKdsg21srGwhocLX2YxKqYhuA_EnPZfdB_NJfGaBkesiHocMYXJ0IyuVmdlTSB7XJ_xdxpiHCJrhpnRlGOgN2busPZZ9GjhZtBv7EeoaGRB0-9aN3PHopd2VNkzuW_drkaPP6ZEj12BHi5CROPxCSZPX4jsAhluTUxPEfX3BfPyccgqjVwvmIEeke3hygNVdAA-CX5PtnRs4n4K8afiK6iE5Y3U7jiwpOmu_NyeqmGKy8_LmqFjwmct4ezB3McMuHqeJYZNoh'
  ]
  
  // Calculate index based on event_id hash-like number
  const charSum = eventId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return images[charSum % images.length]
}

// Text to Speech
const speakSummary = (text: string) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speaking first
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'th-TH'
    utterance.rate = 1.0
    window.speechSynthesis.speak(utterance)
  } else {
    alert('บราวเซอร์ของคุณไม่รองรับบริการฟังเสียงสังเคราะห์ (Web Speech API)')
  }
}

// AI Venue Accessibility Summary
const getAIScanSummary = (ev: Event) => {
  // Pull mock accessibility reviews or summarize dynamically based on features
  const venue = ev.location
  const features = ev.accessibility_features || []
  
  if (venue.includes('BITEC') || venue.includes('Impact') || venue.includes('QSNCC')) {
    return `วิเคราะห์สถานที่จัดงาน (${venue}): อาคารทางราบ 100% มีจุดขึ้นลงทางลาดรถเข็นกว้างขวางระดับเอียง 7 องศา ประตูห้องน้ำผู้พิการกว้าง 95 ซม. เป็นแบบอัตโนมัติพร้อมราวจับเหล็กยึดแน่นหนา ปลอดภัยต่อการใช้ไฟฟ้าชาร์จรถเข็น`
  }
  if (venue.includes('Chiang Mai Hall') || venue.includes('Lanna')) {
    return `วิเคราะห์สถานที่จัดงาน (Chiang Mai Hall): ทางลาดทางเข้าอาคารมีระนาบเอียง 8.5 องศาเล็กน้อยแต่ผ่านเกณฑ์ ลิฟต์กว้าง 110 ซม. รองรับอักษรเบรลล์ และจุดหน้าสุดมีการล็อกบัตรเพื่อจัดโควตาเก้าอี้ล่ามภาษามือแปลสด`
  }
  if (venue.includes('Thunder Dome') || venue.includes('Paragon')) {
    return `วิเคราะห์สถานที่จัดงาน (${venue}): พื้นที่ทางเดินกว้างขวาง ประตูผ่านเข้าออกกว้าง 120 ซม. มีปุ่มขอความช่วยเหลือฉุกเฉิน และจัดห้องพักผ่อนสำหรับผู้ต้องการความเงียบและสงบพิเศษลดอาการเวียนหัว`
  }

  // Fallback dynamic text
  const UDList = features.map(f => getFeatureText(f)).join(', ')
  return `วิเคราะห์สถานที่จัดงาน (${venue}): ได้รับการตรวจสอบและประเมินผ่านเกณฑ์ Universal Design (UD Verified) เรียบร้อยแล้ว รองรับบริการอำนวยความสะดวก: ${UDList || 'การดูแลพิเศษพื้นฐาน'}`
}

const getFeatureIcon = (feature: string) => {
  switch (feature) {
    case 'wheelchair_ramp': return 'accessible'
    case 'sign_interpreter': return 'sign_language'
    case 'quiet_zone': return 'volume_off'
    case 'sensory_friendly': return 'relax'
    case 'audio_description': return 'audio_description'
    default: return 'check_circle'
  }
}

const getFeatureText = (feature: string) => {
  switch (feature) {
    case 'wheelchair_ramp': return 'ทางลาดรถเข็น'
    case 'sign_interpreter': return 'ล่ามภาษามือ'
    case 'quiet_zone': return 'พื้นที่สงบเงียบ'
    case 'sensory_friendly': return 'เป็นมิตรต่อสัมผัส'
    case 'audio_description': return 'บรรยายเสียงพากย์'
    default: return feature
  }
}

const formatDate = (isoString: string) => {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('th-TH', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  } catch (e) {
    return isoString
  }
}

// Select Event and advance to Step 2
const selectEventAndPlan = (ev: Event) => {
  selectedEvent.value = ev
  // Setup default seating selection
  if (currentUser.value.accessibility_profile === 'physical') {
    state.specialSeating.value = 'โซนวีลแชร์แถวหน้าสุด (A1)'
    state.specialNeeds.value = 'ห้องพักสำหรับผู้ใช้วีลแชร์ ชั้น G ห้องน้ำกว้างพิเศษ'
  } else if (currentUser.value.accessibility_profile === 'hearing') {
    state.specialSeating.value = 'โซนแถวหน้าสุดใกล้จอเวทีเพื่อมองล่ามภาษามือชัดเจน (H2)'
    state.specialNeeds.value = 'ห้องพักที่มีระบบสัญญาณเตือนไฟไหม้แบบไฟกระพริบฉุกเฉิน'
  } else if (currentUser.value.accessibility_profile === 'visual') {
    state.specialSeating.value = 'โซนแถวกลางใกล้ระบบเสียงนำทางและลำโพงหลัก (V5)'
    state.specialNeeds.value = 'ห้องพักที่มีการปูเส้นทางสัญลักษณ์นำทางคนตาบอดและปุ่มกดเบรลล์'
  } else {
    state.specialSeating.value = 'โซนธรรมดากลางแถวพิเศษ'
    state.specialNeeds.value = 'ห้องพักมาตรฐานเข้าถึงได้'
  }
  
  router.push('/booking')
}
</script>

<style scoped>
.fill-icon {
  font-variation-settings: 'FILL' 1;
}
.custom-checkbox:checked {
  background-color: #0051d5;
  border-color: #0051d5;
}
</style>
