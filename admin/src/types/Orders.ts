export interface OrderItem {
  _id: string;
  productId: string;
  name: string;
  imageUrl: string;
  tier: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface User {

  id: string,
  username: string,
  email: string
}

export interface Order {
  _id: string;
  user: string | User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  phoneNumber: string;
  orderStatus: OrderStatus;
  createdAt: string;
  deliveredAt?: string;
  __v: number;
}

export interface OrdersResponse {
  page: number;
  limit: number;
  orders: Order[];
  totalOrders: number;
  totalPages: number;
}
