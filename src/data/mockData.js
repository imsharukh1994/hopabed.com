// Expanded Mock Dataset for BedHopper Prototype & Demo Mode

export const INITIAL_DESTINATIONS = [
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', priceFrom: 2, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', priceFrom: 8, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80' },
  { id: 'lisbon', name: 'Lisbon', country: 'Portugal', priceFrom: 4, image: 'https://images.unsplash.com/photo-1513672494107-cd9d848a38a2?auto=format&fit=crop&w=600&q=80' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', priceFrom: 6, image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=600&q=80' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', priceFrom: 2, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  { id: 'rio', name: 'Rio de Janeiro', country: 'Brazil', priceFrom: 3, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80' }
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
    currency: 'USD',
    type: 'couch',
    typeLabel: 'Couch / Shared Space',
    rating: 4.8,
    reviewsCount: 23,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c5163?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-anna',
      name: 'Anna Schmidt',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '98%',
      joinedDate: 'Feb 2022',
      bio: 'Digital nomad & travel enthusiast living in Bangkok for 3 years. Love meeting backpackers!'
    },
    amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Air Conditioning', 'Essentials'],
    houseRules: ['No smoking inside', 'Quiet hours 11 PM - 7 AM'],
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
    currency: 'USD',
    type: 'dorm',
    typeLabel: 'Shared Dorm Bed',
    rating: 4.5,
    reviewsCount: 87,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-mark',
      name: 'Mark Miller (Wanderlust)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '99%',
      joinedDate: 'Jan 2021',
      bio: 'Manager of Wanderlust Hostel Bangkok.'
    },
    amenities: ['Wi-Fi', 'Breakfast Included', 'Personal Locker', 'Hot Shower'],
    houseRules: ['Keycard deposit required ($5)', 'Respect dorm mates'],
    available: true,
    isServiceShare: false
  },
  {
    id: 'bh-103',
    title: 'Service-Share Bed (Dog Walking & Reception)',
    city: 'Bangkok',
    country: 'Thailand',
    address: 'Ari Neighborhood',
    distFromCenter: '0.9 km',
    lat: 13.779762,
    lng: 100.544778,
    pricePerNight: 0,
    currency: 'USD',
    type: 'service-share',
    typeLabel: 'Service-Share Stay',
    rating: 4.9,
    reviewsCount: 12,
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-tom',
      name: 'Tom Holland',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '100%',
      joinedDate: 'Nov 2022',
      bio: 'Expat offering free room in exchange for 45 mins daily dog walking!'
    },
    serviceShareDetails: {
      taskCategory: 'Dog Walking & Pet Care',
      taskDescription: 'Walk Golden Retriever twice a day (30 mins total) + water plants.',
      hoursPerDay: '0.5 hrs/day',
      depositRequired: '$20 refundable deposit',
      prohibitedTasks: 'No heavy manual labor.'
    },
    amenities: ['Free Accommodation', 'Wi-Fi', 'Pet Friendly', 'Balcony'],
    houseRules: ['Must love dogs!', 'Clear communication'],
    available: true,
    isServiceShare: true
  },
  {
    id: 'bh-104',
    title: 'Futuristic Capsule Pod in Shibuya',
    city: 'Tokyo',
    country: 'Japan',
    address: 'Shibuya Crossing District',
    distFromCenter: '0.5 km',
    lat: 35.6595,
    lng: 139.7004,
    pricePerNight: 9,
    currency: 'USD',
    type: 'dorm',
    typeLabel: 'Capsule Pod',
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-kenji',
      name: 'Kenji Sato',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '100%',
      joinedDate: 'Mar 2023',
      bio: 'Hostel operator in Shibuya. Clean, ultra-quiet micro pods.'
    },
    amenities: ['High-speed Wi-Fi', 'Privacy Curtain', 'Reading Lamp', 'Onsen Access'],
    houseRules: ['Silence in pod rooms after 10 PM', 'No outdoor shoes'],
    available: true,
    isServiceShare: false
  },
  {
    id: 'bh-105',
    title: 'Service-Share Stay: English Tutoring & Web Fixes',
    city: 'Tokyo',
    country: 'Japan',
    address: 'Shinjuku 3-Chome',
    distFromCenter: '1.2 km',
    lat: 35.6909,
    lng: 139.7003,
    pricePerNight: 0,
    currency: 'USD',
    type: 'service-share',
    typeLabel: 'Service-Share Stay',
    rating: 5.0,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-yuki',
      name: 'Yuki Takahashi',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '97%',
      joinedDate: 'May 2022',
      bio: 'Cafe owner providing free bed for travelers willing to practice English conversational speech.'
    },
    serviceShareDetails: {
      taskCategory: 'Language Tutoring',
      taskDescription: '1 hour per day English conversation practice with cafe staff.',
      hoursPerDay: '1.0 hrs/day',
      depositRequired: '$15 refundable deposit',
      prohibitedTasks: 'No kitchen duty.'
    },
    amenities: ['Free Accommodation', 'Free Coffee', 'Wi-Fi', 'Central Shinjuku'],
    houseRules: ['Friendly attitude', 'Punctual tutoring session'],
    available: true,
    isServiceShare: true
  },
  {
    id: 'bh-106',
    title: 'Alfama Historic Attic Couch',
    city: 'Lisbon',
    country: 'Portugal',
    address: 'Alfama Old Quarter',
    distFromCenter: '0.8 km',
    lat: 38.7115,
    lng: -9.1305,
    pricePerNight: 4,
    currency: 'USD',
    type: 'couch',
    typeLabel: 'Couch / Shared Space',
    rating: 4.7,
    reviewsCount: 35,
    images: [
      'https://images.unsplash.com/photo-1513672494107-cd9d848a38a2?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-diogo',
      name: 'Diogo Silva',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '96%',
      joinedDate: 'Jan 2023',
      bio: 'Fado music enthusiast and graphic artist. Welcoming global travelers.'
    },
    amenities: ['Wi-Fi', 'Rooftop Terrace', 'Coffee Maker', 'Guitar Available'],
    houseRules: ['Respect neighbors', 'Enjoy Lisbon fado!'],
    available: true,
    isServiceShare: false
  },
  {
    id: 'bh-107',
    title: 'Service-Share: Garden Painting & Mural Artist',
    city: 'Berlin',
    country: 'Germany',
    address: 'Kreuzberg District',
    distFromCenter: '2.1 km',
    lat: 52.4986,
    lng: 13.4183,
    pricePerNight: 0,
    currency: 'USD',
    type: 'service-share',
    typeLabel: 'Service-Share Stay',
    rating: 4.9,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-greta',
      name: 'Greta Neumann',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '100%',
      joinedDate: 'Oct 2021',
      bio: 'Kreuzberg community garden manager. Free private room for artistic souls.'
    },
    serviceShareDetails: {
      taskCategory: 'Graphic Design & Mural Art',
      taskDescription: 'Help paint outdoor garden fence or design community flyer for 1 hour/day.',
      hoursPerDay: '1.0 hrs/day',
      depositRequired: '$20 refundable deposit',
      prohibitedTasks: 'No hazardous work.'
    },
    amenities: ['Private Room', 'Free Accommodation', 'Wi-Fi', 'Bicycle Included'],
    houseRules: ['Recycle properly', 'Keep art gear organized'],
    available: true,
    isServiceShare: true
  },
  {
    id: 'bh-108',
    title: 'Canggu Eco Beach Hammock & Bed',
    city: 'Bali',
    country: 'Indonesia',
    address: 'Canggu Coastal Road',
    distFromCenter: '1.8 km',
    lat: -8.6478,
    lng: 115.1385,
    pricePerNight: 3,
    currency: 'USD',
    type: 'dorm',
    typeLabel: 'Shared Dorm Bed',
    rating: 4.8,
    reviewsCount: 94,
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
    ],
    host: {
      id: 'host-wayan',
      name: 'Wayan Sudarta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      trustPassport: true,
      responseRate: '98%',
      joinedDate: 'Dec 2022',
      bio: 'Surfer and eco-lodge host in Canggu. Sunset view every day!'
    },
    amenities: ['Wi-Fi', 'Pool', 'Surfboard Storage', 'Fresh Coconut'],
    houseRules: ['Sand off before entering', 'Respect local culture'],
    available: true,
    isServiceShare: false
  }
];

