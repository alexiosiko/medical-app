"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LiaGripLinesSolid } from "react-icons/lia";
import { CardTitle } from "../ui/card";
import { TransitionLink } from "../animations/transitionlink";

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
				<div className="flex flex-col items-center gap-2">
					
						<TransitionLink href="/" onClick={() => setOpen(false)}>Home</TransitionLink>
						
						<CardTitle className="mt-8 text-2xl font-bold">Account</CardTitle>
						<TransitionLink href="/profile" onClick={() => setOpen(false)}>Profile</TransitionLink>
						<TransitionLink href="" className="text-muted-foreground" onClick={() => {}}>Documents</TransitionLink>
						<TransitionLink href="" className="text-muted-foreground" onClick={() => {}}>Emergency Contacts</TransitionLink>
						<TransitionLink href="" className="text-muted-foreground" onClick={() => {}}>Billing</TransitionLink>
						
						<CardTitle className="mt-8 text-2xl font-bold">Appointments</CardTitle>
						<TransitionLink href="/manage/appointments" onClick={() => setOpen(false)}>Manage</TransitionLink>
						<TransitionLink href="/create/appointment" onClick={() => setOpen(false)}>Create</TransitionLink>
					
						<CardTitle className="mt-8 text-2xl font-bold">Admin</CardTitle>
						<TransitionLink href="/admin/manage/appointments" onClick={() => setOpen(false)}>Manage</TransitionLink>
					
				</div>
			</SheetContent>
      </Sheet>
  )
}
