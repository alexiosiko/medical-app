import Image from 'next/image'
import React from 'react'
import { DropDownMenu } from './dropdownmenu'
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
  } from '@clerk/nextjs'
  import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"
import { Button } from '../ui/button'
import { PiSignInLight } from 'react-icons/pi'
import Animate from '../animations/animate'
import Link from 'next/link'
import { Sidebar } from './sidebar'

export default function NavBar() {
  return (
		<Animate
			playOnAwake
			className='grid grid-cols-3 h-24 bg-background z-10 rounded-3xl fixed w-[95%] max-w-7xl top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2
			shadow-lg items-center place-items-center'
			initial={{ y: -200 }}
			>
			<DropDownMenu />
			<div className='md:hidden'>
				<Sidebar />
			</div>
			<Link href="/">
				<Image className='object-contain' src="/logos/TDH_Logo_Full_Color_RGB.svg" height={200} width={200} alt='logo.svg' />
			</Link>
			<div className='flex gap-4'>
				<SignedOut>
					<SignInButton>
						<Button variant="link">
							<PiSignInLight className='text-primary' />
							Sign In
						</Button>
					</SignInButton>
					<SignUpButton>
						<Button className='max-md:hidden'>Register Now</Button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<NavigationMenu className='max-md:hidden'>
						<NavigationMenuList>
							<NavigationMenuItem>
							<NavigationMenuTrigger>Profile</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className='flex flex-col gap-1 w-42'>
									<NavigationMenuLink href="/profile">Personal Information</NavigationMenuLink>
									{/* <NavigationMenuLink href="/">History</NavigationMenuLink> */}
									{/* <NavigationMenuLink href="/">Bills</NavigationMenuLink> */}
								</div>
							</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
						<UserButton />
				</SignedIn>
			</div>
		</Animate>
  )
}
