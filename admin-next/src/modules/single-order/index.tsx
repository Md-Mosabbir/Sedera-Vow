
"use client"

import { useState } from "react"
import { OrderHeader } from "./components/order-header"
import { OrderStatusCard } from "./components/order-status-card"
import { OrderItemsTable } from "./components/order-items-table"
import { OrderSummary } from "./components/order-summary"
import { CustomerInfoCard } from "./components/customer-info-card"
import { ShippingAddressCard } from "./components/shipping-address-card"
import { PaymentInfoCard } from "./components/payment-info-card"
import { Order, User } from "@/types/Orders"


export default function OrderTemplate({ orderData }: { orderData: Order }) {


	const totalAmount = orderData.orderItems.reduce((sum, item) => sum + item.subtotal, 0)

	return (
		<div>
			<OrderHeader orderId={orderData._id} createdAt={orderData.createdAt} />

			<div className="p-2 md:p-6">



				<div className="grid gap-6 md:grid-cols-3">
					{/* Main Content */}
					<div className="md:col-span-2 space-y-6">
						<OrderStatusCard
							_id={orderData._id}
							currentStatus={orderData.orderStatus}
							deliveredAt={orderData.deliveredAt}
						/>

						<div className="space-y-6">
							<OrderItemsTable orderItems={orderData.orderItems} />
							<OrderSummary totalAmount={totalAmount} />
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						<CustomerInfoCard user={orderData.user as User} phoneNumber={orderData.phoneNumber} />
						<ShippingAddressCard shippingAddress={orderData.shippingAddress} />
						<PaymentInfoCard paymentMethod={orderData.paymentMethod} totalAmount={totalAmount} />
					</div>
				</div>
			</div>
		</div>
	)
}
