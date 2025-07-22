
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShippingAddress } from "@/types/Orders"
import { MapPin } from "lucide-react"


export function ShippingAddressCard({ shippingAddress }: { shippingAddress: ShippingAddress }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<MapPin className="h-5 w-5" />
					Shipping Address
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-sm space-y-1">
					<p>{shippingAddress.address}</p>
					<p>{shippingAddress.city}</p>
					<p>Postal Code: {shippingAddress.postalCode}</p>
				</div>
			</CardContent>
		</Card>
	)
}
