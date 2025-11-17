export interface Tailor {
  id: string;
  name: string;
  bio: string;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  avatar: string;
  coverImage: string;
  yearsOfExperience: number;
}

export interface Design {
  id: string;
  tailorId: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  customizable: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  tailorId: string;
  designId?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  isCustom: boolean;
  measurements?: Record<string, string>;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}
