export type Category =
  | 'Books'
  | 'Calculators'
  | 'Electronics'
  | 'Cycles'
  | 'Sports'
  | 'Lab Equipment'
  | 'Other';

export type Condition = 'New' | 'Like New' | 'Good' | 'Fair';

export interface Item {
  id: string;
  name: string;
  category: Category;
  description: string;
  condition: Condition;
  pricePerDay: number; // 0 = free
  location: string;
  image: string;
  ownerId: string;
  ownerName: string;
  verified: boolean;
}

export type RequestStatus = 'Pending' | 'Accepted' | 'Rejected';

export interface BorrowRequest {
  id: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  ownerId: string;
  ownerName: string;
  borrowerId: string;
  borrowerName: string;
  startDate: string;
  endDate: string;
  message: string;
  status: RequestStatus;
}

export interface User {
  name: string;
  email: string;
  studentId: string;
  college: string;
  verified: boolean;
  rating: number;
  itemsListed: number;
  successfulExchanges: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  requestId: string;
  itemId: string;
  itemName: string;
  itemImage: string;
  ownerId: string;
  ownerName: string;
  borrowerId: string;
  borrowerName: string;
  messages: ChatMessage[];
}
