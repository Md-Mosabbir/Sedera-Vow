"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User as UserType } from "@/types/Orders"
import { User as UserIcon, Phone } from "lucide-react"

interface CustomerInfoCardProps {
	user: UserType
	phoneNumber: string
}

export function CustomerInfoCard({ user, phoneNumber }: CustomerInfoCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<UserIcon className="h-5 w-5" />
					Customer
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div>
					<p className="font-medium">{user.username}</p>
					<p className="text-sm text-muted-foreground">{user.email}</p>
				</div>
				<div className="flex items-center gap-2">
					<Phone className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm">{phoneNumber}</span>
				</div>
			</CardContent>
		</Card>
	)
}
