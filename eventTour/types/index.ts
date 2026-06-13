// Trip Timeline types
export interface TimelineStep {
  id: string
  type: 'flight' | 'hotel' | 'event' | 'return'
  title: string
  subtitle: string
  time: string
  location: string
  status: 'completed' | 'confirmed' | 'pending'
  specialServices?: string[]
  accessibility?: {
    icon: string
    label: string
  }[]
}

// KPI / Readiness Index types
export interface AccessibilityKPI {
  id: string
  name: string
  category: 'airline' | 'hotel' | 'venue'
  percentage: number
  status: 'verified' | 'waiting' | 'ready'
  statusLabel: string
  statusColor: string
}

// Facility details types
export interface FacilityDetail {
  id: string
  location: string
  type: string
  doorWidth: string
  status: 'passed' | 'confirmed' | 'pending'
  icon: string
}

// Search Result Card types
export interface SearchResultCard {
  id: string
  title: string
  type: 'event' | 'hotel' | 'activity'
  image: string
  imageAlt: string
  rating: number
  description: string
  features: string[]
  price: string
  priceUnit?: string
  buttonText: string
  badge: string
  wheelchairFriendly: boolean
}

// Venue/Hotel Detail types
export interface VenueDetail {
  id: string
  name: string
  category: string
  location: string
  price: string
  availability: string
  accessibilityScore: number
  image: string
  imageAlt: string
  description: string
  amenities: string[]
  safetyBadges: string[]
  geminiAnalysis: string
  highlights: string[]
}

// Chat message type
export interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: string
}

// Dashboard section types
export interface DashboardData {
  greeting: string
  tripStatus: string
  timeline: TimelineStep[]
  kpis: AccessibilityKPI[]
  facilities: FacilityDetail[]
}

// Search filter types
export interface AccessibilityFilter {
  id: string
  name: string
  icon: string
  checked: boolean
}
