<template>
  <header class="bg-surface-container-lowest shadow-md sticky top-0 z-50">
    <div class="flex justify-between items-center w-full px-md md:px-xl py-sm max-w-container-max mx-auto">
      <!-- Logo / App Title -->
      <div class="flex items-center gap-md">
        <NuxtLink to="/" class="font-display text-display text-primary hover:opacity-95 focus-ring">
          CareGo Oasis
        </NuxtLink>
      </div>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex gap-lg items-center">
        <NuxtLink 
          to="/" 
          class="font-label-lg text-label-lg px-2 py-1 focus-ring"
          :class="route.path === '/' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary transition-colors'"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink 
          to="/search" 
          class="font-label-lg text-label-lg px-2 py-1 focus-ring"
          :class="route.path === '/search' || route.path.startsWith('/booking') || route.path.startsWith('/summary') ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary transition-colors'"
        >
          Search
        </NuxtLink>
        <a 
          href="#" 
          class="font-label-lg text-label-lg text-on-surface-variant hover:text-secondary transition-colors focus-ring px-2 py-1"
          @click.prevent="showHelpToast"
        >
          Help
        </a>
      </nav>

      <!-- Right Hand Utilities and Profile Picker -->
      <div class="flex items-center gap-md relative">
        <!-- Accessibility Profile Indicator Badge -->
        <span 
          v-if="currentUser.accessibility_profile" 
          class="hidden sm:inline-flex items-center gap-xs px-sm py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold capitalize"
        >
          <span class="material-symbols-outlined text-sm">
            {{ getProfileIcon(currentUser.accessibility_profile) }}
          </span>
          {{ currentUser.accessibility_profile }} Profile
        </span>

        <!-- Loyalty Points Display -->
        <span class="hidden md:inline-flex items-center gap-xs text-sm font-semibold text-tertiary-fixed-dim bg-tertiary-container px-sm py-1 rounded-lg">
          <span class="material-symbols-outlined text-sm fill-icon text-on-tertiary-container">stars</span>
          {{ currentUser.loyalty_points }} pts
        </span>

        <button 
          aria-label="การตั้งค่าการเข้าถึง" 
          class="p-sm rounded-full hover:bg-surface-container focus-ring text-secondary"
          @click="toggleAccessibilityMenu"
        >
          <span class="material-symbols-outlined">accessibility_new</span>
        </button>

        <button 
          aria-label="การแจ้งเตือน" 
          class="p-sm rounded-full hover:bg-surface-container focus-ring text-secondary"
          @click="showNotifications"
        >
          <span class="material-symbols-outlined">notifications</span>
        </button>

        <!-- User Profile Avatar & Dropdown Switcher -->
        <div class="relative">
          <button 
            @click="isUserMenuOpen = !isUserMenuOpen" 
            class="flex items-center gap-xs focus-ring rounded-full"
            aria-label="เมนูผู้ใช้งาน"
            aria-haspopup="true"
            :aria-expanded="isUserMenuOpen"
          >
            <div class="w-10 h-10 rounded-full bg-secondary-fixed overflow-hidden border-2 border-secondary hover:brightness-95 transition-all">
              <img 
                :alt="currentUser.name" 
                class="w-full h-full object-cover" 
                :src="getUserAvatar(currentUser.user_id)"
              />
            </div>
            <span class="material-symbols-outlined text-on-surface-variant text-sm">arrow_drop_down</span>
          </button>

          <!-- Dropdown Menu -->
          <div 
            v-if="isUserMenuOpen" 
            class="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-outline-variant py-md z-[100] animate-fadeIn"
          >
            <div class="px-md pb-sm border-b border-outline-variant mb-sm">
              <p class="font-label-lg text-primary">{{ currentUser.name }}</p>
              <p class="text-xs text-on-surface-variant truncate">{{ currentUser.email }}</p>
              <p class="text-xs text-secondary mt-1 font-semibold">Wallet: ฿{{ walletBalance.toLocaleString() }}</p>
            </div>
            
            <p class="text-xs font-bold text-on-surface-variant px-md pb-xs">สลับบัญชีผู้ใช้ (ทดสอบโพรไฟล์):</p>
            <div class="max-h-60 overflow-y-auto custom-scrollbar">
              <button 
                v-for="u in users" 
                :key="u.user_id"
                @click="changeUser(u.user_id)"
                class="w-full text-left px-md py-sm hover:bg-surface-container flex items-center gap-md transition-colors"
                :class="u.user_id === currentUser.user_id ? 'bg-surface-container-low font-bold text-secondary' : 'text-on-surface'"
              >
                <div class="w-8 h-8 rounded-full overflow-hidden border">
                  <img :src="getUserAvatar(u.user_id)" class="w-full h-full object-cover" />
                </div>
                <div class="flex-grow min-w-0">
                  <p class="text-sm truncate">{{ u.name }}</p>
                  <p class="text-[10px] text-on-surface-variant truncate">
                    {{ u.accessibility_profile ? `${u.accessibility_profile} profile` : 'No needs' }}
                  </p>
                </div>
                <span v-if="u.user_id === currentUser.user_id" class="material-symbols-outlined text-sm text-secondary">check_circle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Help Toast notification -->
    <div v-if="toastMsg" class="fixed bottom-24 left-md z-[100] bg-primary text-white px-lg py-sm rounded-xl shadow-xl flex items-center gap-sm animate-bounce">
      <span class="material-symbols-outlined text-on-tertiary-container">info</span>
      <span class="text-sm font-label-lg">{{ toastMsg }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppState } from '~/composables/useAppState'