export const SKILL_TASKS_MARKETPLACE = [
  {
    id: 'task-1',
    listingId: 'bh-103',
    title: 'Dog Walking & Pet Companion',
    hostName: 'Tom Holland',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    city: 'Bangkok',
    country: 'Thailand',
    skillRequired: 'Dog Walking & Pet Care',
    hoursPerDay: '0.5 hrs/day',
    nightsOffered: 3,
    depositAmount: '$20 Refundable Deposit',
    description: 'Walk Golden Retriever twice daily around Ari neighborhood. Full private bed included.',
    isVerifiedHost: true
  },
  {
    id: 'task-2',
    listingId: 'bh-105',
    title: 'Conversational English Practice',
    hostName: 'Yuki Takahashi',
    hostAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    city: 'Tokyo',
    country: 'Japan',
    skillRequired: 'Language Tutoring',
    hoursPerDay: '1.0 hrs/day',
    nightsOffered: 5,
    depositAmount: '$15 Refundable Deposit',
    description: 'Casual English conversation with small cafe staff in Shinjuku. Free bed & fresh coffee daily.',
    isVerifiedHost: true
  },
  {
    id: 'task-3',
    listingId: 'bh-107',
    title: 'Garden Mural & Fence Painting',
    hostName: 'Greta Neumann',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    city: 'Berlin',
    country: 'Germany',
    skillRequired: 'Graphic Design & Mural Art',
    hoursPerDay: '1.0 hrs/day',
    nightsOffered: 4,
    depositAmount: '$20 Refundable Deposit',
    description: 'Help design eco-art fence for community garden. Free private room + bicycle included.',
    isVerifiedHost: true
  },
  {
    id: 'task-4',
    listingId: 'bh-109',
    title: 'WordPress Website Speed Optimization',
    hostName: 'Carlos Mendes',
    hostAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    city: 'Lisbon',
    country: 'Portugal',
    skillRequired: 'Web Dev & IT',
    hoursPerDay: '1.5 hrs/day',
    nightsOffered: 4,
    depositAmount: '$25 Refundable Deposit',
    description: 'Help fix slow loading plugins on hostel blog. Get free private attic room near Miradouro.',
    isVerifiedHost: true
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
    listingId: 'bh-103',
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
    status: 'Confirmed',
    isServiceShare: true,
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
