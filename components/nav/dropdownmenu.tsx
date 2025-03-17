"use client"

import * as React from "react"
import {
NavigationMenu,
NavigationMenuContent,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { TransitionLink } from "../animations/transitionlink"
import { CardDescription, CardTitle } from "../ui/card"

const components: { title: string; href: string; description: string }[] = [
{
	title: "Alert Dialog",
	href: "/docs/primitives/alert-dialog",
	description:
	"A modal dialog that interrupts the user with important content and expects a response.",
},
{
	title: "Hover Card",
	href: "/docs/primitives/hover-card",
	description:
	"For sighted users to preview content available behind a link.",
},
{
	title: "Progress",
	href: "/docs/primitives/progress",
	description:
	"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
},
{
	title: "Scroll-area",
	href: "/docs/primitives/scroll-area",
	description: "Visually or semantically separates content.",
},
{
	title: "Tabs",
	href: "/docs/primitives/tabs",
	description:
	"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
},
{
	title: "Tooltip",
	href: "/docs/primitives/tooltip",
	description:
	"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
},
]

export function DropDownMenu() {
return (
	
	<NavigationMenu className="max-md:hidden flex gap-4">
	<NavigationMenuList>
		<NavigationMenuItem>
		<NavigationMenuTrigger>Appointments</NavigationMenuTrigger>
			<NavigationMenuContent className="flex flex-col w-96">
				<TransitionLink href='/create/appointment' className="hover:bg-accent rounded-sm">
					<CardTitle className='text-md'>Book Appointment</CardTitle>
					<CardDescription>Book a time and a place to get started!</CardDescription>
				</TransitionLink>
				<TransitionLink href='/manage/appointments' className="hover:bg-accent rounded-sm">
					<CardTitle className='text-md'>Manage</CardTitle>
					<CardDescription>Manage your appointments</CardDescription>
				</TransitionLink>
			</NavigationMenuContent>
		</NavigationMenuItem>
	</NavigationMenuList>
	<NavigationMenuLink href="/">Home</NavigationMenuLink>
	</NavigationMenu>
)
}


type NavigationMenuItem = {
	title: string,
	href: string,
	description: string,
}
// const individuals: NavigationMenuItem[] = [
// 	{
// 		title: "Alert Dialog1",
// 		href: "/docs/primitives/alert-dialog",
// 		description:
// 		  "A modal dialog that interrupts the user with important content and expects a response.",
// 	  },
// 	  {
// 		title: "Hover Card1",
// 		href: "/docs/primitives/hover-card",
// 		description:
// 		  "For sighted users to preview content available behind a link.",
// 	  },
// 	  {
// 		title: "Progress1",
// 		href: "/docs/primitives/progress",
// 		description:
// 		  "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
// 	  },
// 	  {
// 		title: "Scroll-area1",
// 		href: "/docs/primitives/scroll-area",
// 		description: "Visually or semantically separates content.",
// 	  },
// 	  {
// 		title: "Tabs1",
// 		href: "/docs/primitives/tabs",
// 		description:
// 		  "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
// 	  },
// 	  {
// 		title: "Tooltip1",
// 		href: "/docs/primitives/tooltip",
// 		description:
// 		  "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
// 	  },
// ]
// const organizations: NavigationMenuItem[] = [
// 	  {
// 		title: "Scroll-area2",
// 		href: "/docs/primitives/scroll-area",
// 		description: "Visually or semantically separates content.",
// 	  },
// 	  {
// 		title: "Tabs2",
// 		href: "/docs/primitives/tabs",
// 		description:
// 		  "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
// 	  },
// 	  {
// 		title: "Tooltip2",
// 		href: "/docs/primitives/tooltip",
// 		description:
// 		  "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
// 	  },
// ]
// const clinicians: NavigationMenuItem[] = [
// 	  {
// 		title: "Scroll-area3",
// 		href: "/docs/primitives/scroll-area",
// 		description: "Visually or semantically separates content.",
// 	  },
// 	  {
// 		title: "Tabs3",
// 		href: "/docs/primitives/tabs",
// 		description:
// 		  "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
// 	  },
// 	  {
// 		title: "Tooltip3",
// 		href: "/docs/primitives/tooltip",
// 		description:
// 		  "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
// 	  },
// ]