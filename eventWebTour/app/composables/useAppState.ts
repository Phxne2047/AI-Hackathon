import { ref, computed } from 'vue'
import type { User, Event, Flight, Hotel, LocationInfo, Review, Transaction, Booking } from '~/types'

// Import JSON data from root data folder
import usersData from '~/../data/users.json'
import eventsData from '~/../data/events.json'
import flightsData from '~/../data/flights.json'
import hotelsData from '~/../data/hotels.json'
import locationsData from '~/../data/locations.json'
import reviewsData from '~/../data/reviews.json'
import transactionsData from '~/../data/transactions.json'

// Haversine formula for calculating distance in km between two lat/lng coordinates
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

export const useAppState = () => {
  // Static lists loaded from JSON
  const users = ref<User[]>(usersData as User[])
  const events = ref<Event[]>(eventsData as Event[])
  const flights = ref<Flight[]>(flightsData as Flight[])
  const hotels = ref<Hotel[]>(hotelsData as Hotel[])
  const locations = ref<LocationInfo[]>(locationsData as LocationInfo[])
  const reviews = ref<Review[]>(reviewsData as Review[])
  const transactions = ref<Transaction[]>(transactionsData as Transaction[])

  // Active User State
  const currentUserId = ref<string>('u001') // Default: Somchai Jaidee (mapped to "คุณนัท")
  
  const currentUser = computed<User>(() => {
    return users.value.find(u => u.user_id === currentUserId.value) || users.value[0]
  })

  // Selections for the Active booking journey
  const selectedEvent = ref<Event | null>(null)
  const selectedFlight = ref<Flight | null>(null)
  const selectedHotel = ref<Hotel | null>(null)
  const nights = ref<number>(2)
  const appliedPoints = ref<number>(0)
  const specialSeating = ref<string>('')
  const specialNeeds = ref<string>('')

  // Confirmed Bookings list
  const bookings = ref<Booking[]>([
    {
      booking_id: 'b-mock-1',
      user_id: 'u001',
      event: {
        event_id: 'ev-028',
        title: 'งานคอนเสิร์ตดนตรีในสวน (Design Week)',
        date: '2026-11-27T18:00:00Z',
        location: 'Chiang Mai Hall',
        ticket_price: 1500,
        accessibility_features: ['wheelchair_ramp', 'sign_interpreter']
      },
      flight_arrival: {
        flight_id: 'fl-arr-ev28',
        airline: 'Thai Sky (TG102)',
        origin: 'BKK',
        destination: 'CNX',
        departure_time: '2026-11-26T08:30:00Z',
        price: 1400,
        buffer_time_hours: 3,
        assistance_services: ['รถเข็นวีลแชร์ Cabin Chair', 'พนักงานดูแลที่ประตูเครื่อง']
      },
      flight_departure: null,
      hotel: {
        hotel_id: 'h-003',
        name: 'โรงแรม โอเอซิส (Lanna Boutique)',
        location: 'Chiang Mai',
        rating: 4.7,
        price_per_night: 1800,
        amenities: ['Wifi', 'Breakfast', 'Garden'],
        universal_design_amenities: ['grab_bars', 'emergency_button']
      },
      nights: 2,
      event_ticket_qty: 1,
      special_seating_selected: 'โซนวีลแชร์แถวหน้าสุด (A1)',
      special_needs_selected: 'ห้องพักสำหรับผู้ใช้วีลแชร์ ชั้น G ห้อง 104',
      total_cost: 6500,
      points_applied: 0,
      final_price: 6500,
      status: 'confirmed',
      created_at: new Date().toISOString(),
      readiness: {
        flight: 100,
        hotel: 80,
        venue: 90
      },
      facility_details: [
        { name: 'สนามบินสุวรรณภูมิ', type: 'ห้องน้ำคนพิการ', size: '90 ซม.', status: 'pass' },
        { name: 'โรงแรม โอเอซิส', type: 'ทางลาดเข้าอาคาร', size: '120 ซม.', status: 'pass' },
        { name: 'เชียงใหม่ฮอลล์', type: 'ลิฟต์โดยสาร', size: '110 ซม.', status: 'pass' },
        { name: 'รถรับจ้างส่วนตัว', type: 'รถตู้มีลิฟต์ยก', size: 'N/A', status: 'pending' }
      ]
    }
  ])

  // Get active bookings for current user
  const currentUserBookings = computed(() => {
    return bookings.value.filter(b => b.user_id === currentUserId.value)
  })

  // Calculate wallet transactions
  const walletTransactions = computed(() => {
    return transactions.value.filter(t => t.user_id === currentUserId.value)
  })

  // Calculate wallet balance
  const walletBalance = computed(() => {
    let balance = 0
    walletTransactions.value.forEach(t => {
      if (t.type === 'INCOME') {
        balance += t.amount
      } else {
        balance -= t.amount
      }
    })
    return balance
  })

  // Regular rent payment
  const monthlyRent = computed(() => {
    const rentTx = walletTransactions.value.find(t => t.category.toLowerCase() === 'rent')
    return rentTx ? rentTx.amount : 0
  })

  // Select user profile method
  const selectUser = (userId: string) => {
    currentUserId.value = userId
    // Reset selections on user switch
    selectedEvent.value = null
    selectedFlight.value = null
    selectedHotel.value = null
    nights.value = 2
    appliedPoints.value = 0
    specialSeating.value = ''
    specialNeeds.value = ''
  }

  // Create booking method
  const confirmBooking = () => {
    if (!selectedEvent.value) return null

    const ticketPrice = selectedEvent.value.ticket_price
    const flightCost = (selectedFlight.value?.price || 0)
    const hotelCost = (selectedHotel.value?.price_per_night || 0) * nights.value
    const total = ticketPrice + flightCost + hotelCost
    const final = total - appliedPoints.value

    // Deduct points
    const userIndex = users.value.findIndex(u => u.user_id === currentUserId.value)
    if (userIndex !== -1) {
      users.value[userIndex].loyalty_points -= appliedPoints.value
    }

    // Determine facility details based on selected features
    const facility_details: Booking['facility_details'] = [
      { name: 'สนามบินหลัก', type: 'ห้องน้ำคนพิการ', size: '90 ซม.', status: 'pass' }
    ]
    if (selectedHotel.value?.universal_design_amenities?.length) {
      facility_details.push({
        name: selectedHotel.value.name,
        type: 'สิ่งอำนวยความสะดวกการเข้าถึง',
        size: selectedHotel.value.universal_design_amenities.join(', '),
        status: 'pass'
      })
    }
    facility_details.push({
      name: selectedEvent.value.location,
      type: 'ทางลาด/ลิฟต์/การล็อกโควตา',
      size: selectedEvent.value.accessibility_features?.join(', ') || 'N/A',
      status: 'pass'
    })

    const newBooking: Booking = {
      booking_id: 'b-' + Math.random().toString(36).substr(2, 9),
      user_id: currentUserId.value,
      event: selectedEvent.value,
      flight_arrival: selectedFlight.value,
      flight_departure: null,
      hotel: selectedHotel.value,
      nights: nights.value,
      event_ticket_qty: 1,
      special_seating_selected: specialSeating.value || 'โซนคนพิการทั่วไป',
      special_needs_selected: specialNeeds.value || 'บริการทั่วไป',
      total_cost: total,
      points_applied: appliedPoints.value,
      final_price: final,
      status: 'confirmed',
      created_at: new Date().toISOString(),
      readiness: {
        flight: selectedFlight.value ? 100 : 0,
        hotel: selectedHotel.value ? 100 : 0,
        venue: 100
      },
      facility_details
    }

    bookings.value.push(newBooking)

    // Deduct final trip cost from wallet transactions (as a simulation)
    transactions.value.push({
      txn_id: 'tx-trip-' + Math.random().toString(36).substr(2, 9),
      user_id: currentUserId.value,
      type: 'EXPENSE',
      category: 'Travel',
      amount: final,
      date: new Date().toISOString(),
      note: `ทริปสำหรับงาน ${selectedEvent.value.title}`
    })

    // Reset selections
    selectedEvent.value = null
    selectedFlight.value = null
    selectedHotel.value = null
    nights.value = 2
    appliedPoints.value = 0
    specialSeating.value = ''
    specialNeeds.value = ''

    return newBooking
  }

  return {
    users,
    events,
    flights,
    hotels,
    locations,
    reviews,
    transactions,
    currentUser,
    currentUserId,
    selectedEvent,
    selectedFlight,
    selectedHotel,
    nights,
    appliedPoints,
    specialSeating,
    specialNeeds,
    bookings,
    currentUserBookings,
    walletTransactions,
    walletBalance,
    monthlyRent,
    selectUser,
    confirmBooking
  }
}
