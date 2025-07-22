"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderItem } from "@/types/Orders"



export function OrderItemsTable({ orderItems }: { orderItems: OrderItem[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Order Items</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Tier</TableHead>
							<TableHead className="text-center">Quantity</TableHead>
							<TableHead className="text-right">Price</TableHead>
							<TableHead className="text-right">Subtotal</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orderItems.map((item) => (
							<TableRow key={item._id}>
								<TableCell>
									<div className="flex items-center gap-3">
										<img
											src={item.imageUrl || "/placeholder.svg"}
											alt={item.name}
											className="h-12 w-12 rounded-md object-cover"
										/>
										<div>
											<p className="font-medium">{item.name}</p>
											<p className="text-sm text-muted-foreground">ID: {item.productId.slice(-8)}</p>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant="secondary">{item.tier}</Badge>
								</TableCell>
								<TableCell className="text-center">{item.quantity}</TableCell>
								<TableCell className="text-right">৳{item.price.toLocaleString()}</TableCell>
								<TableCell className="text-right font-medium">৳{item.subtotal.toLocaleString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
