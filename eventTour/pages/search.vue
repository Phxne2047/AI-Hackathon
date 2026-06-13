<template>
  <div class="bg-surface text-on-surface min-h-screen flex flex-col">
    <!-- TopNavBar (Shared Component) -->
    <header class="bg-surface-container-lowest sticky top-0 z-50 shadow-md">
      <nav class="flex justify-between items-center w-full px-md md:px-xl py-sm max-w-container-max mx-auto h-20">
        <div class="flex items-center gap-lg">
          <span class="font-display text-display text-primary">CareGo Oasis</span>
          <div class="hidden md:flex gap-md">
            <NuxtLink class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors focus-ring px-2 py-1 rounded-lg" to="/">
              Dashboard
            </NuxtLink>
            <NuxtLink class="font-body-md text-body-md text-secondary border-b-2 border-secondary pb-1 focus-ring px-2 rounded-lg" to="/search">
              Search
            </NuxtLink>
            <a class="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors focus-ring px-2 py-1 rounded-lg" href="#">
              Help
            </a>
          </div>
        </div>
        <div class="flex items-center gap-md">
          <button aria-label="Accessibility settings" class="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors focus-ring">
            <span class="material-symbols-outlined">accessibility_new</span>
          </button>
          <button aria-label="Notifications" class="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors focus-ring">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <img
            alt="User profile"
            class="w-10 h-10 rounded-full border-2 border-secondary object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmevlGC6fLh16Ty-ni_prke52oNhy12-HyjZ3JFp6v8SKsdH2hoO_4gT0QESTIgdQqORlen7RbXQ6rAsUkNawiiER4wtPQQUhbqYNVLvWbDUbgzxSQt8Zv--zrxmRYX3_PlHvscwcweJoxUImYtEUQPvV3HbF5lRDykT2HZEf46HH3aOliaJUUUi4WkG7tohOpwjPJz4ZG94DD1pbuHj9hatXY2khY0OSppRp9Hy_OzBG7EHtthnE9N54kr-UXPcpm2PPc-fj1YwO7"
          />
        </div>
      </nav>
    </header>

    <main class="flex-grow max-w-container-max mx-auto w-full px-md md:px-xl py-xl">
      <!-- Search & Switcher Tabs -->
      <section class="mb-xl">
        <div class="flex flex-col md:flex-row gap-lg items-end">
          <div class="flex-grow w-full">
            <h1 class="font-headline-lg text-headline-lg mb-md">ค้นหาประสบการณ์การเดินทางที่เข้าถึงได้</h1>
            <div class="relative w-full">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-outline material-symbols-outlined">search</span>
              <input
                class="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl focus:border-secondary focus:ring-0 transition-all font-body-md text-body-md shadow-sm focus-ring"
                placeholder="ค้นหาจุดหมายปลายทาง กิจกรรม หรือโรงแรม..."
                type="text"
              />
            </div>
          </div>
        </div>
        <!-- Tabs Switcher -->
        <div class="flex flex-wrap gap-md mt-lg">
          <button class="flex-1 min-w-[140px] flex items-center justify-center gap-sm py-4 bg-secondary text-on-secondary rounded-xl font-label-lg shadow-lg focus-ring">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">confirmation_number</span>
            ตั๋วเข้าชม
          </button>
          <button class="flex-1 min-w-[140px] flex items-center justify-center gap-sm py-4 bg-surface-container-lowest text-on-surface-variant hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-all border-2 border-outline-variant rounded-xl font-label-lg focus-ring">
            <span class="material-symbols-outlined">flight</span>
            เที่ยวบิน
          </button>
          <button class="flex-1 min-w-[140px] flex items-center justify-center gap-sm py-4 bg-surface-container-lowest text-on-surface-variant hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-all border-2 border-outline-variant rounded-xl font-label-lg focus-ring">
            <span class="material-symbols-outlined">hotel</span>
            โรงแรม
          </button>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-xl">
        <!-- Accessibility Priority Filter Bar -->
        <aside class="lg:col-span-1">
          <div class="bg-surface-container-lowest p-lg rounded-xl shadow-sm sticky top-28">
            <h2 class="font-headline-md text-headline-md mb-lg">ตัวกรองสิ่งอำนวยความสะดวก</h2>
            <div class="space-y-md">
              <label v-for="filter in searchData.filters" :key="filter.id" class="flex items-center gap-md group cursor-pointer p-sm rounded-lg hover:bg-surface-container transition-colors focus-within:ring-2 focus-within:ring-secondary">
                <input :checked="filter.checked" class="w-6 h-6 rounded custom-checkbox border-2 border-outline-variant focus:ring-0" type="checkbox" />
                <span class="flex items-center gap-sm font-label-lg text-label-lg">
                  <span class="material-symbols-outlined text-secondary">{{ filter.icon }}</span>
                  {{ filter.name }}
                </span>
              </label>
            </div>
            <div class="mt-xl pt-xl border-t border-outline-variant">
              <button class="w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg hover:bg-primary-container transition-colors focus-ring">
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          </div>
        </aside>

        <!-- Visual-Heavy Cards Grid -->
        <section class="lg:col-span-3">
          <div class="flex justify-between items-center mb-lg">
            <p class="font-body-md text-body-md text-on-surface-variant">
              พบทั้งหมด <span class="font-bold text-on-surface">{{ searchData.totalCount }}</span> รายการในประเทศ{{ searchData.location }}
            </p>
            <select class="bg-transparent border-none font-label-lg text-label-lg focus:ring-0 cursor-pointer">
              <option>เรียงตาม: ยอดนิยม</option>
              <option>ราคา: ต่ำไปสูง</option>
              <option>ความเข้าถึง: ดีเยี่ยม</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <article
              v-for="card in searchData.cards"
              :key="card.id"
              class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md flex flex-col group focus-ring border-2 border-transparent hover:border-secondary transition-all"
              tabindex="0"
            >
              <div class="relative h-64">
                <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :src="card.image" :alt="card.imageAlt" />
                <div class="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container px-3 py-1.5 rounded-full flex items-center gap-2 font-label-sm shadow-md">
                  <span class="material-symbols-outlined text-sm">accessible</span>
                  {{ card.badge }}
                </div>
              </div>
              <div class="p-lg flex-grow flex flex-col">
                <div class="flex justify-between items-start mb-sm">
                  <h3 class="font-headline-md text-headline-md">{{ card.title }}</h3>
                  <div class="flex items-center text-secondary">
                    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">star</span>
                    <span class="font-label-lg ml-1">{{ card.rating }}</span>
                  </div>
                </div>
                <p class="text-on-surface-variant font-body-md mb-md line-clamp-2">{{ card.description }}</p>
                <div class="flex flex-wrap gap-sm mb-lg">
                  <span v-for="feature in card.features" :key="feature" class="bg-surface-container px-2 py-1 rounded text-label-sm">
                    {{ feature }}
                  </span>
                </div>
                <div class="mt-auto flex justify-between items-center">
                  <span class="text-secondary font-headline-md">
                    {{ card.price }}<span v-if="card.priceUnit" class="text-label-sm font-normal text-on-surface-variant">{{ card.priceUnit }}</span>
                  </span>
                  <button class="bg-secondary text-on-secondary px-6 py-3 rounded-xl font-label-lg hover:bg-secondary-container transition-colors focus-ring">
                    {{ card.buttonText }}
                  </button>
                </div>
              </div>
            </article>
          </div>

          <!-- Pagination -->
          <div class="mt-xl flex justify-center gap-sm">
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-high hover:bg-outline-variant focus-ring">
              <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary text-on-secondary font-label-lg focus-ring">
              1
            </button>
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-low hover:bg-surface-container-high font-label-lg focus-ring">
              2
            </button>
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-low hover:bg-surface-container-high font-label-lg focus-ring">
              3
            </button>
            <button class="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container-high hover:bg-outline-variant focus-ring">
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer (Shared Component) -->
    <footer class="bg-primary text-on-primary w-full py-xl px-md md:px-xl flex flex-col md:flex-row justify-between items-center gap-lg">
      <div class="flex flex-col gap-sm items-center md:items-start">
        <span class="font-headline-md text-headline-md text-on-primary">CareGo Oasis</span>
        <p class="font-body-md text-body-md text-primary-fixed-dim">© 2024 CareGo Oasis. All rights reserved. Built for accessibility.</p>
      </div>
      <div class="flex flex-wrap justify-center gap-lg">
        <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors focus-ring p-1" href="#">
          Contact Support (SLS)
        </a>
        <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors focus-ring p-1" href="#">
          Accessibility Statement
        </a>
        <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors focus-ring p-1" href="#">
          Privacy Policy
        </a>
        <a class="font-label-sm text-label-sm text-primary-fixed-dim hover:text-on-primary-fixed-variant transition-colors focus-ring p-1" href="#">
          Terms of Service
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const searchData = useSearchResultsData()
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.custom-checkbox:checked {
  background-color: #0051d5;
  border-color: #0051d5;
}

.focus-ring:focus-visible {
  outline: 3px solid #0051d5;
  outline-offset: 2px;
}
</style>
