import { CartItem } from '../services/local-storage-service';

export interface OrderModel {
  id?: string;  
  userId: string;  
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;  
  total: number;
  status: string;  
  orderDate: Date;
}