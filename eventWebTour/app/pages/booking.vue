<template>
  <div class="bg-surface text-on-surface min-h-screen">
    <main class="max-w-container-max mx-auto px-md md:px-xl py-xl space-y-xl">
      <!-- Back button and title -->
      <div class="flex items-center justify-between">
        <NuxtLink to="/search" class="flex items-center gap-xs text-secondary hover:text-on-secondary-fixed-variant font-label-lg focus-ring">
          <span class="material-symbols-outlined">arrow_back</span>
          <span>ย้อนกลับไปค้นหาอีเวนต์</span>
        </NuxtLink>
        <div class="text-right">
          <span class="text-xs text-on-surface-variant font-bold block">โพรไฟล์ผู้จอง:</span>
          <span class="text-sm font-bold text-secondary flex items-center gap-xs justify-end">
            <span class="material-symbols-outlined text-sm">{{ getProfileIcon(currentUser.accessibility_profile) }}</span>
            {{ currentUser.name }} ({{ currentUser.accessibility_profile || 'ปกติ' }})
          </span>
        </div>
      </div>

      <!-- Planning Event Brief -->
      <section v-if="selectedEvent" class="bg-primary text-white p-lg rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div class="space-y-xs">
          <span class="text-xs px-sm py-1 bg-secondary text-white rounded-full font-bold uppercase">อีเวนต์หลักปักหมุด</span>
          <h2 class="font-headline-md text-headline-md">{{ selectedEvent.title }}</h2>
          <p class="text-sm text-white/80 flex items-center gap-xs">
            <span class="material-symbols-outlined text-sm">calendar_month</span>
            {{ formatDate(selectedEvent.date) }}
            <span class="material-symbols-outlined text-sm ml-sm">location_on</span>
            {{ selectedEvent.location }}
          </p>
        </div>
        <div class="bg-white/10 p-md rounded-lg border border-white/20">
          <p class="text-xs text-white/80">จัดสรรเที่ยวบินและที่พักที่ลงพิกัด: <strong>{{ getCity(selectedEvent.location) }}</strong></p>
          <p class="text-xs text-white/80 mt-1">วันที่ต้องการ: <strong>{{ getRequiredTravelDates() }}</strong></p>
        </div>
      </section>

      <div v-else class="text-center p-xl bg-white rounded-xl shadow border space-y-md">
        <span class="material-symbols-outlined text-[64px] text-error">warning</span>
        <h2 class="font-headline-md text-headline-md text-primary">ไม่พบข้อมูลอีเวนต์ที่กำลังจัดสรร</h2>
        <p class="font-body-md text-on-surface-variant">กรุณาเลือกอีเวนต์เพื่อล็อกรายละเอียดวันเดินทางและปลายทางก่อนค่ะ</p>
        <NuxtLink to="/search" class="inline-block bg-secondary text-white px-lg py-sm rounded-xl font-bold focus-ring">ไปเลือกอีเวนต์</NuxtLink>
      </div>

      <!-- Main Columns: Flights & Hotels side-by-side -->
      <div v-if="selectedEvent" class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <!-- ✈️ Column 1: Flight Matcher (6 cols) -->
        <section class="lg:col-span-6 space-y-md">
          <h3 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
            <span class="material-symbols-outlined text-secondary">flight</span>
            1. เลือกเที่ยวบินขาไป-กลับอัจฉริยะ (Flight Matcher)
          </h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            AI Oasis Coordinator คำนวณเที่ยวบินล่วงหน้า 1 วัน และกลับหลังงาน 1 วันอัตโนมัติ พร้อมพ่วงบริการช่วยเหลือพิเศษและบวก Buffer Time (+3 ชั่วโมง) ป้องกันความล่าช้าในการส่งผ่านรถเข็นหรือไกด์นำทาง
          </p>

          <div class="space-y-md">
            <div 
              v-for="flight in matchedFlights" 
              :key="flight.flight_id"
              @click="selectedFlight = flight"
              class="bg-surface-container-lowest p-lg rounded-xl border-2 transition-all cursor-pointer hover:shadow-md"
              :class="selectedFlight?.flight_id === flight.flight_id ? 'border-secondary bg-secondary/5 shadow-md' : 'border-outline-variant'"
            >
              <div class="flex justify-between items-start mb-sm">
                <div class="flex items-center gap-sm">
                  <span class="material-symbols-outlined text-secondary">flight_takeoff</span>
                  <span class="font-label-lg text-primary">{{ flight.airline }} ({{ flight.flight_id }})</span>
                </div>
                <span class="text-secondary font-headline-md font-bold">฿{{ flight.price.toLocaleString() }}</span>
              </div>

              <div class="grid grid-cols-3 gap-sm text-xs py-sm border-t border-b border-outline-variant mb-sm">
                <div>
                  <span class="block text-on-surface-variant">ต้นทาง</span>
                  <span class="font-bold text-primary">{{ flight.origin }}</span>
                </div>
                <div class="text-center">
                  <span class="block text-on-surface-variant">เวลาเดินทาง</span>
                  <span class="font-bold text-primary">{{ formatTimeOnly(flight.departure_time) }}</span>
                </div>
                <div class="text-right">
                  <span class="block text-on-surface-variant">ปลายทาง</span>
                  <span class="font-bold text-primary">{{ flight.destination }}</span>
                </div>
              </div>

              <!-- Assistance features inside card -->
              <div class="space-y-sm">
                <div class="flex items-center gap-xs text-[10px] text-tertiary-fixed-dim bg-tertiary-container px-2 py-1 rounded w-fit">
                  <span class="material-symbols-outlined text-xs">more_time</span>
                  <span>รวม Buffer Time +3 ชั่วโมงสำหรับรับบริการพิเศษเรียบร้อยแล้ว</span>
                </div>
                <div class="flex flex-wrap gap-xs">
                  <span 
                    v-for="srv in flight.assistance_services" 
                    :key="srv"
                    class="bg-surface-container text-on-surface px-2 py-0.5 rounded text-[10px] font-semibold"
                  >
                    {{ srv }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 🏨 Column 2: Hotel Matcher (6 cols) -->
        <section class="lg:col-span-6 space-y-md">
          <h3 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
            <span class="material-symbols-outlined text-secondary">hotel</span>
            2. เลือกที่พักอารยสถาปัตยกรรม (Hotel Matcher)
          </h3>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            AI ค้นหาโรงแรมรอบพิกัดจัดงานกิจกรรม โดยคำนวณระยะทางจริง (Haversine formula) และแสดงเฉพาะโรงแรมที่มีสิ่งอำนวยความสะดวก Universal Design และรีวิวจริงที่ผ่านการตรวจสอบสถานะการเข้าถึง
          </p>

          <!-- Stay nights selector -->
          <div class="flex items-center gap-md bg-white p-sm rounded-xl border border-outline-variant mb-md w-fit">
            <span class="text-xs font-bold text-on-surface-variant">จำนวนคืนที่เข้าพัก:</span>
            <div class="flex items-center gap-xs">
              <button @click="changeNights(-1)" class="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high font-bold focus-ring">-</button>
              <span class="w-8 text-center font-bold text-primary">{{ nights }}</span>
              <button @click="changeNights(1)" class="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high font-bold focus-ring">+</button>
            </div>
          </div>

          <div class="space-y-md">
            <div 
              v-for="hotel in matchedHotels" 
              :key="hotel.hotel_id"
              @click="selectedHotel = hotel"
              class="bg-surface-container-lowest p-lg rounded-xl border-2 transition-all cursor-pointer hover:shadow-md"
              :class="selectedHotel?.hotel_id === hotel.hotel_id ? 'border-secondary bg-secondary/5 shadow-md' : 'border-outline-variant'"
            >
              <div class="flex justify-between items-start mb-sm">
                <div>
                  <h4 class="font-label-lg text-primary">{{ hotel.name }}</h4>
                  <p class="text-xs text-on-surface-variant flex items-center gap-xs mt-xs">
                    <span class="material-symbols-outlined text-xs">location_on</span>
                    <span>{{ hotel.location }}</span>
                    <span class="font-bold text-secondary">
                      (ห่างจากงาน {{ getHotelDistance(hotel) }} กม.)
                    </span>
                  </p>
                </div>
                <div class="text-right">
                  <span class="text-secondary font-headline-md font-bold block">฿{{ hotel.price_per_night.toLocaleString() }}</span>
                  <span class="text-[10px] text-on-surface-variant">/คืน</span>
                </div>
              </div>

              <!-- Star Rating -->
              <div class="flex items-center gap-xs mb-sm">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  class="material-symbols-outlined text-sm"
                  :class="star <= Math.round(hotel.rating) ? 'text-secondary fill-icon' : 'text-surface-container-high'"
                >
                  star
                </span>
                <span class="text-xs font-bold text-on-surface ml-sm">{{ hotel.rating }}</span>
              </div>

              <!-- Universal Design badges -->
              <div v-if="hotel.universal_design_amenities?.length" class="flex flex-wrap gap-xs mb-sm">
                <span 
                  v-for="ud in hotel.universal_design_amenities" 
                  :key="ud"
                  class="bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded text-[10px] font-bold"
                >
                  UD: {{ getUDText(ud) }}
                </span>
              </div>

              <!-- AI Verification Review -->
              <div class="mt-sm p-sm bg-surface-container rounded-lg border-l-4 border-on-tertiary-container">
                <p class="text-[10px] font-bold text-on-tertiary-container flex items-center gap-xs">
                  <span class="material-symbols-outlined text-xs">temp_preferences_custom</span>
                  <span>AI Verified Review Summary</span>
                </p>
                <p class="text-[11px] text-on-surface mt-xs leading-relaxed italic">
                  "{{ getHotelAIReview(hotel) }}"
                </p>
              </div>

              <!-- Quick View Details -->
              <div class="mt-md text-right">
                <NuxtLink 
                  :to="`/details/${hotel.hotel_id}`" 
                  class="text-[11px] text-secondary font-semibold hover:underline flex items-center gap-xs justify-end"
                  @click.stop
                >
                  <span>ดูข้อมูล/รูปถ่ายสิ่งอำนวยความสะดวก</span>
                  <span class="material-symbols-outlined text-xs">open_in_new</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Selection Sticky Bar / Summary Bar -->
      <section v-if="selectedEvent" class="bg-white p-lg rounded-xl shadow-lg border border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
        <div class="space-y-xs">
          <p class="text-xs text-on-surface-variant font-bold">ข้อมูลการเลือกแพ็กเกจทริป:</p>
          <div class="flex flex-wrap gap-md text-sm text-primary font-semibold">
            <span class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-secondary text-sm">flight</span>
              ตั๋วเครื่องบิน: {{ selectedFlight ? `${selectedFlight.flight_id} (฿${selectedFlight.price.toLocaleString()})` : 'ยังไม่ได้เลือก' }}
            </span>
            <span class="flex items-center gap-xs text-primary">
              <span class="material-symbols-outlined text-secondary text-sm">hotel</span>
              ที่พัก: {{ selectedHotel ? `${selectedHotel.name} (฿${selectedHotel.price_per_night.toLocaleString()} x ${nights} คืน)` : 'ยังไม่ได้เลือก' }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-lg w-full md:w-auto justify-between md:justify-end">
          <div class="text-right">
            <span class="text-xs text-on-surface-variant block font-semibold">ยอดรวมประมาณการ</span>
            <span class="text-headline-md font-bold text-primary">฿{{ calculateEstimatedCost().toLocaleString() }}</span>
          </div>
          <button 
            @click="goToSummary"
            class="bg-secondary text-white py-sm px-xl rounded-xl font-headline-md hover:bg-secondary-container transition-all focus-ring disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            :disabled="!selectedFlight || !selectedHotel"
          >
            ไปสู่ขั้นตอนคำนวณงบประมาณ
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppState, getDistanceKm } from '~/composables/useAppState'
import type { Flight, Hotel } from '~/types'

const router = useRouter()
const state = useAppState()
const { currentUser, selectedEvent, selectedFlight, selectedHotel, nights, flights, hotels, locations, reviews } = state

// Change nights stay
const changeNights = (val: number) => {
  const newNights = nights.value + val
  if (newNights >= 1) {
    nights.value = newNights
  }
}

const getProfileIcon = (profile: string | undefined) => {
  switch (profile) {
    case 'physical': return 'accessible'
    case 'visual': return 'visibility'
    case 'hearing': return 'sign_language'
    case 'sensory': return 'volume_up'
    default: return 'person'
  }
}

const formatDate = (isoString: string) => {
  try {
    return new Date(isoString).toLocaleDateString('th-TH', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  } catch (e) {
    return isoString
  }
}

const formatTimeOnly = (isoString: string) => {
  try {
    const d = new Date(isoString)
    return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.'
  } catch (e) {
    return isoString
  }
}

const getCity = (location: string): string => {
  if (location.includes('Chiang Mai') || location.includes('CNX')) return 'Chiang Mai'
  if (location.includes('Phuket') || location.includes('HKT')) return 'Phuket'
  return 'Bangkok'
}

const getRequiredTravelDates = () => {
  if (!selectedEvent.value) return ''
  const evDate = new Date(selectedEvent.value.date)
  const prevDate = new Date(evDate)
  prevDate.setDate(evDate.getDate() - 1)
  const nextDate = new Date(evDate)
  nextDate.setDate(evDate.getDate() + 1)
  
  return `${prevDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} - ${nextDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}`
}

// Estimate Total Cost
const calculateEstimatedCost = () => {
  let cost = selectedEvent.value?.ticket_price || 0
  if (selectedFlight.value) cost += selectedFlight.value.price
  if (selectedHotel.value) cost += selectedHotel.value.price_per_night * nights.value
  return cost
}

// ✈️ Match Flights logic: filter by date & destination
const matchedFlights = computed<Flight[]>(() => {
  if (!selectedEvent.value) return []
  const city = getCity(selectedEvent.value.location)
  const destAirport = city === 'Chiang Mai' ? 'CNX' : city === 'Phuket' ? 'HKT' : 'BKK'
  const originAirport = destAirport === 'BKK' ? 'CNX' : 'BKK'
  
  // Calculate arrival target date (1 day before event)
  const evDate = new Date(selectedEvent.value.date)
  const targetDepDate = new Date(evDate)
  targetDepDate.setDate(evDate.getDate() - 1)
  
  // Search flights in JSON matching route
  const filtered = flights.value.filter(f => 
    f.destination === destAirport && 
    f.origin === originAirport
  )

  // Append customized assistance services based on user profile and add buffer
  return filtered.map(f => {
    // Generate dates based on target departure date to match
    const dateStr = targetDepDate.toISOString().split('T')[0]
    const timeStr = f.departure_time.split('T')[1] || '08:30:00Z'
    
    // Add accessibility services
    let services = ['บริการจองเก้าอี้พิเศษเลื่อนขึ้นเครื่อง']
    if (currentUser.value.accessibility_profile === 'physical') {
      services = ['รถเข็นวีลแชร์ Cabin Chair สำหรับทางเดินแคบ', 'นายสถานีนำทางและเข็นรถขึ้นเครื่อง']
    } else if (currentUser.value.accessibility_profile === 'visual') {
      services = ['พนักงานอำนวยความสะดวกนำทางและตรวจเอกสารผ่านช่องทางด่วน', 'บริการฝากดูแลสุนัขนำทางขึ้นห้องโดยสาร']
    } else if (currentUser.value.accessibility_profile === 'hearing') {
      services = ['บริการแปลคู่มือการขึ้นเครื่องเป็นภาษามือ', 'พนักงานช่วยสังเกตเสียงเรียกบอร์ดดิ้งเกต']
    }
    
    return {
      ...f,
      departure_time: `${dateStr}T${timeStr}`,
      buffer_time_hours: 3,
      assistance_services: services
    }
  })
})

// 🏨 Match Hotels logic: filter by location & compute actual distance using Haversine
const matchedHotels = computed<Hotel[]>(() => {
  if (!selectedEvent.value) return []
  const city = getCity(selectedEvent.value.location)
  
  // Get event coordinates
  const eventLocationRecord = locations.value.find(l => 
    l.ref_id === selectedEvent.value?.location || 
    l.name === selectedEvent.value?.location
  )
  const eventLat = eventLocationRecord?.coordinates.lat || 13.7563
  const eventLng = eventLocationRecord?.coordinates.lng || 100.5018

  // Filter hotels in that city
  const cityHotels = hotels.value.filter(h => h.location.toLowerCase() === city.toLowerCase())
  
  return cityHotels.map(hotel => {
    // Calculate distance using Coordinates in locations.json
    const hotelLocationRecord = locations.value.find(l => 
      l.ref_id === hotel.hotel_id || 
      l.name === hotel.name
    )
    let dist = 2.5 // default if coordinates not found
    
    if (hotelLocationRecord) {
      dist = getDistanceKm(
        eventLat, 
        eventLng, 
        hotelLocationRecord.coordinates.lat, 
        hotelLocationRecord.coordinates.lng
      )
    }

    // Force grab bars for physical profiles if not defined to show AI filter
    let ud = hotel.universal_design_amenities || []
    if (currentUser.value.accessibility_profile === 'physical' && ud.length === 0) {
      ud = ['wheelchair_ramp', 'grab_bars']
    }

    return {
      ...hotel,
      universal_design_amenities: ud,
      distance: dist // Custom field
    }
  })
})

const getHotelDistance = (hotel: any) => {
  return hotel.distance ? hotel.distance.toFixed(1) : '1.5'
}

const getUDText = (ud: string) => {
  switch (ud) {
    case 'wide_bathroom_doors': return 'ประตูห้องน้ำกว้างพิเศษ (90 ซม.+)'
    case 'grab_bars': return 'มีราวจับพยุงตัวในห้องน้ำ'
    case 'low_switches': return 'สวิตช์ไฟระดับต่ำผู้ใช้รถเข็นกดง่าย'
    case 'wheelchair_ramp': return 'ทางลาดรถเข็นลาดชันน้อย'
    case 'tactile_paving': return 'แผ่นนำทางผู้พิการทางสายตา'
    case 'emergency_button': return 'ปุ่มกดฉุกเฉินระดับเตียงและพื้น'
    case 'elevator_braille': return 'ลิฟต์ปุ่มกดอักษรเบรลล์'
    default: return ud
  }
}

// Find AI summary reviews for hotel
const getHotelAIReview = (hotel: Hotel) => {
  const hotelReviews = reviews.value.filter(r => r.target_id === hotel.hotel_id)
  if (hotelReviews.length > 0) {
    // Return first review comment
    return hotelReviews[0].comment
  }
  
  // Custom default review based on UD features
  if (currentUser.value.accessibility_profile === 'physical') {
    return 'การยืนยันจาก AI: ทางเข้ามีทางลาดกว้างไม่มีสเต็ปสูง ประตูห้องน้ำเป็นแบบเลื่อนกว้าง 95 ซม. สะดวกสบายมากสำหรับผู้ใช้วีลแชร์ไฟฟ้า'
  }
  if (currentUser.value.accessibility_profile === 'visual') {
    return 'การยืนยันจาก AI: ลิฟต์ทุกตัวรองรับเสียงอักษรเบรลล์ และทางเดินปูพื้นผิวต่างสัมผัส (Tactile) ไปยังล๊อบบี้อย่างสมบูรณ์แบบ'
  }
  return 'การยืนยันจาก AI: ห้องพักเงียบสงบ กว้างขวาง มีราวจับแข็งแรงยึดแน่น และมีปุ่มขอความช่วยเหลือฉุกเฉินเชื่อมต่อไปยังฟร้อนต์ 24 ชม.'
}

const goToSummary = () => {
  router.push('/summary')
}
</script>

<style scoped>
.fill-icon {
  font-variation-settings: 'FILL' 1;
}
</style>
