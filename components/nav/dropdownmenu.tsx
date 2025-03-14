"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
NavigationMenu,
NavigationMenuContent,
NavigationMenuItem,
NavigationMenuLink,
NavigationMenuList,
NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Button } from "../ui/button"

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
		<NavigationMenuContent>
			<ul className="flex w-96">
				<li className="w-1/2">
					<NavigationMenuLink asChild>
					<Link
						className="flex h-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
						href="/"
					>
						{/* <Icons.logo className="h-6 w-6" /> */}
						<div className="mb-2 mt-4 text-lg font-medium">
						shadcn/ui
						</div>
						<p className="text-sm leading-tight text-muted-foreground">
						Beautifully designed components built with Radix UI and
						Tailwind CSS.
						</p>
					</Link>
					</NavigationMenuLink>
				</li>
				<div className="px-2">
					<ListItem href="/book" title="Book">
						Create an appointment with us!
					</ListItem>
					<ListItem href="/docs" title="Contact">
						Have a question? Reach out!
					</ListItem>
				</div>
			</ul>
		</NavigationMenuContent>
		</NavigationMenuItem>
	</NavigationMenuList>
	<NavigationMenuLink href="/">Home</NavigationMenuLink>
	</NavigationMenu>
)
}

const ListItem = React.forwardRef<
React.ComponentRef<"a">,
React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
return (
	<li>
	<NavigationMenuLink asChild>
		<Link
			href="/"
		ref={ref}
		className={cn(
			"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
			className
		)}
		{...props}
		>
		<div className="text-sm font-medium leading-none">{title}</div>
		<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
			{children}
		</p>
		</Link>
	</NavigationMenuLink>
	</li>
)
})
ListItem.displayName = "ListItem"

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