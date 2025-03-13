"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { LiaGripLinesSolid } from "react-icons/lia";

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" onClick={() => setOpen(true)}>
            <LiaGripLinesSolid />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-3/4">
          <SheetHeader>
            <SheetTitle className="text-center">Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center gap-4">
            <Link href="/" onClick={() => setOpen(false)}>
              <Button variant="link" className="text-lg">Home</Button>
            </Link>
            <Link href="/manage" onClick={() => setOpen(false)}>
              <Button variant="link" className="text-lg">Manage</Button>
            </Link>
            <Link href="/book" onClick={() => setOpen(false)}>
              <Button variant="link" className="text-lg">Book Appointment</Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
  )
}
