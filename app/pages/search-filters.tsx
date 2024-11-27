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
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  countries: { name: string; code: string }[];
}

export function SearchFilters({ countries }: Props) {
  const [searchCountry, setSearchCountry] = useState("");
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

  const filteredCountries = countries.filter((country: { name: string }) =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search network"
          className="pl-9 border-indigo-200 focus:border-indigo-500 rounded-full"
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            router.push(`?${createQueryString("search", e.target.value)}`);
          }}
        />
      </div>

      <div className="relative w-[180px]">
        <Select
          defaultValue={searchParams.get("country") ?? ""}
          onValueChange={(value) => {
            router.push(`?${createQueryString("country", value)}`);
          }}
        >
          <SelectTrigger className="w-full border-indigo-200 focus:border-indigo-500 rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <div className="py-2 px-3">
              <Input
                placeholder="Search country"
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
                className="border-indigo-200 focus:border-indigo-500 rounded-full mb-2"
              />
            </div>
            {filteredCountries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
