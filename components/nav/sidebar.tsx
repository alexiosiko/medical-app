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
			
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/book" onClick={() => setOpen(false)}>Book Appointment</Link>
			<Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
			{/* <Link href="/history" onClick={() => setOpen(false)}>History (Not done)</Link> */}
			{/* <Link href="/manage" onClick={() => setOpen(false)}>Manage (Not done)</Link> */}
          </div>
        </SheetContent>
      </Sheet>
  )
}
