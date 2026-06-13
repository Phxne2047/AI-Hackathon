<template>
  <div class="bg-surface text-on-surface min-h-screen" v-if="hotel">
    <!-- Navigation back -->
    <header class="bg-white py-sm border-b border-outline-variant shadow-sm">
      <div class="max-w-container-max mx-auto px-md md:px-xl flex items-center justify-between">
        <button @click="goBack" class="flex items-center gap-xs text-secondary hover:text-on-secondary-fixed-variant font-label-lg focus-ring">
          <span class="material-symbols-outlined">arrow_back</span>
          <span>ย้อนกลับ</span>
        </button>
        <span class="text-sm font-bold text-primary">ข้อมูลที่พัก: {{ hotel.name }}</span>
      </div>
    </header>

    <main class="max-w-container-max mx-auto px-md md:px-xl py-xl">
      <!-- Hero Section -->
      <div class="relative w-full h-[400px] rounded-xl overflow-hidden mb-xl shadow-md border">
        <img 
          class="w-full h-full object-cover" 
          :alt="hotel.name" 
          :src="getHotelHeroImage(hotel.hotel_id)"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-lg">
          <span class="bg-secondary text-white px-md py-xs rounded-full text-label-sm w-fit mb-sm">
            โรงแรมระดับ UD Verified ⭐ {{ hotel.rating }}
          </span>
          <h1 class="font-display text-display text-white mb-xs">{{ hotel.name }}</h1>
          <p class="text-white/95 font-body-md text-body-md flex items-center gap-xs">
            <span class="material-symbols-outlined text-body-md">location_on</span>
            {{ hotel.location }}, ประเทศไทย
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <!-- Left Column: Core Content (8 cols) -->
        <div class="lg:col-span-8 space-y-xl">
          <!-- Info Summary -->
          <section class="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-surface-container-high">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
              <div class="flex flex-col">
                <span class="text-label-sm text-on-surface-variant">ราคาเริ่มต้น</span>
                <span class="text-headline-md text-secondary font-bold">฿{{ hotel.price_per_night.toLocaleString() }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-label-sm text-on-surface-variant">วันที่ว่าง</span>
                <span class="text-headline-md text-on-surface font-semibold">ต.ค. - พ.ย. 2569</span>
              </div>
              <div class="flex flex-col">
                <span class="text-label-sm text-on-surface-variant">คะแนนความสะดวก</span>
                <span class="flex items-center text-on-tertiary-container font-bold text-headline-md">
                  <span class="material-symbols-outlined font-fill text-yellow-500" style="font-variation-settings: 'FILL' 1;">stars</span>
                  {{ hotel.rating }}
                </span>
              </div>
              <div class="flex flex-col justify-center">
                <button 
                  @click="selectAndBook" 
                  class="bg-secondary text-white py-sm px-lg rounded-lg font-label-lg hover:bg-on-secondary-fixed-variant transition-all focus-ring shadow-md"
                >
                  เลือกจองที่พักนี้
                </button>
              </div>
            </div>
          </section>

          <!-- Oasis Safe Timeline (Interactive Map) -->
          <section class="space-y-sm">
            <h2 class="font-headline-md text-headline-md flex items-center gap-sm">
              <span class="material-symbols-outlined text-secondary">map</span> 
              แผนผังสิ่งอำนวยความสะดวก (Oasis Safe Indoor Map)
            </h2>
            <p class="text-xs text-on-surface-variant">
              คลิกที่หมุดสีบนแผนผังด้านล่างเพื่อตรวจสอบรายละเอียดและภาพยืนยันการเข้าใช้สิ่งอำนวยความสะดวกจริง
            </p>
            
            <div class="bg-surface-container rounded-xl overflow-hidden h-[400px] relative border-2 border-surface-container-highest shadow-inner">
              <!-- Simulated map layout background -->
              <img 
                class="w-full h-full object-cover opacity-60 grayscale" 
                alt="Floor Plan Map" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI3_esn4N29legeCvgs0lNrOmie4t8kQif-IiQFyb9JrufXK1KfzFfkEIZcJPkKr3EEVb48bb6GkgNu44GYnqMwYh6258HCOH4cHMNba1hcmxEg_dz9ShBNjCS1c8S8INjVBLckOhbRnrFv41AnzQTxLhbHVtzvB4aR338KsgRMfFbq_s715qd3nmPthSKYcS5G1-znuzVMFS3xxr4a_5uDP1ozZiVencUy1QY0b2Cl9A21ZDxg1TAQZiRitphk3wXoyOY48RIaL_G"
              />

              <!-- Pin 1: Wheelchair Charging Dock -->
              <div 
                class="absolute top-1/4 left-1/3 p-xs bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all z-10 border border-secondary"
                @click="activeMapPin = activeMapPin === 'charging' ? null : 'charging'"
              >
                <span class="material-symbols-outlined text-secondary text-headline-md block">ev_station</span>
                
                <!-- Tooltip Popup -->
                <div v-if="activeMapPin === 'charging'" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-primary text-white p-md text-xs rounded-xl shadow-2xl z-20 w-56 space-y-xs pointer-events-auto">
                  <p class="font-bold flex items-center gap-xs text-secondary-fixed">
                    <span class="material-symbols-outlined text-sm">ev_station</span>
                    แท่นชาร์จรถเข็นไฟฟ้า (Lobby ชั้น 1)
                  </p>
                  <p class="text-white/90">มีบริการเต้ารับกระแสไฟแรงสูง 2 จุดสำหรับชาร์จแบตเตอรี่รถเข็นไฟฟ้าแบบ Fast Charge ได้ตลอด 24 ชั่วโมง</p>
                  <span class="text-[9px] text-green-300 font-bold block">✓ เจ้าหน้าที่สแกนรับรองแล้ว</span>
                </div>
              </div>

              <!-- Pin 2: Accessible toilet -->
              <div 
                class="absolute top-1/2 left-1/2 p-xs bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all z-10 border border-green-600"
                @click="activeMapPin = activeMapPin === 'bathroom' ? null : 'bathroom'"
              >
                <span class="material-symbols-outlined text-green-700 text-headline-md block">accessible</span>
                
                <!-- Tooltip Popup -->
                <div v-if="activeMapPin === 'bathroom'" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-primary text-white p-md text-xs rounded-xl shadow-2xl z-20 w-56 space-y-xs pointer-events-auto">
                  <p class="font-bold flex items-center gap-xs text-green-400">
                    <span class="material-symbols-outlined text-sm">accessible</span>
                    ห้องน้ำ UD (ข้างห้องสัมมนา)
                  </p>
                  <p class="text-white/90">ประตูสไลด์บานกว้าง 100 ซม. มีราวจับรูปตัว L และตัว T พยุงตัวได้สูงสุด 150 กก. พร้อมปุ่มสัญญาณฉุกเฉินระดับ 10 ซม. เหนือพื้น</p>
                  <span class="text-[9px] text-green-300 font-bold block">✓ ผ่านเกณฑ์อารยสถาปัตยกรรม</span>
                </div>
              </div>

              <!-- Pin 3: Guide Dog Station -->
              <div 
                class="absolute top-1/3 left-2/3 p-xs bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all z-10 border border-yellow-500"
                @click="activeMapPin = activeMapPin === 'dog' ? null : 'dog'"
              >
                <span class="material-symbols-outlined text-yellow-600 text-headline-md block">pets</span>
                
                <!-- Tooltip Popup -->
                <div v-if="activeMapPin === 'dog'" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-primary text-white p-md text-xs rounded-xl shadow-2xl z-20 w-56 space-y-xs pointer-events-auto">
                  <p class="font-bold flex items-center gap-xs text-yellow-400">
                    <span class="material-symbols-outlined text-sm">pets</span>
                    จุดบริการสุนัขนำทาง (สวนหย่อม)
                  </p>
                  <p class="text-white/90">พื้นที่ปูสนามหญ้าสำหรับสุนัขนำทางขับถ่ายและพักผ่อน พร้อมจุดบริการชามน้ำและบริการดูแลสุนัขในขณะผู้บกพร่องเข้าชมจุดต่างๆ</p>
                  <span class="text-[9px] text-green-300 font-bold block">✓ พนักงานโรงแรมดูแลพร้อมรับคำสั่ง</span>
                </div>
              </div>

              <!-- Legend Overlay -->
              <div class="absolute bottom-md left-md bg-white/90 backdrop-blur-sm p-md rounded-lg shadow-md space-y-sm border border-outline-variant">
                <div class="flex items-center gap-sm text-xs font-semibold text-primary">
                  <span class="w-3 h-3 rounded-full bg-secondary"></span> จุดชาร์จรถเข็นไฟฟ้า
                </div>
                <div class="flex items-center gap-sm text-xs font-semibold text-primary">
                  <span class="w-3 h-3 rounded-full bg-green-600"></span> ห้องน้ำเข้าถึงได้ (UD Toilet)
                </div>
                <div class="flex items-center gap-sm text-xs font-semibold text-primary">
                  <span class="w-3 h-3 rounded-full bg-yellow-500"></span> จุดพักพิงสุนัขนำทาง
                </div>
              </div>
            </div>
          </section>

          <!-- Detailed Description -->
          <section class="space-y-md">
            <h3 class="font-headline-md text-headline-md">เกี่ยวกับที่พัก</h3>
            <p class="font-body-md text-body-md leading-relaxed text-on-surface-variant">
              สัมผัสประสบการณ์การเข้าพักผ่อนที่ปลอดภัยและไร้ขีดจำกัดที่ {{ hotel.name }} เรามีการออกแบบอาคาร สวนหย่อม และจุดบริการส่วนรวมตามหลักการออกแบบสากล (Universal Design) เพื่อความเท่าเทียมกันของแขกทุกท่าน มีทางลาดที่มีความลาดเอียงต่ำพิเศษ ลิฟต์กว้างขวาง และบุคลากรที่ผ่านการฝึกอบรมการรับมือช่วยเหลือผู้พิการเฉพาะทาง
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div class="flex items-center gap-sm p-md bg-surface-container-low rounded-lg border">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <span class="font-label-lg text-primary text-sm">ทางลาดเข้าอาคารมาตรฐาน</span>
              </div>
              <div class="flex items-center gap-sm p-md bg-surface-container-low rounded-lg border">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <span class="font-label-lg text-primary text-sm">อักษรเบรลล์และเสียงในลิฟต์</span>
              </div>
              <div class="flex items-center gap-sm p-md bg-surface-container-low rounded-lg border">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <span class="font-label-lg text-primary text-sm">บริการดูแลสุนัขนำทาง</span>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column: AI Interaction & Booking Sidebar (4 cols) -->
        <aside class="lg:col-span-4 space-y-lg">
          <!-- Oasis AI Interaction Box -->
          <div class="bg-primary-container text-on-primary-fixed rounded-xl p-lg shadow-xl relative overflow-hidden border">
            <!-- Decorative background element -->
            <div class="absolute -right-10 -top-10 opacity-10">
              <span class="material-symbols-outlined text-[150px]">smart_toy</span>
            </div>
            
            <div class="relative z-10 space-y-sm">
              <div class="flex items-center gap-sm mb-md">
                <span class="material-symbols-outlined text-on-tertiary-fixed-variant">temp_preferences_custom</span>
                <h3 class="font-headline-md text-headline-md text-white">Gemini AI Analysis</h3>
              </div>
              
              <div class="bg-white/10 backdrop-blur-md rounded-lg p-md border border-white/20 mb-md">
                <p class="font-body-md text-body-md text-white leading-relaxed italic">
                  "จากการสแกนรีวิวผู้เข้าพักจริงที่มีความบกพร่อง: โรงแรมนี้โดดเด่นมากในเรื่องขนาดประตูห้องน้ำ ห้องพักกว้างรถเข็นวีลแชร์สามารถหมุน 360 องศาได้สบาย ส่วนขอบสระว่ายน้ำมีบริการลิฟต์สลิงสำหรับพยุงลงน้ำอย่างปลอดภัย"
                </p>
              </div>
              
              <div class="space-y-sm">
                <span class="text-xs text-on-primary-container block font-bold">จุดเด่นจากการยืนยัน (UD Highlight):</span>
                <ul class="text-sm text-white space-y-xs">
                  <li class="flex items-center gap-xs">
                    <span class="material-symbols-outlined text-on-tertiary-fixed-variant text-base">verified</span>
                    ทางสัญจรเรียบ ไม่มีสเต็ปธรณีประตู
                  </li>
                  <li class="flex items-center gap-xs">
                    <span class="material-symbols-outlined text-on-tertiary-fixed-variant text-base">verified</span>
                    ปุ่มกดลิฟต์ สวิตช์ไฟ ความสูง 90 ซม.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Small Features / Badges -->
          <div class="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-surface-container-high space-y-md">
            <h4 class="font-label-lg text-label-lg text-primary">ข้อมูลความปลอดภัยเสริม</h4>
            <div class="flex flex-wrap gap-sm">
              <span class="px-md py-xs bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-semibold flex items-center gap-xs">
                <span class="material-symbols-outlined text-sm">medical_services</span> พยาบาลกู้ชีพ 24 ชม.
              </span>
              <span class="px-md py-xs bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-semibold flex items-center gap-xs">
                <span class="material-symbols-outlined text-sm">detector_smoke</span> ระบบแจ้งเตือนไฟไหม้แบบสั่นและไฟกระพริบ
              </span>
            </div>
          </div>

          <!-- Booking Widget Sidebar -->
          <div class="bg-white p-lg rounded-xl shadow-lg border-2 border-secondary/10 sticky top-24 space-y-md">
            <h4 class="font-headline-md text-headline-md text-primary">ยืนยันเลือกที่พัก</h4>
            
            <div class="space-y-sm">
              <p class="text-xs text-on-surface-variant">
                ที่พักนี้จะถูกส่งไปรวมในดีลแพ็กเกจ ร่วมกับตั๋วเครื่องบินและตั๋วอีเวนต์ เพื่อเข้าสู่ขั้นตอนวิเคราะห์ Wallet ถัดไป
              </p>
              
              <div class="flex justify-between items-center bg-surface-container p-sm rounded-lg border text-sm font-semibold">
                <span>ราคาต่อคืน:</span>
                <span class="text-secondary font-bold">฿{{ hotel.price_per_night.toLocaleString() }}</span>
              </div>
            </div>

            <form @submit.prevent="selectAndBook" class="space-y-md">
              <div>
                <label class="block text-label-sm text-on-surface-variant mb-1 font-bold" for="checkin">วันที่เช็คอิน</label>
                <input 
                  class="w-full p-md border-2 border-outline-variant rounded-lg focus:border-secondary outline-none focus-ring text-sm font-semibold" 
                  id="checkin" 
                  type="date"
                  v-model="bookingDate"
                />
              </div>
              
              <div>
                <label class="block text-label-sm text-on-surface-variant mb-1 font-bold" for="needs">ความต้องการห้องพักเพิ่มเติม</label>
                <select 
                  class="w-full p-md border-2 border-outline-variant rounded-lg focus:border-secondary outline-none focus-ring text-sm font-semibold" 
                  id="needs"
                  v-model="bookingNeed"
                >
                  <option value="เตียงนอนความสูงต่ำพิเศษ">ต้องการเตียงนอนความสูงต่ำพิเศษ</option>
                  <option value="เก้าอี้นั่งอาบน้ำและห้องน้ำกว้าง">ต้องการเก้าอี้นั่งอาบน้ำและห้องน้ำกว้าง</option>
                  <option value="สิ่งอำนวยความสะดวกการเห็นและสุนัขนำทาง">ต้องการสัญลักษณนำทางและที่พักสุนัขนำทาง</option>
                  <option value="ห้องเก็บเสียงเงียบสงบ">ต้องการห้องพักเงียบสงบลดสิ่งเร้าประสาท</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                class="w-full py-lg bg-secondary text-white rounded-xl font-headline-md hover:shadow-xl hover:translate-y-[-2px] transition-all focus-ring"
              >
                ยืนยันเลือกที่พักนี้
              </button>
            </form>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppState } from '~/composables/useAppState'
