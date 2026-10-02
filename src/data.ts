import type { Item, User, BorrowRequest } from './types';

export const CATEGORIES: Item['category'][] = [
  'Books',
  'Calculators',
  'Electronics',
  'Cycles',
  'Sports',
  'Lab Equipment',
  'Other',
];

export const CONDITIONS: Item['condition'][] = [
  'New',
  'Like New',
  'Good',
  'Fair',
];

export const demoUser: User = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@college.edu',
  studentId: 'CS21B042',
  college: 'IIT Bombay',
  verified: true,
  rating: 4.8,
  itemsListed: 3,
  successfulExchanges: 7,
};

export const demoItems: Item[] = [
  {
    id: '1',
    name: 'Casio Scientific Calculator fx-991',
    category: 'Calculators',
    description:
      'Casio fx-991EX Classwiz. Excellent condition, used for 2 semesters. Perfect for engineering maths and physics exams.',
    condition: 'Like New',
    pricePerDay: 10,
    location: 'Hostel H-4, IIT Bombay',
    image:
      'https://images.pexels.com/photos/5776/calculator-scientific.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'u2',
    ownerName: 'Priya Nair',
    verified: true,
  },
  {
    id: '2',
    name: 'Engineering Mathematics — K.A. Stroud',
    category: 'Books',
    description:
      'Advanced Engineering Mathematics 7th edition. Covers calculus, linear algebra, differential equations. Light highlight marks.',
    condition: 'Good',
    pricePerDay: 5,
    location: 'Library Block, IIT Bombay',
    image:
      'https://images.pexels.com/photos/240163/pexels-photo-240163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'u3',
    ownerName: 'Rohan Verma',
    verified: true,
  },
  {
    id: '3',
    name: 'Engineering Drawing Kit — Compass & Set Squares',
    category: 'Lab Equipment',
    description:
      'Complete drafting kit with compass, divider, protractor, set squares, and scale. All tools in case.',
    condition: 'Good',
    pricePerDay: 8,
    location: 'Hostel H-2, IIT Bombay',
    image:
      'https://images.pexels.com/photos/5477780/pexels-photo-5477780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'u4',
    ownerName: 'Sneha Iyer',
    verified: false,
  },
  {
    id: '4',
    name: 'Hero Cyclone 6-Speed Bicycle',
    category: 'Cycles',
    description:
      '6-speed geared cycle, ideal for campus commutes. Recently serviced with new brake pads. Helmet included.',
    condition: 'Good',
    pricePerDay: 25,
    location: 'Cycle Stand, IIT Bombay',
    image:
      'https://images.pexels.com/photos/7483081/pexels-photo-7483081.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'u5',
    ownerName: 'Arjun Reddy',
    verified: true,
  },
  {
    id: '5',
    name: 'Aluminium Adjustable Laptop Stand',
    category: 'Electronics',
    description:
      'Foldable aluminium laptop stand with adjustable height. Improves posture during long study sessions. Very sturdy.',
    condition: 'Like New',
    pricePerDay: 0,
    location: 'Hostel H-7, IIT Bombay',
    image:
      'https://images.pexels.com/photos/4792712/pexels-photo-4792712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'u6',
    ownerName: 'Kavya Rao',
    verified: true,
  },
  {
    id: '6',
    name: 'SG Kashmir Willow Cricket Bat',
    category: 'Sports',
    description:
      'Grade-A Kashmir willow bat, used for one season. Great for intra-college matches. Comes with bat cover.',
    condition: 'Good',
    pricePerDay: 15,
    location: 'Sports Complex, IIT Bombay',
    image:
      'https://images.pexels.com/photos/13509805/pexels-photo-13509805.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'u7',
    ownerName: 'Vikram Singh',
    verified: true,
  },
  {
    id: '7',
    name: 'Chemistry Lab Coat — Size L',
    category: 'Lab Equipment',
    description:
      'Standard white lab coat, size large. Worn for chemistry lab only. Washed and ready to use.',
    condition: 'Like New',
    pricePerDay: 5,
    location: 'Hostel H-3, IIT Bombay',
    image:
      'https://images.pexels.com/photos/18252413/pexels-photo-18252413.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'u8',
    ownerName: 'Ananya Gupta',
    verified: false,
  },
  {
    id: '8',
    name: 'Data Structures & Algorithms Textbook',
    category: 'Books',
    description:
      'Cormen, Leiserson, Rivest & Stein — Introduction to Algorithms, 3rd edition. Comprehensive DSA reference. Minor wear on cover.',
    condition: 'Fair',
    pricePerDay: 7,
    location: 'Library Block, IIT Bombay',
    image:
      'https://images.pexels.com/photos/8327812/pexels-photo-8327812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'u9',
    ownerName: 'Devansh Mehta',
    verified: true,
  },
  {
    id: '9',
    name: 'Mechanical Pencil Set — Rotring 600',
    category: 'Other',
    description:
      'Premium 0.5mm mechanical pencil set. Perfect for technical drawing and precise work. Comes with refill leads.',
    condition: 'Like New',
    pricePerDay: 5,
    location: 'Hostel H-4, IIT Bombay',
    image:
      'https://images.pexels.com/photos/33890771/pexels-photo-33890771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'me',
    ownerName: 'Aarav Sharma',
    verified: true,
  },
  {
    id: '10',
    name: 'Physics Lab Notebook Set',
    category: 'Lab Equipment',
    description:
      'Set of 3 graph-ruled lab notebooks, barely used. Great for physics and chemistry lab records.',
    condition: 'Good',
    pricePerDay: 3,
    location: 'Hostel H-4, IIT Bombay',
    image:
      'https://images.pexels.com/photos/6238026/pexels-photo-6238026.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'me',
    ownerName: 'Aarav Sharma',
    verified: true,
  },
];

export const demoRequests: BorrowRequest[] = [
  {
    id: 'demo-req-1',
    itemId: '9',
    itemName: 'Mechanical Pencil Set — Rotring 600',
    itemImage:
      'https://images.pexels.com/photos/33890771/pexels-photo-33890771.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'me',
    ownerName: 'Aarav Sharma',
    borrowerId: 'u10',
    borrowerName: 'Ishaan Kapoor',
    startDate: '2026-10-05',
    endDate: '2026-10-10',
    message: 'Hi! I need this for my engineering drawing assignment this week. Can I borrow it?',
    status: 'Pending',
  },
  {
    id: 'demo-req-2',
    itemId: '10',
    itemName: 'Physics Lab Notebook Set',
    itemImage:
      'https://images.pexels.com/photos/6238026/pexels-photo-6238026.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ownerId: 'me',
    ownerName: 'Aarav Sharma',
    borrowerId: 'u11',
    borrowerName: 'Meera Joshi',
    startDate: '2026-10-08',
    endDate: '2026-10-15',
    message: 'Need graph notebooks for my physics lab records. Would really appreciate it!',
    status: 'Pending',
  },
];
