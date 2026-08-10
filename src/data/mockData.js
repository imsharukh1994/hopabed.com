// Mock Dataset for BedHopper Prototype

export const INITIAL_DESTINATIONS = [
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', priceFrom: 2, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80' },
  { id: 'mexico-city', name: 'Mexico City', country: 'Mexico', priceFrom: 5, image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=600&q=80' },
  { id: 'lisbon', name: 'Lisbon', country: 'Portugal', priceFrom: 4, image: 'https://images.unsplash.com/photo-1513672494107-cd9d848a38a2?auto=format&fit=crop&w=600&q=80' },
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey', priceFrom: 3, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', priceFrom: 2, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', priceFrom: 2, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80' }
];

export const INITIAL_LISTINGS = [
  {
    id: 'bh-101',
    title: 'Cozy couch in Sukhumvit',
    city: 'Bangkok',
    country: 'Thailand',
    address: 'Soi 23, Sukhumvit Road',
    distFromCenter: '3.2 km',
    lat: 13.736717,
    lng: 100.560411,
    pricePerNight: 5,
    currency: '$',
    type: 'couch',
    typeLabel: 'Couch / Shared Space',
    rating: 4.8,
    reviewsCount: 23,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c5163?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-anna',
      name: 'Anna Schmidt',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '98%',
      joinedDate: 'Feb 2022',
      bio: 'Digital nomad & travel enthusiast living in Bangkok for 3 years. Love meeting backpackers and sharing local insider tips!'
    },
    amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Air Conditioning', 'Essentials', 'Hair Dryer'],
    houseRules: ['No smoking inside', 'Quiet hours 11 PM - 7 AM', 'Shoes off at door'],
    available: true,
    isServiceShare: false
  },
  {
    id: 'bh-102',
    title: 'Wanderlust Hostel - Dorm Bed',
    city: 'Bangkok',
    country: 'Thailand',
    address: 'Khao San Road',
    distFromCenter: '1.1 km',
    lat: 13.758887,
    lng: 100.497223,
    pricePerNight: 7,
    currency: '$',
    type: 'dorm',
    typeLabel: 'Shared Dorm Bed',
    rating: 4.5,
    reviewsCount: 87,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-mark',
      name: 'Mark Miller (Wanderlust Staff)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '99%',
      joinedDate: 'Jan 2021',
      bio: 'Official manager of Wanderlust Hostel Bangkok. We provide secure lockers, hot showers, and free morning coffee.'
    },
    amenities: ['Wi-Fi', 'Breakfast Included', 'Personal Locker', 'Hot Shower', 'Bar'],
    houseRules: ['Keycard deposit required ($5)', 'Respect fellow dorm mates'],
    available: true,
    isServiceShare: false
  },
  {
    id: 'bh-103',
    title: 'Sunny private room near BTS',
    city: 'Bangkok',
    country: 'Thailand',
    address: 'Phra Khanong, Bangkok',
    distFromCenter: '2.0 km',
    lat: 13.714201,
    lng: 100.591244,
    pricePerNight: 9,
    currency: '$',
    type: 'private',
    typeLabel: 'Private Room',
    rating: 4.7,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-mai',
      name: 'Mai Thanakorn',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: false,
      responseRate: '95%',
      joinedDate: 'Aug 2023',
      bio: 'Local university teacher renting out an extra bedroom to respectful travelers.'
    },
    amenities: ['Wi-Fi', 'Air Conditioning', 'Kitchen', 'Private Lock'],
    houseRules: ['No parties', 'Keep kitchen clean'],
    available: true,
    isServiceShare: false
  },
  {
    id: 'bh-104',
    title: 'Service-Share Bed (Dog Walking & Reception)',
    city: 'Bangkok',
    country: 'Thailand',
    address: 'Ari Neighborhood',
    distFromCenter: '0.9 km',
    lat: 13.779762,
    lng: 100.544778,
    pricePerNight: 0,
    currency: '$',
    type: 'service-share',
    typeLabel: 'Service-Share Stay',
    rating: 4.9,
    reviewsCount: 12,
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-tom',
      name: 'Tom Holland',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '100%',
      joinedDate: 'Nov 2022',
      bio: 'Expat working remotely with a golden retriever. Offering free comfortable bed in exchange for 45 mins daily dog walking!'
    },
    serviceShareDetails: {
      taskDescription: 'Walk Golden Retriever twice a day (30 mins total) + water balcony plants.',
      hoursPerDay: '0.5 hrs/day',
      depositRequired: '$20 refundable deposit',
      prohibitedTasks: 'No heavy manual labor or hazardous cleaning.'
    },
    amenities: ['Free Accommodation', 'Wi-Fi', 'Pet Friendly', 'Balcony', 'Kitchen Access'],
    houseRules: ['Must love dogs!', 'Clear daily task communication'],
    available: true,
    isServiceShare: true
  },
  {
    id: 'bh-105',
    title: 'Condo guest alcove in Roma Norte',
    city: 'Mexico City',
    country: 'Mexico',
    address: 'Calle Colima, Roma Norte',
    distFromCenter: '1.5 km',
    lat: 19.419444,
    lng: -99.162778,
    pricePerNight: 6,
    currency: '$',
    type: 'couch',
    typeLabel: 'Couch / Shared Space',
    rating: 4.9,
    reviewsCount: 44,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-carlos',
      name: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '97%',
      joinedDate: 'Mar 2022',
      bio: 'Architect based in CDMX. Love sharing Mexican culture, street taco spots, and art gallery recommendations.'
    },
    amenities: ['Wi-Fi', 'Espresso Machine', 'Kitchen', 'Rooftop Patio'],
    houseRules: ['Respect common space', 'No smoking'],
    available: true,
    isServiceShare: false
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'BH-202608100412',
    listingId: 'bh-101',
    listingTitle: 'Cozy couch in Sukhumvit',
    guestName: 'John Doe',
    guestAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    hostName: 'Anna Schmidt',
    checkIn: '12 Aug 2026',
    checkOut: '14 Aug 2026',
    nights: 2,
    guests: 1,
    nightlyPrice: 5.00,
    subtotal: 10.00,
    serviceFee: 0.80,
    totalPrice: 10.80,
    status: 'Confirmed',
    paymentStatus: 'Paid via Stripe Connect',
    createdDate: '10 Aug 2026'
  },
  {
    id: 'BH-202608100415',
    listingId: 'bh-104',
    listingTitle: 'Service-Share Bed (Dog Walking)',
    guestName: 'Maria Garcia',
    guestAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    hostName: 'Tom Holland',
    checkIn: '15 Aug 2026',
    checkOut: '18 Aug 2026',
    nights: 3,
    guests: 1,
    nightlyPrice: 0.00,
    subtotal: 0.00,
    serviceFee: 0.00,
    totalPrice: 0.00,
    status: 'Pending Host Approval',
    paymentStatus: '$20 Refundable Deposit Held',
    createdDate: '10 Aug 2026'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    conversationWith: 'Anna Schmidt',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    listingTitle: 'Cozy couch in Sukhumvit',
    lastMessage: 'Hi Anna! I am excited to stay at your place.',
    timestamp: '10:04 AM',
    unread: false,
    history: [
      { sender: 'guest', text: 'Hi Anna! I just completed the booking for Aug 12-14.', time: '10:00 AM' },
      { sender: 'host', text: 'Awesome! Welcome! Is your arrival time around 2 PM?', time: '10:02 AM' },
      { sender: 'guest', text: 'Hi Anna! I am excited to stay at your place. Yes, 2 PM works perfectly!', time: '10:04 AM' }
    ]
  },
  {
    id: 'msg-2',
    conversationWith: 'Tom Holland',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    listingTitle: 'Service-Share Bed (Dog Walking)',
    lastMessage: 'Thanks for applying! I will review your dog walking experience.',
    timestamp: 'Yesterday',
    unread: true,
    history: [
      { sender: 'guest', text: 'Hello Tom, I love dogs and have walked dogs for 2 years!', time: 'Yesterday 3:15 PM' },
      { sender: 'host', text: 'Thanks for applying! I will review your dog walking experience and confirm.', time: 'Yesterday 3:20 PM' }
    ]
  }
];

export const ADMIN_STATS = {
  totalUsers: '2,458',
  usersGrowth: '+12%',
  totalListings: '1,284',
  listingsGrowth: '+18%',
  totalBookings: '4,932',
  bookingsGrowth: '+10%',
  totalRevenue: '$18,240',
  revenueGrowth: '+32%',
  openReports: 3,
  pendingReviews: 7,
  flaggedListings: 2
};
