"use client";

import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search network"
          className="pl-9"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            router.push(`?${createQueryString("search", e.target.value)}`);
          }}
        />
      </div>
      <Select
        defaultValue={searchParams.get("country") ?? ""}
        onValueChange={(value) => {
          router.push(`?${createQueryString("country", value)}`);
        }}
      >
        <SelectTrigger className="w-[140px]">
          <MapPin className="h-4 w-4" />
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ES">Spain</SelectItem>
          <SelectItem value="DK">Denmark</SelectItem>
          <SelectItem value="US">United States</SelectItem>
          <SelectItem value="UK">United Kingdom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
