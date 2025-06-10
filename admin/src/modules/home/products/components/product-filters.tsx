"use client";
import React, { useState } from "react";
import { Filter } from "../../components/Filter";
import { Input } from "@/components/ui/input";
import { useDataViewer } from "@/contexts/DataViewerContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ProductFilters = () => {
  const { filters, setFilters } = useDataViewer();
  const [open, setOpen] = useState(false);
  const categories = ["Rings", "Necklace", ""];
  return (
    <Filter>
      <FilterComponent title="Search">
        <Input
          name="search"
          type="search"
          onChange={(e) => setFilters("search", e.target.value)}
        ></Input>
      </FilterComponent>
      <FilterComponent title="Minimum">
        <Input
          name="minimum"
          type="number"
          min={0}
          onChange={(e) => setFilters("minPrice", e.target.value)}
        ></Input>
      </FilterComponent>
      <FilterComponent title="Maximum">
        <Input
          name="maximum"
          type="number"
          onChange={(e) => setFilters("maxPrice", e.target.value)}
        ></Input>
      </FilterComponent>
      <FilterComponent title="Stock">
        <Switch
          id="stock"
          name="stock"
          onCheckedChange={(e) => setFilters("inStock", e.valueOf())}
        />
      </FilterComponent>

      <FilterComponent title="Tiers">
        <ToggleGroup
          variant="outline"
          type="multiple"
          onValueChange={(value) => {
            setFilters("tiers", value.join(","));
          }}
        >
          <ToggleGroupItem value="Gold" aria-label="Toggle bold">
            <p>Gold</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="Diamond" aria-label="Toggle italic">
            <p>Diamond</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="Platinum" aria-label="Toggle strikethrough">
            <p>Platinum</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </FilterComponent>
      <FilterComponent title="Categories">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {filters.category || "Select category"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No category found</CommandEmpty>
                <CommandGroup>
                  {categories.map((category, i) => (
                    <CommandItem
                      key={category + i}
                      value={category}
                      onSelect={(value) => {
                        setFilters("category", value);
                        setOpen(false);
                      }}
                    >
                      {category}
                      <Check
                        className={cn(
                          "ml-auto",
                          filters.category === category
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
    </Filter>
  );
};

export default ProductFilters;

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
