"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { LiaGripLinesSolid } from "react-icons/lia";
import { CardTitle } from "../ui/card";

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
			
			<CardTitle className="mt-8">Account</CardTitle>
            <Link  href="/profile" onClick={() => setOpen(false)}>Profile</Link>
			<Link href="" className="text-muted-foreground" onClick={() => {}}>Documents</Link>
			<Link href="" className="text-muted-foreground" onClick={() => {}}>Emergency Contacts</Link>
			<Link href="" className="text-muted-foreground" onClick={() => {}}>Billing</Link>
			
			<CardTitle className="mt-8">Appointments</CardTitle>
            <Link href="/manage/appointments" onClick={() => setOpen(false)}>Manage</Link>
			<Link href="/create/appointment" onClick={() => setOpen(false)}>Create</Link>
			
          </div>
        </SheetContent>
      </Sheet>
  )
}