import type { Hotel } from '~/types'

const route = useRoute()
const router = useRouter()
const state = useAppState()
const { hotels, selectedHotel, selectedEvent } = state

const activeMapPin = ref<string | null>(null)
const bookingDate = ref('2026-11-26')
const bookingNeed = ref('เตียงนอนความสูงต่ำพิเศษ')

// Dynamic route matching hotel_id
const hotel = computed<Hotel | undefined>(() => {
  const hotelId = route.params.id as string
  return hotels.value.find(h => h.hotel_id === hotelId) || hotels.value[0]
})

onMounted(() => {
  // If hotel is found, update selected needs defaults based on user profile
  if (state.currentUser.value.accessibility_profile === 'physical') {
    bookingNeed.value = 'เก้าอี้นั่งอาบน้ำและห้องน้ำกว้าง'
  } else if (state.currentUser.value.accessibility_profile === 'visual') {
    bookingNeed.value = 'สิ่งอำนวยความสะดวกการเห็นและสุนัขนำทาง'
  } else if (state.currentUser.value.accessibility_profile === 'sensory') {
    bookingNeed.value = 'ห้องเก็บเสียงเงียบสงบ'
  }
})

const goBack = () => {
  // Go back to booking if event is already selected, else go search
  if (selectedEvent.value) {
    router.push('/booking')
  } else {
    router.push('/search')
  }
}

