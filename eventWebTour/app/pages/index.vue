<template>
  <div class="bg-surface text-on-surface">
    <main class="max-w-container-max mx-auto px-md md:px-xl py-xl space-y-xxl">
      <!-- Welcome Section -->
      <section class="flex flex-col md:flex-row justify-between items-start md:items-end gap-lg">
        <div>
          <h1 class="font-display text-display text-primary mb-sm">
            สวัสดีครับ คุณ{{ currentUser.name.split(' ')[0] }}
          </h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {{ getWelcomeSubtext() }}
          </p>
        </div>
        <div class="flex gap-md">
          <span class="px-lg py-sm bg-tertiary-fixed text-on-tertiary-fixed rounded-xl flex items-center gap-sm font-label-lg shadow-sm">
            <span class="material-symbols-outlined font-fill" style="font-variation-settings: 'FILL' 1;">verified</span>
            ตรวจสอบแล้ว 100%
          </span>
        </div>
      </section>

      <!-- If no bookings exist -->
      <div v-if="currentUserBookings.length === 0" class="bg-surface-container-lowest p-xl rounded-xl shadow-md border text-center max-w-3xl mx-auto py-xxl space-y-md">
        <span class="material-symbols-outlined text-[64px] text-secondary">explore</span>
        <h2 class="font-headline-md text-headline-md text-primary">คุณยังไม่มีทริปการเดินทางที่ปักหมุดไว้</h2>
        <p class="font-body-md text-on-surface-variant max-w-md mx-auto">
          เริ่มต้นวางแผนทริปที่สอดคล้องกับความต้องการพิเศษของคุณ ค้นหาอีเวนต์ที่ชื่นชอบ จากนั้น AI จะช่วยจับคู่เที่ยวบินและที่พักที่ปลอดภัยให้อัตโนมัติ
        </p>
        <NuxtLink to="/search" class="inline-block mt-md bg-secondary text-white py-sm px-xl rounded-xl font-label-lg hover:bg-secondary-container transition-all focus-ring shadow-md">
          เริ่มค้นหาอีเวนต์
        </NuxtLink>
      </div>

      <!-- Dashboard Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <!-- Trip Selector (if user has multiple trips) -->
        <div v-if="currentUserBookings.length > 1" class="col-span-12 bg-surface-container-low p-md rounded-xl flex flex-wrap gap-md items-center">
          <span class="font-label-lg text-primary">เลือกทริปที่ต้องการตรวจสอบ:</span>
          <button 
            v-for="(b, idx) in currentUserBookings" 
            :key="b.booking_id"
            @click="activeTripIndex = idx"
            class="px-md py-sm rounded-lg font-label-sm border transition-all focus-ring"
            :class="activeTripIndex === idx ? 'bg-secondary text-white border-secondary shadow-md' : 'bg-white text-on-surface-variant border-outline-variant hover:bg-surface-container-high'"
          >
            ทริปงาน {{ b.event.title }}
          </button>
        </div>

        <!-- Left Column: Travel Timeline (5 cols) -->
        <aside class="lg:col-span-5 space-y-lg">
          <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
            <span class="material-symbols-outlined">route</span>
            แผนการเดินทาง
          </h2>
          
          <div class="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] relative overflow-hidden">
            <!-- Timeline Line -->
            <div class="absolute left-[39px] top-lg bottom-lg w-1 bg-outline-variant rounded-full"></div>
            
            <ul class="space-y-xl relative z-10">
              <!-- Step 1: Flight (Arrival) -->
              <li v-if="activeTrip.flight_arrival" class="flex gap-lg items-start">
                <div class="z-20 flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-md">
                  <span class="material-symbols-outlined">flight_takeoff</span>
                </div>
                <div class="flex-grow pt-sm">
                  <div class="flex justify-between items-start mb-xs">
                    <h3 class="font-label-lg text-label-lg text-primary">
                      เที่ยวบินขาไป ({{ activeTrip.flight_arrival.airline }})
                    </h3>
                    <span class="text-xs px-sm py-xs bg-green-100 text-green-800 rounded font-bold">ปลอดภัย</span>
                  </div>
                  <p class="font-body-md text-body-md text-on-surface-variant">
                    {{ formatTime(activeTrip.flight_arrival.departure_time) }} | {{ activeTrip.flight_arrival.origin }} ➔ {{ activeTrip.flight_arrival.destination }}
                  </p>
                  
                  <!-- Assist services -->
                  <div class="mt-md p-md bg-surface-container rounded-lg border-l-4 border-secondary">
                    <p class="text-sm font-bold text-secondary">บริการพิเศษที่ได้รับ:</p>
                    <p class="text-sm text-on-surface">
                      {{ activeTrip.flight_arrival.assistance_services?.join(', ') || 'จัดเตรียมนายสถานีช่วยเหลือพิเศษที่ประตูเครื่อง' }}
                    </p>
                  </div>
                </div>
              </li>

              <!-- Step 2: Hotel -->
              <li v-if="activeTrip.hotel" class="flex gap-lg items-start">
                <div class="z-20 flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-md">
                  <span class="material-symbols-outlined">hotel</span>
                </div>
                <div class="flex-grow pt-sm">
                  <div class="flex justify-between items-start mb-xs">
                    <h3 class="font-label-lg text-label-lg text-primary">
                      เช็คอิน {{ activeTrip.hotel.name }}
                    </h3>
                    <span class="text-xs px-sm py-xs bg-green-100 text-green-800 rounded font-bold">ปลอดภัย</span>
                  </div>
                  <p class="font-body-md text-body-md text-on-surface-variant">
                    จำนวน {{ activeTrip.nights }} คืน | พิกัด {{ activeTrip.hotel.location }}
                  </p>
                  <p class="text-sm text-on-surface-variant mt-sm italic">
                    {{ activeTrip.special_needs_selected }}
                  </p>
                </div>
              </li>

              <!-- Step 3: Event -->
              <li class="flex gap-lg items-start">
                <div class="z-20 flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-md">
                  <span class="material-symbols-outlined">confirmation_number</span>
                </div>
                <div class="flex-grow pt-sm">
                  <div class="flex justify-between items-start mb-xs">
                    <h3 class="font-label-lg text-label-lg text-primary">
                      {{ activeTrip.event.title }}
                    </h3>
                    <span class="text-xs px-sm py-xs bg-green-100 text-green-800 rounded font-bold">ปลอดภัย</span>
                  </div>
                  <p class="font-body-md text-body-md text-on-surface-variant">
                    {{ formatTime(activeTrip.event.date) }} | {{ activeTrip.event.location }}
                  </p>
                  <div class="flex gap-sm mt-sm items-center">
                    <span class="material-symbols-outlined text-secondary text-sm">accessible</span>
                    <span class="text-sm text-on-surface">
                      {{ activeTrip.special_seating_selected }}
                    </span>
                  </div>
                </div>
              </li>

              <!-- Step 4: Return Flight -->
              <li class="flex gap-lg items-start" :class="activeTrip.flight_departure ? '' : 'opacity-60'">
                <div class="z-20 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                  :class="activeTrip.flight_departure ? 'bg-secondary text-white' : 'bg-outline-variant text-white'"
                >
                  <span class="material-symbols-outlined">flight_land</span>
                </div>
                <div class="flex-grow pt-sm">
                  <div class="flex justify-between items-start mb-xs">
                    <h3 class="font-label-lg text-label-lg text-primary">เที่ยวบินขากลับ</h3>
                    <span class="text-xs px-sm py-xs rounded font-bold"
                      :class="activeTrip.flight_departure ? 'bg-green-100 text-green-800' : 'bg-surface-container-high text-on-surface-variant'"
                    >
                      {{ activeTrip.flight_departure ? 'ปลอดภัย' : 'รอดำเนินการ' }}
                    </span>
                  </div>
                  <p v-if="activeTrip.flight_departure" class="font-body-md text-body-md text-on-surface-variant">
                    {{ formatTime(activeTrip.flight_departure.departure_time) }} | {{ activeTrip.flight_departure.origin }} ➔ {{ activeTrip.flight_departure.destination }}
                  </p>
                  <p v-else class="font-body-md text-body-md text-on-surface-variant">
                    ระบบ AI จะแนะนำเที่ยวบินให้อัตโนมัติหลังจองตั๋วงาน
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Right Column: Readiness Index & Facility Details (7 cols) -->
        <div class="lg:col-span-7 space-y-xl">
          <!-- Accessibility Index Chart / KPI Section -->
          <section class="space-y-lg">
            <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
              <span class="material-symbols-outlined">analytics</span>
              ดัชนีความพร้อม (Trip Readiness)
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
              <!-- Airline KPI -->
              <div class="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] border-t-4 border-secondary text-center">
                <p class="font-label-lg text-label-lg text-on-surface-variant mb-md">สายการบิน</p>
                <div class="relative inline-flex items-center justify-center">
                  <svg class="w-24 h-24 transform -rotate-90">
                    <circle class="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" stroke-width="8"></circle>
                    <circle 
                      class="text-secondary transition-all duration-1000" 
                      cx="48" 
                      cy="48" 
                      fill="transparent" 
                      r="40" 
                      stroke="currentColor" 
                      stroke-width="8"
                      :stroke-dasharray="251.2"
                      :stroke-dashoffset="getDashOffset(activeTrip.readiness.flight)"
                    ></circle>
                  </svg>
                  <span class="absolute font-headline-md text-headline-md text-primary">
                    {{ activeTrip.readiness.flight }}%
                  </span>
                </div>
                <p class="mt-md text-sm font-bold" :class="activeTrip.readiness.flight === 100 ? 'text-green-600' : 'text-on-surface-variant'">
                  {{ activeTrip.readiness.flight === 100 ? 'ยืนยันบริการแล้ว' : 'ไม่เปิดเผย' }}
                </p>
              </div>

              <!-- Hotel KPI -->
              <div class="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] border-t-4 border-secondary text-center">
                <p class="font-label-lg text-label-lg text-on-surface-variant mb-md">ที่พัก</p>
                <div class="relative inline-flex items-center justify-center">
                  <svg class="w-24 h-24 transform -rotate-90">
                    <circle class="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" stroke-width="8"></circle>
                    <circle 
                      class="text-secondary transition-all duration-1000" 
                      cx="48" 
                      cy="48" 
                      fill="transparent" 
                      r="40" 
                      stroke="currentColor" 
                      stroke-width="8"
                      :stroke-dasharray="251.2"
                      :stroke-dashoffset="getDashOffset(activeTrip.readiness.hotel)"
                    ></circle>
                  </svg>
                  <span class="absolute font-headline-md text-headline-md text-primary">
                    {{ activeTrip.readiness.hotel }}%
                  </span>
                </div>
                <p class="mt-md text-sm font-bold" :class="activeTrip.readiness.hotel === 100 ? 'text-green-600' : 'text-on-surface-variant'">
                  {{ activeTrip.readiness.hotel === 100 ? 'ยืนยันห้องพักสไลด์' : 'รอตรวจสอบเพิ่ม' }}
                </p>
              </div>

              <!-- Venue KPI -->
              <div class="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] border-t-4 border-secondary text-center">
                <p class="font-label-lg text-label-lg text-on-surface-variant mb-md">สถานที่จัดงาน</p>
                <div class="relative inline-flex items-center justify-center">
                  <svg class="w-24 h-24 transform -rotate-90">
                    <circle class="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" stroke-width="8"></circle>
                    <circle 
                      class="text-secondary transition-all duration-1000" 
                      cx="48" 
                      cy="48" 
                      fill="transparent" 
                      r="40" 
                      stroke="currentColor" 
                      stroke-width="8"
                      :stroke-dasharray="251.2"
                      :stroke-dashoffset="getDashOffset(activeTrip.readiness.venue)"
                    ></circle>
                  </svg>
                  <span class="absolute font-headline-md text-headline-md text-primary">
                    {{ activeTrip.readiness.venue }}%
                  </span>
                </div>
                <p class="mt-md text-sm font-bold text-green-600">พร้อมเข้าใช้บริการ</p>
              </div>
            </div>
          </section>

          <!-- Data Table: Facility Details -->
          <section class="space-y-lg">
            <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
              <span class="material-symbols-outlined">fact_check</span>
              รายละเอียดสิ่งอำนวยความสะดวก
            </h2>
            
            <div class="overflow-hidden rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] bg-surface-container-lowest border border-outline-variant">
              <table aria-label="ตารางรายละเอียดสิ่งอำนวยความสะดวกสำหรับทริปนี้" class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-primary text-white">
                    <th class="px-lg py-md font-label-lg">สถานที่</th>
                    <th class="px-lg py-md font-label-lg">ประเภทบริการ</th>
                    <th class="px-lg py-md font-label-lg">ความกว้างประตู/ข้อมูล</th>
                    <th class="px-lg py-md font-label-lg">สถานะ AI</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant">
                  <tr 
                    v-for="(facility, fIdx) in activeTrip.facility_details" 
                    :key="fIdx"
                    class="hover:bg-surface-container-low transition-colors"
                    :class="fIdx % 2 === 1 ? 'bg-surface-container-low' : ''"
                  >
                    <td class="px-lg py-md font-body-md text-primary font-semibold">
                      {{ facility.name }}
                    </td>
                    <td class="px-lg py-md font-body-md text-on-surface-variant">
                      {{ facility.type }}
                    </td>
                    <td class="px-lg py-md font-body-md text-on-surface">
                      {{ facility.size }}
                    </td>
                    <td class="px-lg py-md font-body-md">
                      <span v-if="facility.status === 'pass'" class="flex items-center gap-xs text-green-700 font-bold">
                        <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span> ผ่านเกณฑ์
                      </span>
                      <span v-else-if="facility.status === 'pending'" class="flex items-center gap-xs text-on-tertiary-container font-bold">
                        <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">pending</span> กำลังยืนยัน
                      </span>
                      <span v-else class="flex items-center gap-xs text-error font-bold">
                        <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">error</span> ไม่ผ่านเกณฑ์
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Help Cards Section -->
          <section class="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <div class="bg-secondary-container text-on-secondary-container p-lg rounded-xl flex items-center justify-between shadow-md">
              <div class="space-y-sm">
                <h3 class="font-headline-md text-headline-md">ต้องการความช่วยเหลือ?</h3>
                <p class="font-body-md">ติดต่อเจ้าหน้าที่ดูแลพิเศษได้ตลอด 24 ชั่วโมง</p>
                <a 
                  href="tel:1669"
                  class="inline-block mt-md bg-on-secondary-container text-secondary px-lg py-sm rounded-lg font-bold hover:bg-white transition-all focus-ring text-center"
                >
                  โทรหาเรา
                </a>
              </div>
              <span class="material-symbols-outlined text-[64px] opacity-30">support_agent</span>
            </div>
            
            <div class="bg-tertiary-container text-on-tertiary-container p-lg rounded-xl flex items-center justify-between shadow-md">
              <div class="space-y-sm">
                <h3 class="font-headline-md text-headline-md">ประวัติสุขภาพ</h3>
                <p class="font-body-md">ข้อมูลยาและแพ้ยาสำหรับเหตุฉุกเฉิน</p>
                <button 
                  class="mt-md bg-on-tertiary-container text-tertiary-container px-lg py-sm rounded-lg font-bold hover:bg-white transition-all focus-ring"
                  @click="showHealthInfo"
                >
                  ดูข้อมูล
                </button>
              </div>
              <span class="material-symbols-outlined text-[64px] opacity-30">medical_services</span>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Mobile Floating Action Button (SOS) -->
    <button 
      aria-label="ขอความช่วยเหลือด่วน" 
      class="fixed bottom-lg left-lg w-14 h-14 bg-error text-white rounded-full shadow-2xl flex items-center justify-center md:hidden focus-ring z-[60]"
      @click="triggerSOS"
    >
      <span class="material-symbols-outlined text-[28px] font-bold">sos</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppState } from '~/composables/useAppState'

