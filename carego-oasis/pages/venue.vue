<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- Top Navigation Bar -->
    <header class="bg-surface-container-lowest dark:bg-inverse-surface shadow-md top-0 z-50 sticky">
      <nav class="flex justify-between items-center w-full px-md md:px-xl py-sm max-w-container-max mx-auto">
        <div class="flex items-center gap-lg">
          <span class="font-display text-display text-primary dark:text-primary-fixed">CareGo Oasis</span>
          <div class="hidden md:flex gap-md">
            <NuxtLink class="font-label-lg text-label-lg text-on-surface-variant hover:text-secondary transition-colors" to="/">
              Dashboard
            </NuxtLink>
            <NuxtLink class="font-label-lg text-label-lg text-secondary border-b-2 border-secondary pb-1" to="/venue">
              Search
            </NuxtLink>
            <a class="font-label-lg text-label-lg text-on-surface-variant hover:text-secondary transition-colors" href="#">
              Help
            </a>
          </div>
        </div>
        <div class="flex items-center gap-md">
          <button class="p-sm text-secondary hover:bg-surface-container rounded-full high-contrast-focus">
            <span class="material-symbols-outlined">accessibility_new</span>
          </button>
          <button class="p-sm text-secondary hover:bg-surface-container rounded-full high-contrast-focus">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <img
            alt="User profile with accessibility settings"
            class="w-10 h-10 rounded-full border-2 border-outline-variant"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkO_j8t9VNGmqk7DxO1dI-F1x-rAEzOH2Mi6I7PSEEe_7vJUFPGDwRPziPVvHjK8qw3E4kkNmELxRnRn4wc3GI9B5YNWEqe19fjG9pvZlv1MPyVNQqjEf_Av2rA0PfU3TP4T5jKRUy1gWgo5ChwyXvBBmR9OTIH_FgSAH_SvizqJ78hxWRSPKWS6Dv2R2yDBfTIXCcGncK6X8vBEMVMmBmvbmmnJGxMbSpWzemndG4ia10ryZ-gRzRuYPqgn62n5JUBJtLfHd7JM0Q"
          />
        </div>
      </nav>
    </header>

    <main class="max-w-container-max mx-auto px-md md:px-xl py-xl flex-grow w-full">
      <!-- Hero Section -->
      <div class="relative w-full h-[400px] rounded-xl overflow-hidden mb-xl shadow-md">
        <img class="w-full h-full object-cover" :src="venue.image" :alt="venue.imageAlt" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-lg">
          <span class="bg-secondary text-white px-md py-xs rounded-full text-label-sm w-fit mb-sm">
            {{ venue.category }}
          </span>
          <h1 class="font-headline-lg text-headline-lg text-white mb-xs">{{ venue.name }}</h1>
          <p class="text-white/90 font-body-md text-body-md flex items-center gap-xs">
            <span class="material-symbols-outlined text-body-md">location_on</span>
            {{ venue.location }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <!-- Left Column: Core Content -->
        <div class="lg:col-span-8 space-y-xl">
          <!-- Info Summary -->
          <section class="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-surface-container-high">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-md">
              <div class="flex flex-col">
                <span class="text-label-sm text-on-surface-variant">ราคาเริ่มต้น</span>
                <span class="text-headline-md text-secondary font-bold">{{ venue.price }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-label-sm text-on-surface-variant">วันที่ว่าง</span>
                <span class="text-headline-md text-on-surface font-semibold">{{ venue.availability }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-label-sm text-on-surface-variant">คะแนนความสะดวก</span>
                <span class="flex items-center text-on-tertiary-container font-bold text-headline-md">
                  <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">stars</span>
                  {{ venue.accessibilityScore }}
                </span>
              </div>
              <div class="flex flex-col justify-center">
                <button class="bg-secondary text-white py-sm px-lg rounded-lg font-label-lg hover:bg-on-secondary-fixed-variant transition-all high-contrast-focus">
                  จองเลยตอนนี้
                </button>
              </div>
            </div>
          </section>

          <!-- Oasis Safe Timeline (Map) -->
          <section>
            <h2 class="font-headline-md text-headline-md mb-md flex items-center gap-sm">
              <span class="material-symbols-outlined text-secondary">map</span>
              แผนที่ Oasis Safe Timeline
            </h2>
            <div class="bg-surface-container rounded-xl overflow-hidden h-[400px] relative border-2 border-surface-container-highest">
              <img class="w-full h-full object-cover opacity-50 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI3_esn4N29legeCvgs0lNrOmie4t8kQif-IiQFyb9JrufXK1KfzFfkEIZcJPkKr3EEVb48bb6GkgNu44GYnqMwYh6258HCOH4cHMNba1hcmxEg_dz9ShBNjCS1c8S8INjVBLckOhbRnrFv41AnzQTxLhbHVtzvB4aR338KsgRMfFbq_s715qd3nmPthSKYcS5G1-znuzVMFS3xxr4a_5uDP1ozZiVencUy1QY0b2Cl9A21ZDxg1TAQZiRitphk3wXoyOY48RIaL_G" />
              <!-- Simulated Map Elements -->
              <div class="absolute inset-0 p-lg pointer-events-none">
                <div class="absolute top-1/4 left-1/3 p-xs bg-white rounded-full shadow-lg pointer-events-auto cursor-pointer group">
                  <span class="material-symbols-outlined text-secondary text-headline-md">ev_station</span>
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-primary text-white p-xs text-label-sm rounded whitespace-nowrap">
                    จุดชาร์จรถเข็นไฟฟ้า
                  </div>
                </div>
                <div class="absolute top-1/2 left-1/2 p-xs bg-white rounded-full shadow-lg pointer-events-auto cursor-pointer group">
                  <span class="material-symbols-outlined text-on-tertiary-container text-headline-md">accessible</span>
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-primary text-white p-xs text-label-sm rounded whitespace-nowrap">
                    ห้องน้ำคนพิการระดับพรีเมียม
                  </div>
                </div>
              </div>
              <!-- Legend Overlay -->
              <div class="absolute bottom-md left-md bg-white/90 backdrop-blur-sm p-md rounded-lg shadow-md space-y-sm">
                <div class="flex items-center gap-sm text-label-sm">
                  <span class="w-3 h-3 rounded-full bg-secondary"></span>
                  จุดบริการชาร์จไฟ
                </div>
                <div class="flex items-center gap-sm text-label-sm">
                  <span class="w-3 h-3 rounded-full bg-on-tertiary-container"></span>
                  ห้องน้ำเข้าถึงได้
                </div>
              </div>
            </div>
          </section>

          <!-- Detailed Description -->
          <section class="space-y-md">
            <h3 class="font-headline-md text-headline-md">เกี่ยวกับสถานที่</h3>
            <p class="font-body-md text-body-md leading-relaxed text-on-surface-variant">{{ venue.description }}</p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-md">
              <div v-for="amenity in venue.amenities" :key="amenity" class="flex items-center gap-sm p-md bg-surface-container-low rounded-lg">
                <span class="material-symbols-outlined text-secondary">check_circle</span>
                <span class="font-label-lg">{{ amenity }}</span>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column: AI Interaction & Reviews -->
        <aside class="lg:col-span-4 space-y-lg">
          <!-- Oasis AI Interaction Box -->
          <div class="bg-primary-container text-on-primary-fixed rounded-xl p-lg shadow-xl relative overflow-hidden">
            <!-- Decorative background element -->
            <div class="absolute -right-10 -top-10 opacity-10">
              <span class="material-symbols-outlined text-[150px]">smart_toy</span>
            </div>
            <div class="relative z-10">
              <div class="flex items-center gap-sm mb-md">
                <span class="material-symbols-outlined text-on-tertiary-fixed-variant">temp_preferences_custom</span>
                <h3 class="font-headline-md text-headline-md text-white">Gemini Analysis</h3>
              </div>
              <div class="bg-white/10 backdrop-blur-md rounded-lg p-md border border-white/20 mb-md">
                <p class="font-body-md text-body-md text-white leading-relaxed italic">{{ venue.geminiAnalysis }}</p>
              </div>
              <div class="space-y-sm">
                <span class="text-label-sm text-on-primary-container block">สรุปจุดเด่น:</span>
                <ul class="text-label-lg text-white space-y-xs">
                  <li v-for="highlight in venue.highlights" :key="highlight" class="flex items-start gap-xs">
                    <span class="material-symbols-outlined text-on-tertiary-fixed-variant text-body-md">verified</span>
                    {{ highlight }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Small Features / Badges -->
          <div class="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-surface-container-high space-y-md">
            <h4 class="font-label-lg text-label-lg">ข้อมูลความปลอดภัย</h4>
            <div class="flex flex-wrap gap-sm">
              <span v-for="badge in venue.safetyBadges" :key="badge" class="px-md py-xs bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-label-sm flex items-center gap-xs">
                <span class="material-symbols-outlined text-body-md">{{ badge.includes('พยาบาล') ? 'medical_services' : 'detector_smoke' }}</span>
                {{ badge }}
              </span>
            </div>
          </div>

          <!-- Booking Widget -->
          <div class="bg-white p-lg rounded-xl shadow-lg border-2 border-secondary/10 sticky top-24">
            <h4 class="font-headline-md text-headline-md mb-md">จองห้องพัก</h4>
            <form class="space-y-md">
              <div>
                <label class="block text-label-sm text-on-surface-variant mb-1" for="checkin">วันที่เช็คอิน</label>
                <input class="w-full p-md border-2 border-outline-variant rounded-lg focus:border-secondary outline-none high-contrast-focus" id="checkin" type="date" />
              </div>
              <div>
                <label class="block text-label-sm text-on-surface-variant mb-1" for="needs">ความต้องการพิเศษ</label>
                <select class="w-full p-md border-2 border-outline-variant rounded-lg focus:border-secondary outline-none high-contrast-focus" id="needs">
                  <option>ต้องการเตียงระดับต่ำ</option>
                  <option>ต้องการล่ามภาษามือ</option>
                  <option>ต้องการเก้าอี้อาบน้ำ</option>
                </select>
              </div>
              <button class="w-full py-lg bg-secondary text-white rounded-xl font-headline-md hover:shadow-xl hover:translate-y-[-2px] transition-all high-contrast-focus" type="submit">
                ยืนยันการจอง
              </button>
            </form>
          </div>
        </aside>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-primary dark:bg-primary-container w-full py-xl px-md md:px-xl flex flex-col md:flex-row justify-between items-center gap-lg">
      <div class="flex flex-col gap-sm">
        <span class="font-headline-md text-headline-md text-on-primary">CareGo Oasis</span>
        <p class="font-body-md text-body-md text-primary-fixed-dim">© 2024 CareGo Oasis. All rights reserved. Built for accessibility.</p>
      </div>
      <div class="flex flex-wrap justify-center gap-md">
        <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors" href="#">
          Contact Support (SLS)
        </a>
        <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors" href="#">
          Accessibility Statement
        </a>
        <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors" href="#">
          Privacy Policy
        </a>
        <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors" href="#">
          Terms of Service
        </a>
      </div>
    </footer>

    <!-- Live Chat Simulator -->
    <div class="fixed bottom-lg right-lg z-[100] transition-all duration-300 transform scale-100" id="chat-widget">
      <!-- Chat Bubble Trigger -->
      <button class="chat-pulse bg-secondary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform high-contrast-focus" id="chat-trigger" @click="toggleChat">
        <span class="material-symbols-outlined text-[32px]">forum</span>
      </button>
      <!-- Chat Window (Hidden by default) -->
      <div class="hidden absolute bottom-20 right-0 w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-outline-variant flex flex-col" id="chat-window">
        <div class="bg-primary p-md flex items-center justify-between text-white">
          <div class="flex items-center gap-sm">
            <span class="material-symbols-outlined text-on-tertiary-fixed-variant">smart_toy</span>
            <div>
              <p class="font-label-lg leading-tight">Oasis Assistant</p>
              <p class="text-[10px] text-primary-fixed-dim">ออนไลน์ พร้อมช่วยเหลือ</p>
            </div>
          </div>
          <button class="hover:bg-white/10 p-xs rounded-full" @click="toggleChat">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="h-80 overflow-y-auto p-md space-y-md bg-surface-container-lowest" id="chat-messages">
          <div class="flex flex-col items-start max-w-[80%]">
            <div class="bg-surface-container p-sm rounded-lg rounded-tl-none font-body-md text-body-md">
              สวัสดีค่ะ! ดิฉันเป็น AI ผู้ช่วยส่วนตัวของคุณ ต้องการทราบข้อมูลความสะดวกด้านใดของรีสอร์ทนี้เพิ่มเติมไหมคะ?
            </div>
            <span class="text-[10px] text-on-surface-variant mt-1">10:30 น.</span>
          </div>
        </div>
        <div class="p-md border-t border-outline-variant flex gap-sm">
          <input class="flex-1 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary text-body-md" placeholder="พิมพ์คำถามของคุณ..." type="text" />
          <button class="bg-secondary text-white p-sm rounded-lg flex items-center justify-center high-contrast-focus">
            <span class="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const venue = useVenueDetailData()

const toggleChat = () => {
  const chatWindow = document.getElementById('chat-window')
  const chatTrigger = document.getElementById('chat-trigger')
  if (chatWindow && chatTrigger) {
    if (chatWindow.classList.contains('hidden')) {
      chatWindow.classList.remove('hidden')
      chatTrigger.classList.add('opacity-0', 'pointer-events-none')
    } else {
      chatWindow.classList.add('hidden')
      chatTrigger.classList.remove('opacity-0', 'pointer-events-none')
    }
  }
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.material-symbols-outlined.fill-icon {
  font-variation-settings: 'FILL' 1;
}

.high-contrast-focus:focus,
.high-contrast-focus:focus-visible {
  outline: 3px solid #0051d5;
  outline-offset: 2px;
}
</style>
