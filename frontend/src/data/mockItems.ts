export interface MockItem {
  id: string
  userId: string
  title: string
  description: string
  category: string
  condition: string
  isFree: boolean
  price: number | null
  location: string
  imageUrl: string | null
  createdAt: string
  user: {
    id: string
    name: string
    email: string
    phone: string | null
    location: string
  }
}

export const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '(555) 234-5678',
    location: 'New York, NY'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    phone: '(555) 345-6789',
    location: 'Austin, TX'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@example.com',
    phone: '(555) 456-7890',
    location: 'Seattle, WA'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    phone: '(555) 567-8901',
    location: 'Portland, OR'
  }
]

export const mockItems: MockItem[] = [
  {
    id: '1',
    userId: '1',
    title: 'Vintage Wooden Coffee Table',
    description: 'Beautiful mid-century modern coffee table in excellent condition. Solid oak construction with a warm walnut finish. Perfect for any living room. Dimensions: 48"L x 24"W x 18"H. Minor wear on edges adds character.',
    category: 'Furniture',
    condition: 'Good',
    isFree: false,
    price: 150,
    location: 'San Francisco, CA',
    imageUrl: null,
    createdAt: '2024-11-20T10:30:00Z',
    user: mockUsers[0]
  },
  {
    id: '2',
    userId: '1',
    title: 'Kids Books Collection (20+ books)',
    description: "Collection of children's books for ages 4-8. Includes classics like Where the Wild Things Are, The Very Hungry Caterpillar, and more. All books are gently used and in good readable condition.",
    category: 'Books',
    condition: 'Good',
    isFree: true,
    price: null,
    location: 'San Francisco, CA',
    imageUrl: null,
    createdAt: '2024-11-21T14:15:00Z',
    user: mockUsers[0]
  },
  {
    id: '3',
    userId: '1',
    title: 'Yoga Mat & Blocks Set',
    description: 'Premium yoga mat (6mm thick) with two cork blocks. Mat is purple with good grip. Cleaned and sanitized. Perfect for home yoga practice or taking to classes.',
    category: 'Sports',
    condition: 'Like New',
    isFree: false,
    price: 35,
    location: 'San Francisco, CA',
    imageUrl: null,
    createdAt: '2024-11-22T09:00:00Z',
    user: mockUsers[0]
  },
  {
    id: '4',
    userId: '2',
    title: 'Dell 24" Monitor',
    description: 'Dell UltraSharp U2415 24-inch monitor. 1920x1200 resolution, IPS panel with excellent color accuracy. Includes power cable and HDMI cable. Great for work from home setup or gaming.',
    category: 'Electronics',
    condition: 'Good',
    isFree: false,
    price: 120,
    location: 'New York, NY',
    imageUrl: null,
    createdAt: '2024-11-19T16:45:00Z',
    user: mockUsers[1]
  },
  {
    id: '5',
    userId: '2',
    title: "Men's Winter Coat - Large",
    description: 'Columbia winter jacket, size Large. Black, waterproof outer shell with warm insulation. Barely worn, moving to warmer climate. Original price $200.',
    category: 'Clothing',
    condition: 'Like New',
    isFree: false,
    price: 80,
    location: 'New York, NY',
    imageUrl: null,
    createdAt: '2024-11-20T11:20:00Z',
    user: mockUsers[1]
  },
  {
    id: '6',
    userId: '2',
    title: 'Potted Snake Plant',
    description: 'Healthy snake plant (Sansevieria) in ceramic pot. Great air purifying plant, very low maintenance. About 2 feet tall. Must pick up.',
    category: 'Home & Garden',
    condition: 'New',
    isFree: true,
    price: null,
    location: 'New York, NY',
    imageUrl: null,
    createdAt: '2024-11-21T08:30:00Z',
    user: mockUsers[1]
  },
  {
    id: '7',
    userId: '3',
    title: 'Acoustic Guitar',
    description: 'Yamaha FG800 acoustic guitar. Excellent beginner to intermediate guitar. Comes with soft case, tuner, and extra strings. Some minor scratches but sounds great.',
    category: 'Other',
    condition: 'Good',
    isFree: false,
    price: 180,
    location: 'Austin, TX',
    imageUrl: null,
    createdAt: '2024-11-18T13:00:00Z',
    user: mockUsers[2]
  },
  {
    id: '8',
    userId: '3',
    title: 'Standing Desk Converter',
    description: 'Adjustable height standing desk converter. Fits on top of regular desk. Great for improving posture. Black finish, holds laptop + monitor. Switching to full standing desk.',
    category: 'Furniture',
    condition: 'Good',
    isFree: false,
    price: 60,
    location: 'Austin, TX',
    imageUrl: null,
    createdAt: '2024-11-19T15:45:00Z',
    user: mockUsers[2]
  },
  {
    id: '9',
    userId: '3',
    title: 'Board Games Bundle',
    description: 'Collection of 5 board games: Ticket to Ride, Catan, Pandemic, Codenames, and Azul. All complete with all pieces. Some box wear but games are in great condition.',
    category: 'Toys',
    condition: 'Good',
    isFree: false,
    price: 90,
    location: 'Austin, TX',
    imageUrl: null,
    createdAt: '2024-11-20T10:00:00Z',
    user: mockUsers[2]
  },
  {
    id: '10',
    userId: '4',
    title: 'Bike Helmet & Lock Set',
    description: "Giro bike helmet (adult medium) and Kryptonite U-lock. Helmet is black with good padding, lock comes with 2 keys. Giving away as I'm moving abroad.",
    category: 'Sports',
    condition: 'Good',
    isFree: true,
    price: null,
    location: 'Seattle, WA',
    imageUrl: null,
    createdAt: '2024-11-21T12:00:00Z',
    user: mockUsers[3]
  },
  {
    id: '11',
    userId: '4',
    title: 'Espresso Machine',
    description: 'Breville Bambino Plus espresso machine. Makes excellent espresso and cappuccinos. Includes milk frother. About 1 year old, works perfectly. Upgraded to larger model.',
    category: 'Home & Garden',
    condition: 'Like New',
    isFree: false,
    price: 280,
    location: 'Seattle, WA',
    imageUrl: null,
    createdAt: '2024-11-22T14:30:00Z',
    user: mockUsers[3]
  },
  {
    id: '12',
    userId: '4',
    title: 'Programming Books Collection',
    description: 'Set of 8 programming books including Clean Code, Design Patterns, JavaScript: The Good Parts. Great for developers. Some highlighting and notes inside.',
    category: 'Books',
    condition: 'Good',
    isFree: false,
    price: 45,
    location: 'Seattle, WA',
    imageUrl: null,
    createdAt: '2024-11-23T09:15:00Z',
    user: mockUsers[3]
  },
  {
    id: '13',
    userId: '5',
    title: 'Toddler Toys & Play Kitchen',
    description: 'Wooden play kitchen set with accessories. Includes pots, pans, play food. Perfect for ages 2-5. My kids outgrew it. Very sturdy and well-made.',
    category: 'Toys',
    condition: 'Good',
    isFree: true,
    price: null,
    location: 'Portland, OR',
    imageUrl: null,
    createdAt: '2024-11-20T16:00:00Z',
    user: mockUsers[4]
  },
  {
    id: '14',
    userId: '5',
    title: 'IKEA Bookshelf',
    description: 'IKEA Billy bookshelf in white. 5 shelves, 31.5" wide x 79" tall. Good condition, some minor scuffs. Must disassemble for pickup. Easy to put back together.',
    category: 'Furniture',
    condition: 'Fair',
    isFree: false,
    price: 30,
    location: 'Portland, OR',
    imageUrl: null,
    createdAt: '2024-11-21T11:30:00Z',
    user: mockUsers[4]
  },
  {
    id: '15',
    userId: '5',
    title: 'Camping Tent - 4 Person',
    description: 'Coleman 4-person camping tent. Easy setup, waterproof rainfly included. Used 3 times, in excellent condition. Comes with stakes and carrying bag.',
    category: 'Sports',
    condition: 'Like New',
    isFree: false,
    price: 110,
    location: 'Portland, OR',
    imageUrl: null,
    createdAt: '2024-11-22T13:00:00Z',
    user: mockUsers[4]
  },
  {
    id: '16',
    userId: '5',
    title: "Women's Clothing Lot - Size M",
    description: "Bag of women's clothes, all size medium. Mix of casual and work clothes. Brands include Gap, J.Crew, Banana Republic. About 15 items total. All clean and in good condition.",
    category: 'Clothing',
    condition: 'Good',
    isFree: true,
    price: null,
    location: 'Portland, OR',
    imageUrl: null,
    createdAt: '2024-11-23T10:45:00Z',
    user: mockUsers[4]
  },
  {
    id: '17',
    userId: '1',
    title: 'Kitchen Aid Stand Mixer',
    description: 'Classic KitchenAid stand mixer in red. 5-quart capacity. Includes paddle, dough hook, and whisk attachments. Works perfectly, just upgrading to professional model.',
    category: 'Home & Garden',
    condition: 'Good',
    isFree: false,
    price: 175,
    location: 'San Francisco, CA',
    imageUrl: null,
    createdAt: '2024-11-23T15:20:00Z',
    user: mockUsers[0]
  },
  {
    id: '18',
    userId: '2',
    title: 'Office Chair - Ergonomic',
    description: 'Herman Miller Aeron chair, size B (medium). Excellent ergonomic office chair. Some wear on armrests but mechanism works perfectly. Retail $1400, asking fraction of that.',
    category: 'Furniture',
    condition: 'Good',
    isFree: false,
    price: 450,
    location: 'New York, NY',
    imageUrl: null,
    createdAt: '2024-11-23T12:00:00Z',
    user: mockUsers[1]
  },
  {
    id: '19',
    userId: '3',
    title: 'House Plants Bundle',
    description: 'Collection of 4 healthy house plants: pothos, philodendron, ZZ plant, and peace lily. All in pots. Great for beginners. Free to good home!',
    category: 'Home & Garden',
    condition: 'New',
    isFree: true,
    price: null,
    location: 'Austin, TX',
    imageUrl: null,
    createdAt: '2024-11-23T14:00:00Z',
    user: mockUsers[2]
  }
]

// Test credentials for all users
export const testCredentials = [
  { email: 'sarah@example.com', password: 'password123', name: 'Sarah Johnson', location: 'San Francisco, CA' },
  { email: 'michael@example.com', password: 'password123', name: 'Michael Chen', location: 'New York, NY' },
  { email: 'emma@example.com', password: 'password123', name: 'Emma Rodriguez', location: 'Austin, TX' },
  { email: 'david@example.com', password: 'password123', name: 'David Kim', location: 'Seattle, WA' },
  { email: 'lisa@example.com', password: 'password123', name: 'Lisa Anderson', location: 'Portland, OR' }
]
