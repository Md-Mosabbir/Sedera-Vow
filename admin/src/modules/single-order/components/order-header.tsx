"use client"

import Header from "@/modules/home/components/Header"


interface OrderHeaderProps {
	orderId: string
	createdAt: string
}

export function OrderHeader({ orderId, createdAt }: OrderHeaderProps) {
	return (
		<div className="flex items-center gap-4 mb-6">

			<div>
				<Header title={`Order #${orderId.slice(-8)}`} />
				<p className="text-muted-foreground ml-14">
					Placed on{" "}
					{new Date(createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
			</div>
		</div>
	)
}
