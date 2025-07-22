"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode } from "react";

interface SortProps {
  children: ReactNode;
  trigger?: string;
}

export function Sort({ children, trigger = "Sort" }: SortProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{trigger}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
