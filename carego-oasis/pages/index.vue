<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <!-- TopNavBar -->
    <header class="bg-surface-container-lowest shadow-md sticky top-0 z-50">
      <div class="flex justify-between items-center w-full px-md md:px-xl py-sm max-w-container-max mx-auto">
        <div class="flex items-center gap-md">
          <span class="font-display text-display text-primary">CareGo Oasis</span>
        </div>
        <nav class="hidden md:flex gap-lg items-center">
          <NuxtLink
            to="/"
            class="font-label-lg text-label-lg text-secondary border-b-2 border-secondary pb-1 focus-ring"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/search"
            class="font-label-lg text-label-lg text-on-surface-variant hover:text-secondary transition-colors focus-ring"
          >
            Search
          </NuxtLink>
          <a
            href="#"
            class="font-label-lg text-label-lg text-on-surface-variant hover:text-secondary transition-colors focus-ring"
          >
            Help
          </a>
        </nav>
        <div class="flex items-center gap-md">
          <button aria-label="การตั้งค่าการเข้าถึง" class="p-sm rounded-full hover:bg-surface-container focus-ring">
            <span class="material-symbols-outlined text-secondary">accessibility_new</span>
          </button>
          <button aria-label="การแจ้งเตือน" class="p-sm rounded-full hover:bg-surface-container focus-ring">
            <span class="material-symbols-outlined text-secondary">notifications</span>
          </button>
          <div class="w-10 h-10 rounded-full bg-secondary-fixed overflow-hidden border-2 border-secondary">
            <img
              alt="User profile with accessibility settings"
              class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvy43jsR-7fGlzAmTM3zctQcec6W0Xbzn5DdeySdQKynFumpfxNWFfuMbQ1_v6Ta7Z9B5f0w5Y3h6K6x8JWDxw8BaFI7BOKZ08Cs5_UBEpJvt7ig-PpJAkuayEakjL3IA8YbIJGI3hjzc_K72wb6_V5cex7Bvhc9aMMHp2Nnm3pto17b4FpPfYYoJ9XoTWX_Kj1Lllcv4FL-BxDZ5Wq5w0iYML0pGZc5tKmumm4HheMB-ICNV4xI_YmUq0yn-ZPL1oNkmITk5SvVRL"
            />
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-container-max mx-auto px-md md:px-xl py-xl space-y-xxl flex-grow w-full">
      <!-- Welcome Section -->
      <section class="flex flex-col md:flex-row justify-between items-end gap-lg">
        <div>
          <h1 class="font-display text-display text-primary mb-sm">{{ data.greeting }}</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{{ data.tripStatus }}</p>
        </div>
        <div class="flex gap-md">
          <span class="px-lg py-sm bg-tertiary-fixed text-on-tertiary-fixed rounded-xl flex items-center gap-sm font-label-lg">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">verified</span>
            ตรวจสอบแล้ว 100%
          </span>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        <!-- Dynamic Combined Timeline -->
        <aside class="lg:col-span-5 space-y-lg">
          <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
            <span class="material-symbols-outlined">route</span>
            แผนการเดินทาง
          </h2>
          <div class="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] relative overflow-hidden">
            <div class="absolute left-[39px] top-lg bottom-lg w-1 bg-outline-variant rounded-full"></div>
            <ul class="space-y-xl relative z-10">
              <li v-for="step in data.timeline" :key="step.id" class="flex gap-lg items-start" :class="{ 'opacity-60': step.status === 'pending' }">
                <div
                  class="z-20 flex-shrink-0 w-12 h-12 rounded-full text-white flex items-center justify-center shadow-md"
                  :class="step.status === 'pending' ? 'bg-outline-variant' : 'bg-secondary'"
                >
                  <span class="material-symbols-outlined">{{ getStepIcon(step.type) }}</span>
                </div>
                <div class="flex-grow pt-sm">
                  <div class="flex justify-between items-start mb-xs">
                    <h3 class="font-label-lg text-label-lg text-primary">{{ step.title }}</h3>
                    <span
                      class="text-xs px-sm py-xs rounded font-bold"
                      :class="step.status === 'completed' ? 'bg-green-100 text-green-800' : step.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-surface-container-high text-on-surface-variant'"
                    >
                      {{ getStatusLabel(step.status) }}
                    </span>
                  </div>
                  <p class="font-body-md text-body-md text-on-surface-variant">{{ step.subtitle }}</p>
                  <div v-if="step.specialServices" class="mt-md p-md bg-surface-container rounded-lg border-l-4 border-secondary">
                    <p class="text-sm font-bold text-secondary">บริการพิเศษ:</p>
                    <p class="text-sm text-on-surface">{{ step.specialServices[0] }}</p>
                  </div>
                  <div v-if="step.accessibility" class="flex gap-sm mt-sm">
                    <span v-for="a in step.accessibility" :key="a.label" class="flex items-center gap-xs text-secondary text-sm">
                      <span class="material-symbols-outlined text-sm">{{ a.icon }}</span>
                      <span class="text-on-surface">{{ a.label }}</span>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Main Content Area -->
        <div class="lg:col-span-7 space-y-xl">
          <!-- Accessibility Index Chart / KPI Section -->
          <section class="space-y-lg">
            <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-sm">
              <span class="material-symbols-outlined">analytics</span>
              ดัชนีความพร้อม (Trip Readiness)
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div v-for="kpi in data.kpis" :key="kpi.id" class="bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_12px_rgba(15,23,42,0.08)] border-t-4 border-secondary text-center">
                <p class="font-label-lg text-label-lg text-on-surface-variant mb-md">{{ kpi.name }}</p>
                <div class="relative inline-flex items-center justify-center">
                  <svg class="w-24 h-24 transform -rotate-90">
                    <circle class="text-surface-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" stroke-width="8"></circle>
                    <circle
                      class="text-secondary"
                      cx="48"
                      cy="48"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      :stroke-dasharray="`${251.2 * (kpi.percentage / 100)}, 251.2`"
                      stroke-width="8"
                    ></circle>
                  </svg>
                  <span class="absolute font-headline-md text-headline-md text-primary">{{ kpi.percentage }}%</span>
                </div>
                <p class="mt-md text-sm font-bold" :class="kpi.statusColor">{{ kpi.statusLabel }}</p>
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
              <table aria-label="ตารางรายละเอียดสิ่งอำนวยความสะดวก" class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-primary text-white">
                    <th class="px-lg py-md font-label-lg">สถานที่</th>
                    <th class="px-lg py-md font-label-lg">ประเภท</th>
                    <th class="px-lg py-md font-label-lg">ความกว้างประตู</th>
                    <th class="px-lg py-md font-label-lg">สถานะ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant">
                  <tr v-for="(facility, index) in data.facilities" :key="facility.id" :class="index % 2 === 0 ? 'hover:bg-surface-container-low' : 'bg-surface-container-low hover:bg-surface-container'"
                    class="transition-colors">
                    <td class="px-lg py-md font-body-md text-primary">{{ facility.location }}</td>
                    <td class="px-lg py-md font-body-md">{{ facility.type }}</td>
                    <td class="px-lg py-md font-body-md">{{ facility.doorWidth }}</td>
                    <td class="px-lg py-md font-body-md">
                      <span
                        class="flex items-center gap-xs font-bold"
                        :class="facility.status === 'passed' ? 'text-green-700' : 'text-on-surface-variant'"
                      >
                        <span class="material-symbols-outlined text-sm">{{ facility.icon }}</span>
                        {{ facility.status === 'passed' ? 'ผ่าน' : 'ยืนยันแล้ว' }}
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
                <button class="mt-md bg-on-secondary-container text-secondary px-lg py-sm rounded-lg font-bold hover:bg-white transition-all focus-ring">
                  โทรหาเรา
                </button>
              </div>
              <span class="material-symbols-outlined text-[64px] opacity-30">support_agent</span>
            </div>
            <div class="bg-tertiary-container text-on-tertiary-container p-lg rounded-xl flex items-center justify-between shadow-md">
              <div class="space-y-sm">
                <h3 class="font-headline-md text-headline-md">ประวัติสุขภาพ</h3>
                <p class="font-body-md">ข้อมูลยาและแพ้ยาสำหรับเหตุฉุกเฉิน</p>
                <button class="mt-md bg-on-tertiary-container text-tertiary-container px-lg py-sm rounded-lg font-bold hover:bg-white transition-all focus-ring">
                  ดูข้อมูล
                </button>
              </div>
              <span class="material-symbols-outlined text-[64px] opacity-30">medical_services</span>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-primary dark:bg-primary-container text-on-primary">
      <div class="w-full py-xl px-md md:px-xl flex flex-col md:flex-row justify-between items-center gap-lg max-w-container-max mx-auto">
        <div class="space-y-sm text-center md:text-left">
          <span class="font-headline-md text-headline-md text-on-primary block">CareGo Oasis</span>
          <p class="font-body-md text-body-md opacity-80">© 2024 CareGo Oasis. All rights reserved. Built for accessibility.</p>
        </div>
        <div class="flex flex-wrap justify-center gap-lg">
          <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors focus-ring" href="#">
            Contact Support (SLS)
          </a>
          <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors focus-ring" href="#">
            Accessibility Statement
          </a>
          <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors focus-ring" href="#">
            Privacy Policy
          </a>
          <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors focus-ring" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>

    <!-- Mobile Floating Action Button -->
    <button aria-label="ขอความช่วยเหลือด่วน" class="fixed bottom-lg right-lg w-14 h-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center md:hidden focus-ring z-[60]">
      <span class="material-symbols-outlined">sos</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TimelineStep } from '~/types'

const data = useDashboardData()

const getStepIcon = (type: TimelineStep['type']): string => {
  const icons: Record<string, string> = {
    flight: 'flight_takeoff',
    hotel: 'hotel',
    event: 'confirmation_number',
    return: 'flight_land',
  }
  return icons[type] || 'place'
}

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    completed: 'ปลอดภัย',
    confirmed: 'ปลอดภัย',
    pending: 'รอดำเนินการ',
  }
  return labels[status] || status
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
