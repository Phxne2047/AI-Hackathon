<template>
  <div class="fixed bottom-lg right-lg z-[100] transition-all duration-300 transform scale-100">
    <!-- Chat Bubble Trigger -->
    <button 
      v-if="!isChatOpen"
      class="chat-pulse bg-secondary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform focus-ring"
      id="chat-trigger" 
      @click="toggleChat"
      aria-label="เปิดผู้ช่วย Oasis AI"
    >
      <span class="material-symbols-outlined text-[32px]">forum</span>
    </button>

    <!-- Chat Window -->
    <div 
      v-else
      class="absolute bottom-0 right-0 w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-outline-variant flex flex-col transition-all duration-300"
      id="chat-window"
    >
      <!-- Header -->
      <div class="bg-primary p-md flex items-center justify-between text-white">
        <div class="flex items-center gap-sm">
          <span class="material-symbols-outlined text-on-tertiary-fixed-variant">smart_toy</span>
          <div>
            <p class="font-label-lg leading-tight">Oasis Assistant</p>
            <p class="text-[10px] text-primary-fixed-dim">ออนไลน์ พร้อมช่วยเหลือ</p>
          </div>
        </div>
        <button class="hover:bg-white/10 p-xs rounded-full focus-ring" @click="toggleChat">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Messages Area -->
      <div 
        class="h-80 overflow-y-auto p-md space-y-md bg-surface-container-lowest custom-scrollbar" 
        ref="messagesContainer"
      >
        <div 
          v-for="(msg, idx) in chatMessages" 
          :key="idx"
          class="flex flex-col max-w-[80%]"
          :class="msg.isUser ? 'items-end self-end ml-auto' : 'items-start'"
        >
          <div 
            class="p-sm rounded-lg font-body-md text-body-md"
            :class="msg.isUser ? 'bg-secondary text-white rounded-tr-none' : 'bg-surface-container text-on-surface rounded-tl-none'"
          >
            {{ msg.text }}
          </div>
          <span class="text-[10px] text-on-surface-variant mt-1">
            {{ msg.timestamp }}
          </span>
        </div>
        <div v-if="isTyping" class="flex flex-col items-start max-w-[80%]">
          <div class="bg-surface-container p-sm rounded-lg rounded-tl-none font-body-md text-body-md italic text-on-surface-variant">
            กำลังพิมพ์...
          </div>
        </div>
      </div>

      <!-- Input Bar -->
      <form @submit.prevent="sendMessage" class="p-md border-t border-outline-variant flex gap-sm bg-white">
        <input 
          v-model="userQuery"
          class="flex-1 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary text-body-md px-md py-sm outline-none" 
          placeholder="พิมพ์คำถามของคุณเกี่ยวกับสิ่งอำนวยความสะดวก..." 
          type="text"
          ref="queryInput"
        />
        <button 
          type="submit"
          class="bg-secondary text-white p-sm rounded-lg flex items-center justify-center focus-ring hover:bg-secondary-container transition-colors"
        >
          <span class="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useAppState } from '~/composables/useAppState'

const { currentUser } = useAppState()

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const isChatOpen = ref(false)
const userQuery = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLDivElement | null>(null)
const queryInput = ref<HTMLInputElement | null>(null)

const chatMessages = ref<Message[]>([
  {
    text: `สวัสดีค่ะคุณ ${currentUser.value.name}! ดิฉันเป็น AI ผู้ช่วยส่วนตัวประจำทริปของคุณ มีข้อมูลความสะดวกด้านใด (เช่น ทางลาด รถเข็น หรือโซนพิเศษ) ที่อยากให้ตรวจสอบเพิ่มไหมคะ?`,
    isUser: false,
    timestamp: getCurrentTimeString()
  }
])

function getCurrentTimeString() {
  const d = new Date()
  return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.'
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) {
    nextTick(() => {
      scrollToBottom()
      queryInput.value?.focus()
    })
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = () => {
  const text = userQuery.value.trim()
  if (!text) return

  chatMessages.value.push({
    text,
    isUser: true,
    timestamp: getCurrentTimeString()
  })

  userQuery.value = ''
  nextTick(() => {
    scrollToBottom()
  })

  // Simulated AI response
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    const reply = getAIResponse(text)
    chatMessages.value.push({
      text: reply,
      isUser: false,
      timestamp: getCurrentTimeString()
    })
    nextTick(() => {
      scrollToBottom()
    })
  }, 1000)
}

const getAIResponse = (query: string): string => {
  const q = query.toLowerCase()
  if (q.includes('ทางลาด') || q.includes('ramp')) {
    return 'ทางลาดทางเข้าหลักและอาคารจอดรถผ่านเกณฑ์มาตรฐานอารยสถาปัตยกรรม (Universal Design) โดยมีความชันเพียง 8 องศา (มาตรฐานสากลไม่เกิน 10 องศา) พร้อมราวจับกันลื่นสองข้างค่ะ'
  }
  if (q.includes('รถเข็น') || q.includes('วีลแชร์') || q.includes('wheelchair')) {
    return 'ในเที่ยวบินที่เลือก มีการจอง Cabin Chair และบริการช่วยเหลือขึ้น-ลงเครื่องเรียบร้อยแล้วค่ะ และจุดจัดงานก็มีทางลาดกับโซนสำหรับรถเข็นแถวหน้าสุด (โซน A1) คอยรองรับค่ะ'
  }
  if (q.includes('ห้องน้ำ') || q.includes('toilet') || q.includes('restroom')) {
    return 'ที่พักและสถานที่จัดงานทุกจุดมีห้องน้ำผู้พิการ ประตูสไลด์แบบกว้างพิเศษ (90-120 ซม.) มีราวจับรูปตัว L และปุ่มกดฉุกเฉินระดับพื้นดินตามเกณฑ์ความปลอดภัยค่ะ'
  }
  if (q.includes('เงิน') || q.includes('งบ') || q.includes('เช่าบ้าน') || q.includes('ราคา') || q.includes('wallet')) {
    return 'หากกังวลเรื่องงบประมาณ ระบบ FinTech Guardian ของเราจะวิเคราะห์สัดส่วนเงินคงเหลือเทียบกับค่าเช่าบ้านให้ในหน้าสรุปทริปนะคะ แนะนำให้สลับประเภทโรงแรมเพื่อคุมค่าใช้จ่าย หรือใช้ Oasis Points แลกรับส่วนลดเพิ่มได้ค่ะ'
  }
  if (q.includes('สวัสดี') || q.includes('หวัดดี') || q.includes('hello')) {
    return 'สวัสดีค่ะ! มีสิ่งใดให้ Oasis Assistant ช่วยเช็คข้อมูลความปลอดภัยและการเข้าถึง (Accessibility) ในทริปนี้เพิ่มเติมไหมคะ?'
  }
  return 'จากการตรวจสอบเบื้องต้น ข้อมูลการเดินทางและจุดหมายปลายทางได้รับการยืนยันตามเกณฑ์อารยสถาปัตยกรรม (UD Verified) เรียบร้อยแล้วค่ะ หากมีคำถามเฉพาะด้านอื่นๆ สามารถแจ้งมาได้เลยนะคะ'
}

watch(isChatOpen, (open) => {
  if (open) {
    nextTick(scrollToBottom)
  }
})
</script>

<style scoped>
.chat-pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 81, 213, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 81, 213, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 81, 213, 0);
  }
}
</style>
