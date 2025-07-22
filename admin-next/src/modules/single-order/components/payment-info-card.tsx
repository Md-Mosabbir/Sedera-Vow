"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

interface PaymentInfoCardProps {
	paymentMethod: string
	totalAmount: number
}

export function PaymentInfoCard({ paymentMethod, totalAmount }: PaymentInfoCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<CreditCard className="h-5 w-5" />
					Payment
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<div className="flex justify-between">
						<span className="text-sm">Method:</span>
						<Badge variant="outline">{paymentMethod}</Badge>
					</div>
					<div className="flex justify-between">
						<span className="text-sm">Total:</span>
						<span className="font-medium">৳{totalAmount.toLocaleString()}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
