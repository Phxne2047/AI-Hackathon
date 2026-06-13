import type { VenueDetail, ChatMessage } from '~/types'

export const useVenueDetailData = (): VenueDetail => {
  return {
    id: 'venue-1',
    name: 'เดอะ แกรนด์ โอเอซิส รีสอร์ท',
    category: 'โรงแรมระดับ 5 ดาว',
    location: 'กรุงเทพมหานคร, ประเทศไทย',
    price: '฿4,500',
    availability: 'ต.ค. 2024',
    accessibilityScore: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqmsZbvKzAb_heth-nTJFgHUEYz1_sg8BldkdfGk6QF-0fDMMLI0-IAqgcMMRT561hxm3GHiFi6qkZArJGAG6ctAFRosZeyMN1RzM8Ri4K5DqS_UMKRBmRZ29R_PPddfWVK55w8fQuhAUtzhm_aMaF18InBI3zQV7Q-8GgF8jkixq5Z1CqhNH54OeAlVdsmn5wLYuQwqtR1-E_73iSykx6ZMHIttMIl23g9gkmWJ4nCYwNAtFjbYPnxSY4qS-h6pcofuqyhN7pvLFl',
    imageAlt: 'A luxury sustainable hotel exterior featuring wide smooth stone pathways and elegant wooden ramps integrated into lush tropical landscaping.',
    description: 'สัมผัสประสบการณ์การพักผ่อนที่ไร้ขีดจำกัดที่ เดอะ แกรนด์ โอเอซิส รีสอร์ท เราออกแบบทุกพื้นที่โดยยึดหลัก Universal Design เพื่อให้แขกทุกท่านเข้าถึงความสะดวกสบายได้อย่างเท่าเทียม ไม่ว่าจะเป็นทางลาดที่มีความลาดชันต่ำเป็นพิเศษ ลิฟต์ขนาดใหญ่ และบริการรถรับส่งที่รองรับรถเข็นวีลแชร์',
    amenities: [
      'ทางลาดมาตรฐาน',
      'อักษรเบรลล์ในลิฟต์',
      'บริการสุนัขนำทาง',
      'ห้องพักปรับปรุงใหม่ กว้างขวาง 100%',
      'สระว่ายน้ำมีระบบลิฟต์ช่วยลงน้ำ',
    ],
    safetyBadges: [
      'พยาบาล 24 ชม.',
      'ระบบแจ้งเตือนไฟไหม้แบบสั่น',
    ],
    geminiAnalysis: 'จากการวิเคราะห์รีวิวจากผู้ใช้งานรถเข็นจริง: ทางลาดเข้าโรงแรมมีความลาดชันเล็กน้อย (ประมาณ 8 องศา) หากใช้รถเข็นแบบปรับมืออาจต้องใช้แรงเพิ่มขึ้น หรือสามารถกดเรียกเจ้าหน้าที่มาช่วยเข็นได้ทันทีจากจุด Drop-off',
    highlights: [
      'ห้องพักปรับปรุงใหม่ กว้างขวาง 100%',
      'สระว่ายน้ำมีระบบลิฟต์ช่วยลงน้ำ',
    ],
  }
}

export const useChatMessages = (): ChatMessage[] => {
  return [
    {
      id: 'msg-1',
      type: 'bot',
      text: 'สวัสดีค่ะ! ดิฉันเป็น AI ผู้ช่วยส่วนตัวของคุณ ต้องการทราบข้อมูลความสะดวกด้านใดของรีสอร์ทนี้เพิ่มเติมไหมคะ?',
      timestamp: '10:30 น.',
    },
  ]
}
