"use client"

import { Separator } from "@/components/ui/separator"

interface OrderSummaryProps {
	totalAmount: number
}

export function OrderSummary({ totalAmount }: OrderSummaryProps) {
	return (
		<>
			<Separator className="my-4" />
			<div className="flex justify-between items-center">
				<span className="text-lg font-semibold">Total Amount</span>
				<span className="text-lg font-bold">৳{totalAmount.toLocaleString()}</span>
			</div>
		</>
	)
}
