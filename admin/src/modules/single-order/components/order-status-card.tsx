"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CheckCircle, XCircle, Calendar, RotateCcw } from "lucide-react"

const statusConfig = {
	Processing: { color: "bg-yellow-500", icon: Package },
	Shipped: { color: "bg-blue-500", icon: Truck },
	Delivered: { color: "bg-green-500", icon: CheckCircle },
	Cancelled: { color: "bg-red-500", icon: XCircle },
}

interface OrderStatusCardProps {
	currentStatus: string
	deliveredAt?: string
	isLoading: boolean
	onStatusChange: (status: string) => void
}

export function OrderStatusCard({ currentStatus, deliveredAt, isLoading, onStatusChange }: OrderStatusCardProps) {
	const getAvailableActions = () => {
		switch (currentStatus) {
			case "Processing":
				return [
					{ label: "Ship Order", status: "Shipped", icon: Truck, variant: "default" as const },
					{ label: "Cancel Order", status: "Cancelled", icon: XCircle, variant: "destructive" as const },
				]
			case "Shipped":
				return [
					{ label: "Mark as Delivered", status: "Delivered", icon: CheckCircle, variant: "default" as const },
					{ label: "Revert to Processing", status: "Processing", icon: RotateCcw, variant: "outline" as const },
					{ label: "Cancel Order", status: "Cancelled", icon: XCircle, variant: "destructive" as const },
				]
			case "Delivered":
				return []
			case "Cancelled":
				return [{ label: "Revert to Processing", status: "Processing", icon: RotateCcw, variant: "outline" as const }]
			default:
				return []
		}
	}

	const StatusIcon = statusConfig[currentStatus as keyof typeof statusConfig]?.icon || Package

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2">
						<StatusIcon className="h-5 w-5" />
						Order Status
					</CardTitle>
					<Badge className={`${statusConfig[currentStatus as keyof typeof statusConfig]?.color} text-white`}>
						{currentStatus}
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-2">
					{getAvailableActions().map((action) => (
						<Button
							key={action.status}
							variant={action.variant}
							size="sm"
							onClick={() => onStatusChange(action.status)}
							disabled={isLoading}
							className="flex items-center gap-2"
						>
							<action.icon className="h-4 w-4" />
							{action.label}
						</Button>
					))}
				</div>
				{currentStatus === "Delivered" && deliveredAt && (
					<p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
						<Calendar className="h-4 w-4" />
						Delivered on{" "}
						{new Date(deliveredAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
				)}
			</CardContent>
		</Card>
	)
}
