import React from "react";
import { Sort } from "../../components/Sort";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDataViewer } from "@/contexts/DataViewerContext";
import { Separator } from "@/components/ui/separator";

const ProductSorting = () => {
  const sortOptions = [
    { value: "createdAt", label: "Date Added" },
    { value: "name", label: "Product Name" },
    { value: "price", label: "Price" },
    { value: "inStock", label: "Stock Status" },
    { value: "featured", label: "Featured Status" },
  ];

  const orderOptions = [
    { value: "1", label: "Ascending" },
    { value: "-1", label: "Descending" },
  ];

  const { filters, setFilters } = useDataViewer();

  const handleSortChange = (value: string) => {
    setFilters("sort", value);
  };

  const handleOrderChange = (value: string) => {
    setFilters("order", parseInt(value));
  };

  return (
    <Sort trigger="Sort By">
      <div className="px-2 py-3">
        <Label className="text-sm font-medium mb-3 block">Sort By</Label>
        <RadioGroup
          defaultValue={filters.sort || "createdAt"}
          onValueChange={handleSortChange}
          className="space-y-2"
        >
          {sortOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>

        <Separator className="my-4" />

        <Label className="text-sm font-medium mb-3 block">Order</Label>
        <RadioGroup
          defaultValue={filters.order?.toString() || "-1"}
          onValueChange={handleOrderChange}
          className="space-y-2"
        >
          {orderOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem value={option.value} id={`order-${option.value}`} />
              <Label htmlFor={`order-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Sort>
  );
};

export default ProductSorting;
