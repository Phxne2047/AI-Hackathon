import type { SearchResultCard, AccessibilityFilter } from '~/types'

export const useSearchResultsData = () => {
  const cards: SearchResultCard[] = [
    {
      id: 'card-1',
      title: 'Chiang Mai Winter Concert',
      type: 'event',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc4Vdgt0bPLdz25zebZdFXA8W5Qolf1q5C6OuRAtyEO4hZwRYK0KUDx7HrZDS6IXvKIY8jbSztsDdkD3xPYji4zL5m5ftlEpX6iCNZALS6pjWmci9LUyYXW7ZoxLRF7zjj6D9Np-0aM8gePt-2qHkN1SFNTuOOMtCNSfZYGpbgvlyCRKOeSrxwpQN52agNUB0MaespgPb3wWO9174-okKemNk50fBUWOGpCvQNN6mWq0Au25mKeN_bScpJwd-6NcVP7Pxu5hslynXz',
      imageAlt: 'A vibrant outdoor concert in Chiang Mai featuring a modern stage with professional lighting.',
      rating: 4.9,
      description: 'คอนเสิร์ตท่ามกลางลมหนาวที่เชียงใหม่ พร้อมพื้นที่พิเศษสำหรับผู้ใช้รถเข็นและล่ามภาษามือตลอดงาน',
      features: ['ทางลาด', 'ล่ามภาษามือ'],
      price: '฿1,200',
      buttonText: 'จองตั๋ว',
      badge: 'Wheelchair Friendly',
      wheelchairFriendly: true,
    },
    {
      id: 'card-2',
      title: 'Oasis Boutique Resort',
      type: 'hotel',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK8FhCKdsg21srGwhocLX2YxKqYhuA_EnPZfdB_NJfGaBkesiHocMYXJ0IyuVmdlTSB7XJ_xdxpiHCJrhpnRlGOgN2busPZZ9GjhZtBv7EeoaGRB0-9aN3PHopd2VNkzuW_drkaPP6ZEj12BHi5CROPxCSZPX4jsAhluTUxPEfX3BfPyccgqjVwvmIEeke3hygNVdAA-CX5PtnRs4n4K8afiK6iE5Y3U7jiwpOmu_NyeqmGKy8_LmqFjwmct4ezB3McMuHqeJYZNoh',
      imageAlt: 'A luxury boutique hotel exterior in a lush tropical garden setting in Thailand.',
      rating: 4.8,
      description: 'โรงแรมระดับพรีเมียมที่ออกแบบมาเพื่อความเท่าเทียม ห้องพักกว้างขวางและสิ่งอำนวยความสะดวกครบครัน',
      features: ['ห้องน้ำกว้างพิเศษ', 'ปุ่มขอความช่วยเหลือ'],
      price: '฿3,500',
      priceUnit: '/คืน',
      buttonText: 'ดูห้องว่าง',
      badge: 'Wheelchair Friendly',
      wheelchairFriendly: true,
    },
    {
      id: 'card-3',
      title: 'Bangkok Modern Art Tour',
      type: 'activity',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoRl9q5NqbgLpRCDOY9KrUYtm6-gruaNlKCnGbMyJZ74KnOyDuzp-kBPKC9kpPtwosWbh0WajlRpDOjL1uULnL8GP8fyzRXMg-4hBYvBf73_LXG9yL--EBDNmRyW7OetYtj5px0-I9uhoWM5ccP4c7ZGJGwO-gr59iq7_SniqvL2obiZMM45QPDABNSSZXhCDLoSmIuO8utF6iQKKvXODG6rOcLOm9O-VCLyskHHLRhNo7Wf6uceyP7sf8KFS3ksn-YdegTQs_0s1K',
      imageAlt: 'A modern art museum interior with vast, airy white spaces and smooth polished floors.',
      rating: 4.7,
      description: 'ทัวร์หอศิลป์สมัยใหม่พร้อมรถรับส่งที่รองรับรถเข็นไฟฟ้า และไกด์ที่ผ่านการอบรมพิเศษ',
      features: ['รถรับส่งคนพิการ', 'เครื่องบรรยายเสียง'],
      price: '฿850',
      buttonText: 'จองทัวร์',
      badge: 'Wheelchair Friendly',
      wheelchairFriendly: true,
    },
    {
      id: 'card-4',
      title: 'Phuket Accessible Beach Club',
      type: 'event',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl7Y8jCZ5XagyDZ7dTWTy03y3nGzM5mPpzJrvq9SCVFUNrs6Cw8T9YLt7YtwbKZ2903h4UT29I3zkKy0xvf_ANKEpxo91BvcjKFLMIz8J3p-O4PlMhOsCYps7OkLYTEDTX0ASk9ErOnU2qcsGPngmjJQJpMIRROewkdk3FdnVsk2rD_rlwsJ6hLfLAJ0FxEQjUDvczgwVlJ4w2Vf0wMOC9U-ZzEdF4tVx0CtoPN3Dz_n_0TY1NHoRyxE5BalYW4q_YiJl2X9U-cCPA',
      imageAlt: 'A clean, modern beach club deck with high-contrast furniture and a specialized aquatic wheelchair ready for use.',
      rating: 5.0,
      description: 'สัมผัสหาดทรายขาวด้วยรถเข็นสะเทินน้ำสะเทินบก พร้อมสิ่งอำนวยความสะดวกมาตรฐานสากล',
      features: ['รถเข็นชายหาด', 'ทางลาดลงน้ำ'],
      price: '฿1,500',
      buttonText: 'จองวันพักผ่อน',
      badge: 'Wheelchair Friendly',
      wheelchairFriendly: true,
    },
  ]

  const filters: AccessibilityFilter[] = [
    {
      id: 'filter-1',
      name: 'ทางลาดสำหรับรถเข็น',
      icon: 'accessible',
      checked: false,
    },
    {
      id: 'filter-2',
      name: 'ล่ามภาษามือ',
      icon: 'sign_language',
      checked: false,
    },
    {
      id: 'filter-3',
      name: 'บริการขนส่งที่เข้าถึงได้',
      icon: 'accessible_forward',
      checked: true,
    },
    {
      id: 'filter-4',
      name: 'ระบบช่วยเหลือการฟัง',
      icon: 'volume_up',
      checked: false,
    },
  ]

  return {
    cards,
    filters,
    totalCount: 128,
    location: 'ไทย',
  }
}
