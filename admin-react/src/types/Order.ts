enum OrderStatus {
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export interface Order {
  _id: string
  createdAt: string
  deliveredAt: string
  orderStatus: OrderStatus
  paymentMethod: string
  shippingAddress: {
    address: string
    city: string
    postalCode: string
  }
  phoneNumber: string

  orderItems: OrderItem[]
  total: number
  status: string
  user: OrderUser
}

interface OrderUser {
  _id: string
  username: string
  email: string
}

export interface OrderItem {
  _id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  subtotal: number
  tier: string
  productId: string
}