const { currentUser, currentUserBookings } = useAppState()

// Active trip selection logic
const activeTripIndex = ref(0)

const activeTrip = computed(() => {
  if (currentUserBookings.value.length === 0) return null
  // Make sure we don't index out of bounds
  const idx = activeTripIndex.value < currentUserBookings.value.length ? activeTripIndex.value : 0
  return currentUserBookings.value[idx]
})

// Circular Dash Offset Calculator (circumference is 2 * pi * 40 = ~251.2)
const getDashOffset = (percent: number) => {
  return 251.2 - (251.2 * percent) / 100
}

const formatTime = (isoString: string) => {
  try {
    const date = new Date(isoString)
    return date.toLocaleDateString('th-TH', { 
      day: 'numeric', 
      month: 'short', 
      year: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    }) + ' น.'
  } catch (e) {
    return isoString
  }
}

const getWelcomeSubtext = () => {
  const profile = currentUser.value.accessibility_profile
  if (profile === 'physical') {
    return 'เตรียมความพร้อมสำหรับการเดินทางของคุณ ข้อมูลด้านสิ่งอำนวยความสะดวก เช่น ทางลาด และโควตาวีลแชร์ ได้รับการตรวจสอบสถานะความพร้อมเรียบร้อยแล้ว'
  } else if (profile === 'hearing') {
    return 'เตรียมความพร้อมสำหรับการเดินทางของคุณ ข้อมูลบริการล่ามภาษามือและโซนที่นั่งหน้าเพื่อการได้ยินได้รับการยืนยัน 100% แล้ว'
  } else if (profile === 'visual') {
    return 'เตรียมความพร้อมสำหรับการเดินทางของคุณ ระบบเตรียมสุนัขนำทางและแผ่นปูนำทางเส้นทางสำหรับผู้บกพร่องทางการเห็นแล้วเสร็จ'
  } else if (profile === 'sensory') {
    return 'เตรียมความพร้อมสำหรับการเดินทางของคุณ พื้นที่เงียบพิเศษและระบบระบายการเบียดเสียดได้รับการสแกนความปลอดภัยแล้ว'
  } else {
    return 'เตรียมความพร้อมสำหรับการเดินทางของคุณ ข้อมูลตั๋วเดินทางและสิทธิพิเศษได้รับการยืนยันความปลอดภัยเรียบร้อยแล้ว'
  }
}

const showHealthInfo = () => {
  alert(`ประวัติสุขภาพผู้ใช้: คุณ ${currentUser.value.name}\n- แพ้ยา: ไม่พบประวัติการแพ้ยา\n- ยาที่ต้องพกติดตัว: ยาสามัญประจำตัวสำหรับความบกพร่องเฉพาะบุคคล\n- ผู้ติดต่อฉุกเฉิน: ครอบครัว (${currentUser.value.phone})`)
}

const triggerSOS = () => {
  const confirmSOS = confirm('⚠️ ระบบขอความช่วยเหลือฉุกเฉิน (SOS)\nคุณต้องการส่งข้อความขอความช่วยเหลือพิเศษพร้อมแชร์พิกัดปัจจุบันไปยังทีมแพทย์และพนักงาน CareGo Oasis ทันทีหรือไม่?')
  if (confirmSOS) {
    alert('ส่งขอความช่วยเหลือพิเศษ SOS เรียบร้อยแล้ว เจ้าหน้าที่กำลังเร่งเดินทางมาหาท่าน ณ พิกัดปัจจุบัน')
  }
}
</script>

<style scoped>
.font-fill {
  font-variation-settings: 'FILL' 1;
}
</style>
