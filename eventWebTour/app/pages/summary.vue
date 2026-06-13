<template>
  <div class="bg-surface text-on-surface min-h-screen">
    <main class="max-w-container-max mx-auto px-md md:px-xl py-xl space-y-xl">
      <!-- Back Link -->
      <div>
        <NuxtLink to="/booking" class="flex items-center gap-xs text-secondary hover:text-on-secondary-fixed-variant font-label-lg focus-ring w-fit">
          <span class="material-symbols-outlined">arrow_back</span>
          <span>ย้อนกลับไปเลือกเที่ยวบินและที่พัก</span>
        </NuxtLink>
      </div>

      <h1 class="font-headline-lg text-headline-lg text-primary">ขั้นตอนที่ 3: วิเคราะห์งบประมาณและความปลอดภัยทางการเงิน</h1>

      <div v-if="selectedEvent" class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <!-- Left Column: Deal Review & Items Summary (7 cols) -->
        <section class="lg:col-span-7 space-y-lg">
          <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
            <span class="material-symbols-outlined">receipt_long</span>
            สรุปรายการทริปและค่าใช้จ่าย (Deal Summary)
          </h2>

          <div class="bg-white p-lg rounded-xl shadow-md border border-outline-variant space-y-md">
            <!-- Event Item -->
            <div class="flex justify-between items-start pb-md border-b border-outline-variant">
              <div>
                <span class="text-xs font-bold text-on-surface-variant block">บัตรผ่านประตูอีเวนต์</span>
                <p class="font-label-lg text-primary">{{ selectedEvent.title }}</p>
                <p class="text-xs text-on-surface-variant">ที่นั่งพิเศษ: {{ specialSeating }}</p>
              </div>
              <span class="font-bold text-primary">
                {{ selectedEvent.ticket_price === 0 ? 'ฟรี' : `฿${selectedEvent.ticket_price.toLocaleString()}` }}
              </span>
            </div>

            <!-- Flight Item -->
            <div v-if="selectedFlight" class="flex justify-between items-start pb-md border-b border-outline-variant">
              <div>
                <span class="text-xs font-bold text-on-surface-variant block">ตั๋วเครื่องบินขาไป (เที่ยวเดียว)</span>
                <p class="font-label-lg text-primary">{{ selectedFlight.airline }} ({{ selectedFlight.flight_id }})</p>
                <p class="text-xs text-on-surface-variant">
                  เส้นทาง: {{ selectedFlight.origin }} ➔ {{ selectedFlight.destination }} | บริการช่วยเหลือพิเศษพ่วงในตั๋ว
                </p>
              </div>
              <span class="font-bold text-primary">฿{{ selectedFlight.price.toLocaleString() }}</span>
            </div>

            <!-- Hotel Item -->
            <div v-if="selectedHotel" class="flex justify-between items-start pb-md border-b border-outline-variant">
              <div>
                <span class="text-xs font-bold text-on-surface-variant block">โรงแรมที่พัก (Universal Design)</span>
                <p class="font-label-lg text-primary">{{ selectedHotel.name }}</p>
                <p class="text-xs text-on-surface-variant">
                  เข้าพักจำนวน {{ nights }} คืน | ความต้องการ: {{ specialNeeds }}
                </p>
              </div>
              <div class="text-right">
                <span class="font-bold text-primary block">฿{{ (selectedHotel.price_per_night * nights).toLocaleString() }}</span>
                <span class="text-[10px] text-on-surface-variant">({{ selectedHotel.price_per_night.toLocaleString() }} / คืน)</span>
              </div>
            </div>

            <!-- Price Breakdown Calculation -->
            <div class="space-y-sm pt-sm">
              <div class="flex justify-between text-sm text-on-surface-variant">
                <span>ราคารวมทริปทั้งหมด:</span>
                <span>฿{{ totalTripPrice.toLocaleString() }}</span>
              </div>
              <div v-if="appliedPoints > 0" class="flex justify-between text-sm text-green-700 font-bold">
                <span>ส่วนลดจาก Oasis Points (1 พอยท์ = 1 บาท):</span>
                <span>-฿{{ appliedPoints.toLocaleString() }}</span>
              </div>
              
              <div class="flex justify-between text-headline-md font-bold text-primary pt-md border-t-2 border-primary">
                <span>ยอดเงินสุทธิที่ต้องชำระ:</span>
                <span class="text-secondary">฿{{ finalTripPrice.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- Points Redemption Slide Card -->
          <div class="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm space-y-md">
            <h3 class="font-label-lg text-label-lg text-primary flex items-center gap-xs">
              <span class="material-symbols-outlined text-secondary">stars</span>
              แลกคะแนนสะสม Oasis Points รับส่วนลดเพิ่ม
            </h3>
            <p class="text-xs text-on-surface-variant">
              คุณมีคะแนนสะสมทั้งหมด <strong class="text-secondary">{{ currentUser.loyalty_points }} คะแนน</strong> แลกรับส่วนลดได้ทันที (สูงสุด 100% ของราคาห้องพัก)
            </p>

            <div class="space-y-sm pt-xs" v-if="currentUser.loyalty_points > 0">
              <div class="flex justify-between text-xs font-bold text-primary">
                <span>0 คะแนน</span>
                <span class="text-secondary">แลก {{ appliedPoints }} คะแนน (ลด ฿{{ appliedPoints }})</span>
                <span>{{ currentUser.loyalty_points }} คะแนน</span>
              </div>
              <input 
                v-model.number="appliedPoints"
                type="range" 
                min="0" 
                :max="maxRedeemablePoints" 
                step="10"
                class="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>
            <div v-else class="text-xs text-on-surface-variant p-sm bg-surface-container-low rounded-lg">
              คุณไม่มีคะแนนสะสมคงเหลือในบัญชีสำหรับการแลกส่วนลดในทริปนี้
            </div>
          </div>
        </section>

        <!-- Right Column: AI FinTech Guardian & Confirm (5 cols) -->
        <aside class="lg:col-span-5 space-y-lg">
          <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
            <span class="material-symbols-outlined text-secondary">shield</span>
            3. AI Budget Guardian ประเมินความปลอดภัยทางการเงิน
          </h2>
          
          <!-- User Financial Profile Brief -->
          <div class="bg-surface-container-lowest p-md rounded-xl border border-outline-variant text-xs space-y-xs">
            <p class="font-bold text-primary mb-xs">ข้อมูลบัญชี Wallet ของผู้ใช้:</p>
            <div class="grid grid-cols-2 gap-sm">
              <div>
                <span class="text-on-surface-variant block">เงินคงเหลือในบัญชี:</span>
                <strong class="text-primary text-sm">฿{{ walletBalance.toLocaleString() }}</strong>
              </div>
              <div>
                <span class="text-on-surface-variant block">ค่าเช่าบ้านประจำเดือน (Rent):</span>
                <strong class="text-primary text-sm">฿{{ monthlyRent.toLocaleString() }}</strong>
              </div>
            </div>
            <div class="pt-sm border-t border-outline-variant text-[10px] text-on-surface-variant">
              *ระบบ AI Guardian จะวิเคราะห์ไม่ให้ทริปท่องเที่ยวส่งผลกระทบต่อภาระค่าใช้จ่ายจำเป็นเช่น ค่าเช่าบ้าน ในรอบถัดไป
            </div>
          </div>

          <!-- Dynamic Guardian Warning Box -->
          <div 
            class="p-lg rounded-xl shadow-md border-t-8 transition-all duration-300"
            :class="isBudgetSafe ? 'bg-green-50 border-green-600 text-green-950' : 'bg-red-50 border-red-600 text-red-950'"
          >
            <div class="flex items-center gap-md mb-md">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm"
                :class="isBudgetSafe ? 'bg-green-600' : 'bg-red-600'"
              >
                <span class="material-symbols-outlined text-headline-md">
                  {{ isBudgetSafe ? 'verified_user' : 'gpp_maybe' }}
                </span>
              </div>
              <div>
                <span class="text-xs font-bold uppercase block" :class="isBudgetSafe ? 'text-green-700' : 'text-red-700'">
                  {{ isBudgetSafe ? 'สถานะปลอดภัย (Safe Status)' : 'สถานะเฝ้าระวัง (Watchout Status)' }}
                </span>
                <p class="font-label-lg text-primary text-sm font-bold mt-xs">
                  {{ isBudgetSafe ? 'ยอดคงเหลือในบัญชีปลอดภัยต่อค่าเช่าบ้าน' : 'เงินคงเหลือใน Wallet สุ่มเสี่ยงไม่พอค่าเช่าบ้าน' }}
                </p>
              </div>
            </div>

            <!-- Dynamic AI Message text -->
            <p class="text-xs leading-relaxed font-body-md" :class="isBudgetSafe ? 'text-green-900' : 'text-red-900'">
              {{ getGuardianFeedbackText() }}
            </p>

            <!-- Suggestion list when unsafe -->
            <div v-if="!isBudgetSafe" class="mt-md p-sm bg-white/60 rounded-lg text-xs space-y-sm text-red-900 border border-red-200">
              <p class="font-bold">💡 คำแนะนำของ AI เพื่อความปลอดภัยทางเงิน:</p>
              <ul class="list-disc pl-md space-y-xs">
                <li>เลื่อนสไลด์ด้านซ้ายเพื่อแลกพอยท์ <strong>Oasis Points</strong> รับส่วนลดเพิ่ม</li>
                <li>กดย้อนกลับไปสลับประเภทโรงแรมที่มีเรตราคาเริ่มต้นประหยัดลง</li>
              </ul>
            </div>
          </div>

          <!-- Try switching users tip -->
          <div class="bg-surface-container-low p-sm rounded-lg text-[10px] text-on-surface-variant flex items-start gap-xs">
            <span class="material-symbols-outlined text-sm text-secondary">info</span>
            <span>
              <strong>Tip:</strong> ลองกดสลับเปลี่ยนผู้ใช้ในเมนูโปรไฟล์มุมขวาบน (เช่น สลับเป็นคุณ Mana Dee ที่มีเงินคงเหลือจำกัด) เพื่อทดสอบดูระบบเฝ้าระวังความปลอดภัย Budget Guardian ทำการวิเคราะห์และแนะนำแจ้งเตือนในสถานะต่างๆ!
            </span>
          </div>

          <!-- Action buttons -->
          <div class="space-y-sm">
            <button 
              @click="handleConfirmBooking"
              class="w-full py-4 bg-secondary text-white rounded-xl font-headline-md text-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] transition-all focus-ring shadow-lg"
              :class="!isBudgetSafe ? 'brightness-90' : ''"
            >
              {{ isBudgetSafe ? 'ยืนยันจองแพ็กเกจทริปทั้งหมด (Confirm Booking)' : 'ยืนยันจองทริปแบบรับความเสี่ยงการเงิน' }}
            </button>
            
            <p class="text-[10px] text-center text-on-surface-variant leading-relaxed">
              การกดปุ่มเป็นการยืนยันความพึงพอใจและการล็อกโควตาเข้าถึงอารยสถาปัตยกรรม (UD Seating & Room Verified) ระบบจะทำการล็อกที่นั่งและห้องพักทันที
            </p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAppState } from '~/composables/useAppState'

const router = useRouter()
const state = useAppState()
const { currentUser, selectedEvent, selectedFlight, selectedHotel, nights, appliedPoints, specialSeating, specialNeeds, walletBalance, monthlyRent, confirmBooking } = state

// Estimate totals
const totalTripPrice = computed(() => {
  let cost = selectedEvent.value?.ticket_price || 0
  if (selectedFlight.value) cost += selectedFlight.value.price
  if (selectedHotel.value) cost += selectedHotel.value.price_per_night * nights.value
  return cost
})

const finalTripPrice = computed(() => {
  return Math.max(0, totalTripPrice.value - appliedPoints.value)
})

// Limit maximum points redeemable (can't exceed trip cost or user points)
const maxRedeemablePoints = computed(() => {
  return Math.min(currentUser.value.loyalty_points, totalTripPrice.value)
})

// Reset applied points on user switch
watch(currentUser, () => {
  appliedPoints.value = 0
})

// Check if wallet balance minus trip is higher than rent
const remainingBalance = computed(() => {
  return walletBalance.value - finalTripPrice.value
})

const isBudgetSafe = computed(() => {
  return remainingBalance.value >= monthlyRent.value
})

// Guardian Feedback text
const getGuardianFeedbackText = () => {
  const rent = monthlyRent.value
  const rem = remainingBalance.value
  const trip = finalTripPrice.value
  
  if (isBudgetSafe.value) {
    return `สถานะปลอดภัย: ยอดรวมทริปนี้ ฿${trip.toLocaleString()} เมื่อจ่ายเงินชำระเสร็จสิ้นแล้ว คุณยังคงมียอดเงินคงเหลือใน Wallet ฿${rem.toLocaleString()} ซึ่งเพียงพอและปลอดภัยต่อการชำระค่าเช่าบ้านประจำเดือนที่จะถึงในวันที่ 28 นี้ (ยอดค่าเช่าบ้าน ฿${rent.toLocaleString()})`
  } else {
    const diff = rent - rem
    return `สถานะเฝ้าระวัง: ทริปนี้จะทำให้เงินคงเหลือใน Wallet เหลือเพียง ฿${rem.toLocaleString()} ส่งผลให้ยอดเงินไม่เพียงพอชำระค่าเช่าบ้านประจำเดือนของคุณ (ขาดอีก ฿${diff.toLocaleString()} เพื่อให้ครอบคลุมค่าเช่าบ้าน ฿${rent.toLocaleString()}) แนะนำให้ปรับสลับที่พัก หรือแลกแต้มสะสมเพิ่มเพื่อความคุ้มครองทางการเงิน`
  }
}

// Confirm booking action
const handleConfirmBooking = () => {
  if (!isBudgetSafe.value) {
    const doubleCheck = confirm('⚠️ คำแจ้งเตือนความปลอดภัยการเงิน:\nเงินคงเหลือของคุณเสี่ยงไม่พอจ่ายค่าเช่าบ้านประจำเดือนในวันที่ 28 นี้ คุณแน่ใจต้องการกดยืนยันจองทริปต่อหรือไม่?')
    if (!doubleCheck) return
  }

  const result = confirmBooking()
  if (result) {
    alert(`🎉 การจองสำเร็จ!\nเราทำการส่งบันทึกการจองสำหรับงาน "${result.event.title}" เข้าไปใน Dashboard ของคุณเรียบร้อยแล้วค่ะ`)
    router.push('/')
  }
}
</script>

<style scoped>
</style>
