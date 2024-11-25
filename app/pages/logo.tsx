import { Bike } from 'lucide-react'
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-[#FF6B3D]">
      <Bike className="h-6 w-6" />
      <span className="text-xl font-semibold">CycleMap</span>
    </Link>
  )
}