const route = useRoute()
const state = useAppState()
const { users, currentUser, walletBalance, selectUser } = state

const isUserMenuOpen = ref(false)
const toastMsg = ref('')

const getUserAvatar = (userId: string) => {
  // Return different avatars for different users to keep UX premium
  const avatars: Record<string, string> = {
    'u001': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvy43jsR-7fGlzAmTM3zctQcec6W0Xbzn5DdeySdQKynFumpfxNWFfuMbQ1_v6Ta7Z9B5f0w5Y3h6K6x8JWDxw8BaFI7BOKZ08Cs5_UBEpJvt7ig-PpJAkuayEakjL3IA8YbIJGI3hjzc_K72wb6_V5cex7Bvhc9aMMHp2Nnm3pto17b4FpPfYYoJ9XoTWX_Kj1Lllcv4FL-BxDZ5Wq5w0iYML0pGZc5tKmumm4HheMB-ICNV4xI_YmUq0yn-ZPL1oNkmITk5SvVRL',
    'u002': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkO_j8t9VNGmqk7DxO1dI-F1x-rAEzOH2Mi6I7PSEEe_7vJUFPGDwRPziPVvHjK8qw3E4kkNmELxRnRn4wc3GI9B5YNWEqe19fjG9pvZlv1MPyVNQqjEf_Av2rA0PfU3TP4T5jKRUy1gWgo5ChwyXvBBmR9OTIH_FgSAH_SvizqJ78hxWRSPKWS6Dv2R2yDBfTIXCcGncK6X8vBEMVMmBmvbmmnJGxMbSpWzemndG4ia10ryZ-gRzRuYPqgn62n5JUBJtLfHd7JM0Q',
    'u003': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmevlGC6fLh16Ty-ni_prke52oNhy12-HyjZ3JFp6v8SKsdH2hoO_4gT0QESTIgdQqORlen7RbXQ6rAsUkNawiiER4wtPQQUhbqYNVLvWbDUbgzxSQt8Zv--zrxmRYX3_PlHvscwcweJoxUImYtEUQPvV3HbF5lRDykT2HZEf46HH3aOliaJUUUi4WkG7tohOpwjPJz4ZG94DD1pbuHj9hatXY2khY0OSppRp9Hy_OzBG7EHtthnE9N54kr-UXPcpm2PPc-fj1YwO7',
    'u004': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqmsZbvKzAb_heth-nTJFgHUEYz1_sg8BldkdfGk6QF-0fDMMLI0-IAqgcMMRT561hxm3GHiFi6qkZArJGAG6ctAFRosZeyMN1RzM8Ri4K5DqS_UMKRBmRZ29R_PPddfWVK55w8fQuhAUtzhm_aMaF18InBI3zQV7Q-8GgF8jkixq5Z1CqhNH54OeAlVdsmn5wLYuQwqtR1-E_73iSykx6ZMHIttMIl23g9gkmWJ4nCYwNAtFjbYPnxSY4qS-h6pcofuqyhN7pvLFl',
  }
  return avatars[userId] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
}

const getProfileIcon = (profile: string) => {
  switch (profile) {
    case 'physical': return 'accessible'
    case 'visual': return 'visibility'
    case 'hearing': return 'sign_language'
    case 'sensory': return 'volume_up'
    default: return 'person'
  }
}

const changeUser = (userId: string) => {
  selectUser(userId)
  isUserMenuOpen.value = false
  showToast(`สลับไปยังผู้ใช้: ${currentUser.value.name} (${currentUser.value.accessibility_profile || 'ไม่มี'} โพรไฟล์)`)
}

const toggleAccessibilityMenu = () => {
  showToast('การตั้งค่าการเข้าถึง: ฟอนต์ตัวหนา / คอนทราสต์สูง เปิดใช้งานเป็นค่าเริ่มต้นเพื่อความเข้าถึงง่าย')
}

const showNotifications = () => {
  showToast('ระบบแจ้งเตือน: ไม่มีรายการแจ้งเตือนใหม่ในขณะนี้')
}

const showHelpToast = () => {
  showToast('ติดต่อทีมผู้ช่วยพิเศษ CareGo Oasis โทร 1669 กด 9 ได้ตลอด 24 ชม.')
}

const showToast = (msg: string) => {
  toastMsg.value = msg
  setTimeout(() => {
    toastMsg.value = ''
  }, 4000)
}

// Close dropdown if clicked outside
const closeMenu = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeMenu)
})

onUnmounted(() => {
  window.removeEventListener('click', closeMenu)
})
</script>

<style scoped>
.fill-icon {
  font-variation-settings: 'FILL' 1;
}
</style>
