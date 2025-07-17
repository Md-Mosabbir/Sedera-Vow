"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface OrderHeaderProps {
	orderId: string
	createdAt: string
}

export function OrderHeader({ orderId, createdAt }: OrderHeaderProps) {
	return (
		<div className="flex items-center gap-4 mb-6">
			<Button variant="ghost" size="sm">
				<ArrowLeft className="h-4 w-4 mr-2" />
				Back to Orders
			</Button>
			<div>
				<h1 className="text-2xl font-bold">Order #{orderId.slice(-8)}</h1>
				<p className="text-muted-foreground">
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
