"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
  const limits = [10, 20, 30];

  const handlePreviousPage = () => {
    setFilters("page", filters.page - 1);
  };

  const handleNextPage = () => {
    setFilters("page", filters.page + 1);
  };

  const handleLimitChange = (currentValue: string) => {
    setFilters("limit", parseInt(currentValue));
    setOpen(false);
  };

  return (
    <div className="flex justify-end items-center mt-auto mb-6">
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                className="w-fit bg-white text-black hover:bg-white"
                disabled={filters.page === 1}
              >
                <PaginationPrevious onClick={handlePreviousPage} />
              </Button>
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
              <PaginationItem key={i}>
                <PaginationLink onClick={() => setFilters("page", i)}>
                  {" "}
                  {i}{" "}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                className="w-fit bg-white text-black hover:bg-white"
                disabled={filters.page === totalPages}
              >
                <PaginationNext onClick={handleNextPage} />
              </Button>
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
              {filters.limit || "10"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No limits found</CommandEmpty>
                <CommandGroup>
                  {limits.map((limit) => (
                    <CommandItem
                      key={limit}
                      value={limit.toString()}
                      onSelect={handleLimitChange}
                    >
                      {limit}
                      <Check
                        className={cn(
                          "ml-auto",
                          filters.limit === limit ? "opacity-100" : "opacity-0",
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