// Select hotel hero image
const getHotelHeroImage = (hotelId: string) => {
  const images: Record<string, string> = {
    'h-001': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqmsZbvKzAb_heth-nTJFgHUEYz1_sg8BldkdfGk6QF-0fDMMLI0-IAqgcMMRT561hxm3GHiFi6qkZArJGAG6ctAFRosZeyMN1RzM8Ri4K5DqS_UMKRBmRZ29R_PPddfWVK55w8fQuhAUtzhm_aMaF18InBI3zQV7Q-8GgF8jkixq5Z1CqhNH54OeAlVdsmn5wLYuQwqtR1-E_73iSykx6ZMHIttMIl23g9gkmWJ4nCYwNAtFjbYPnxSY4qS-h6pcofuqyhN7pvLFl',
    'h-002': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl7Y8jCZ5XagyDZ7dTWTy03y3nGzM5mPpzJrvq9SCVFUNrs6Cw8T9YLt7YtwbKZ2903h4UT29I3zkKy0xvf_ANKEpxo91BvcjKFLMIz8J3p-O4PlMhOsCYps7OkLYTEDTX0ASk9ErOnU2qcsGPngmjJQJpMIRROewkdk3FdnVsk2rD_rlwsJ6hLfLAJ0FxEQjUDvczgwVlJ4w2Vf0wMOC9U-ZzEdF4tVx0CtoPN3Dz_n_0TY1NHoRyxE5BalYW4q_YiJl2X9U-cCPA',
    'h-003': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK8FhCKdsg21srGwhocLX2YxKqYhuA_EnPZfdB_NJfGaBkesiHocMYXJ0IyuVmdlTSB7XJ_xdxpiHCJrhpnRlGOgN2busPZZ9GjhZtBv7EeoaGRB0-9aN3PHopd2VNkzuW_drkaPP6ZEj12BHi5CROPxCSZPX4jsAhluTUxPEfX3BfPyccgqjVwvmIEeke3hygNVdAA-CX5PtnRs4n4K8afiK6iE5Y3U7jiwpOmu_NyeqmGKy8_LmqFjwmct4ezB3McMuHqeJYZNoh'
  }
  return images[hotelId] || images['h-003']
}

// Select hotel and go back to booking
const selectAndBook = () => {
  if (hotel.value) {
    selectedHotel.value = hotel.value
    state.specialNeeds.value = bookingNeed.value
    
    // If no event is selected, redirect user to select event first
    if (!selectedEvent.value) {
      alert('คุณจองโรงแรมนี้แล้ว! กรุณาเลือกอีเวนต์เพื่อจับคู่เวลาไฟลต์บินและความคุ้มครอง Wallet ทางการเงินให้สมบูรณ์แบบค่ะ')
      router.push('/search')
    } else {
      router.push('/booking')
    }
  }
}
</script>

<style scoped>
.font-fill {
  font-variation-settings: 'FILL' 1;
}
</style>
