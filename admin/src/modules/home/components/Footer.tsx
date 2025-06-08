"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useDataViewer } from "@/contexts/DataViewerContext";
const Footer = ({ totalPages }: { totalPages: number }) => {
  const [open, setOpen] = useState(false);
  const { filters, setFilters } = useDataViewer();

  const [value, setValue] = useState("");
  const limits = [10, 20, 30];

  const handlePreviousPage = () => {
    setFilters("page", filters.page - 1);
  };

  const handleNextPage = () => {
    setFilters("page", filters.page + 1);
  };
  return (
    <div className="flex justify-end items-center">
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
              <PaginationItem key={i}>
                <PaginationLink> {i} </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? limits.find((i) => i.toString() === filters.limits)
                : "10"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="10" className="h-9" />
              <CommandList>
                <CommandEmpty></CommandEmpty>
                <CommandGroup>
                  {limits.map((i) => (
                    <CommandItem
                      key={i}
                      value={i.toString()}
                      onSelect={(currentValue) => {
                        setValue(
                          currentValue === filters.limits ? "" : currentValue,
                        );
                        setOpen(false);
                      }}
                    >
                      {i}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === i.toString() ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Footer;
