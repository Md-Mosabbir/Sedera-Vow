"use client";
import { useState } from "react";
import { Filter } from "../../components/Filter";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useDataViewer } from "@/contexts/DataViewerContext";
import { OrderStatus } from "@/types/Orders";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const OrderFilter = () => {
  const { filters, setFilters } = useDataViewer();
  const [openStatus, setOpenStatus] = useState(false);
  const [openMethod, setOpenMethod] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: filters.startDate ? new Date(filters.startDate) : undefined,
    to: filters.endDate ? new Date(filters.endDate) : undefined,
  });

  type OrderStatusWithNone = "None" | OrderStatus;
  const orderStatuses: OrderStatusWithNone[] = [
    "None",
    "Processing",
    "Delivered",
    "Shipped",
    "Cancelled",
  ];

  const paymentMethods = [
    "None",
    "Stripe",
    "Cash on Delivery",
    "Card",
    "PayPal",
  ];

  return (
    <Filter>
      {/* Status Filter */}
      <FilterComponent title="Status">
        <Popover open={openStatus} onOpenChange={setOpenStatus}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStatus}
              className="w-[200px] justify-between"
            >
              {filters.status || "Select status"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No status found</CommandEmpty>
                <CommandGroup>
                  {orderStatuses.map((status) => (
                    <CommandItem
                      key={status}
                      value={status}
                      onSelect={(value) => {
                        setFilters("status", value === "None" ? "" : value);
                        setOpenStatus(false);
                      }}
                    >
                      {status}
                      <Check
                        className={cn(
                          "ml-auto",
                          filters.status === status
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </FilterComponent>

      {/* Payment Method */}
      <FilterComponent title="Payment">
        <Popover open={openMethod} onOpenChange={setOpenMethod}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openMethod}
              className="w-[200px] justify-between"
            >
              {filters.paymentMethod || "Select method"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No method found</CommandEmpty>
                <CommandGroup>
                  {paymentMethods.map((method) => (
                    <CommandItem
                      key={method}
                      value={method}
                      onSelect={(value) => {
                        setFilters(
                          "paymentMethod",
                          value === "None" ? "" : value,
                        );
                        setOpenMethod(false);
                      }}
                    >
                      {method}
                      <Check
                        className={cn(
                          "ml-auto",
                          filters.paymentMethod === method
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </FilterComponent>

      {/* Search */}
      <FilterComponent title="Search">
        <Input
          placeholder="Search order items..."
          className="w-[200px]"
          onChange={(e) => setFilters("search", e.target.value)}
        />
      </FilterComponent>

      {/* User ID */}
      <FilterComponent title="User ID">
        <Input
          placeholder="User ID"
          className="w-[200px]"
          onChange={(e) => setFilters("userId", e.target.value)}
        />
      </FilterComponent>

      {/* Product ID */}
      <FilterComponent title="Product ID">
        <Input
          placeholder="Product ID"
          className="w-[200px]"
          onChange={(e) => setFilters("productId", e.target.value)}
        />
      </FilterComponent>

      {/* Date Range */}
      <FilterComponent title="Date">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn("w-[250px] justify-start text-left font-normal")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d")} –{" "}
                    {format(dateRange.to, "MMM d")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range || {});
                setFilters("startDate", range?.from?.toISOString() || "");
                setFilters("endDate", range?.to?.toISOString() || "");
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </FilterComponent>
    </Filter>
  );
};

export default OrderFilter;

function FilterComponent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center gap-5">
      <Label id={title.toLowerCase()}>{title}</Label>
      {children}
    </div>
  );
}
