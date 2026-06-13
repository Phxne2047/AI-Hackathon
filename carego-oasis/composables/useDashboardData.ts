import type { TimelineStep, AccessibilityKPI, FacilityDetail, DashboardData } from '~/types'

export const useDashboardData = (): DashboardData => {
  const timelineSteps: TimelineStep[] = [
    {
      id: 'flight-1',
      type: 'flight',
      title: 'เที่ยวบินไปเชียงใหม่ (TG102)',
      subtitle: '08:30 - 09:45 | สนามบินสุวรรณภูมิ',
      time: '08:30 - 09:45',
      location: 'สนามบินสุวรรณภูมิ',
      status: 'completed',
      specialServices: ['รถเข็นวีลแชร์ Cabin Chair พร้อมพนักงานดูแล'],
      accessibility: [
        { icon: 'accessible', label: 'ทางลาดสำหรับรถเข็น' },
        { icon: 'elevator', label: 'ลิฟต์พร้อมใช้' },
      ],
    },
    {
      id: 'hotel-1',
      type: 'hotel',
      title: 'เช็คอิน โรงแรม โอเอซิส',
      subtitle: '14:00 | ตัวเมืองเชียงใหม่',
      time: '14:00',
      location: 'ตัวเมืองเชียงใหม่',
      status: 'completed',
      specialServices: ['ห้องพักสำหรับผู้ใช้วีลแชร์: ชั้น G ห้อง 104'],
    },
    {
      id: 'event-1',
      type: 'event',
      title: 'งานคอนเสิร์ตดนตรีในสวน',
      subtitle: '18:00 | ลานกิจกรรมใจกลางเมือง',
      time: '18:00',
      location: 'ลานกิจกรรมใจกลางเมือง',
      status: 'confirmed',
      accessibility: [
        { icon: 'accessible', label: 'โซนวีลแชร์แถวหน้าสุด (A1)' },
      ],
    },
    {
      id: 'return-1',
      type: 'return',
      title: 'เที่ยวบินขากลับ (TG115)',
      subtitle: 'วันอาทิตย์ | 19:30',
      time: '19:30',
      location: 'สนามบินสุวรรณภูมิ',
      status: 'pending',
    },
  ]

  const kpis: AccessibilityKPI[] = [
    {
      id: 'airline-kpi',
      name: 'สายการบิน',
      category: 'airline',
      percentage: 100,
      status: 'verified',
      statusLabel: 'ยืนยันแล้ว',
      statusColor: 'text-green-600',
    },
    {
      id: 'hotel-kpi',
      name: 'ที่พัก',
      category: 'hotel',
      percentage: 80,
      status: 'waiting',
      statusLabel: 'รอรูปถ่ายห้องน้ำ',
      statusColor: 'text-on-surface-variant',
    },
    {
      id: 'venue-kpi',
      name: 'สถานที่จัดงาน',
      category: 'venue',
      percentage: 90,
      status: 'ready',
      statusLabel: 'พร้อมเข้าใช้',
      statusColor: 'text-green-600',
    },
  ]

  const facilities: FacilityDetail[] = [
    {
      id: 'facility-1',
      location: 'สนามบินสุวรรณภูมิ',
      type: 'ห้องน้ำคนพิการ',
      doorWidth: '90 ซม.',
      status: 'passed',
      icon: 'check_circle',
    },
    {
      id: 'facility-2',
      location: 'โรงแรม โอเอซิส',
      type: 'ทางลาดเข้าอาคาร',
      doorWidth: '120 ซม.',
      status: 'passed',
      icon: 'check_circle',
    },
    {
      id: 'facility-3',
      location: 'เชียงใหม่ฮอลล์',
      type: 'ลิฟต์โดยสาร',
      doorWidth: '110 ซม.',
      status: 'passed',
      icon: 'check_circle',
    },
    {
      id: 'facility-4',
      location: 'รถรับจ้างส่วนตัว',
      type: 'รถตู้มีลิฟต์ยก',
      doorWidth: 'N/A',
      status: 'confirmed',
      icon: 'pending',
    },
  ]

  return {
    greeting: 'สวัสดีครับ คุณนัท',
    tripStatus: 'เตรียมความพร้อมสำหรับการเดินทางไปเชียงใหม่ ข้อมูลทั้งหมดได้รับการตรวจสอบสถานะการเข้าถึง (Accessibility) เรียบร้อยแล้ว',
    timeline: timelineSteps,
    kpis,
    facilities,
  }
}
