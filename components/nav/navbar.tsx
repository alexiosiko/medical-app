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
import { Sidebar } from './sidebar'
import { CardDescription, CardTitle } from '../ui/card'
import { TransitionLink } from '../animations/transitionlink'

export default function NavBar() {
  return (
		<div
			className='grid grid-cols-3 h-24 bg-background z-10 rounded-3xl fixed w-[95%] max-w-7xl md:top-16 max-md:top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2
			shadow-lg items-center place-items-center'
			>
			<DropDownMenu />
			<div className='md:hidden'>
				<Sidebar />
			</div>
			<TransitionLink href="/">
				<Image className='object-contain' src="/logos/TDH_Logo_Full_Color_RGB.svg" height={200} width={200} alt='logo.svg' />
			</TransitionLink>
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
							<NavigationMenuTrigger>Account</NavigationMenuTrigger>
							<NavigationMenuContent className='flex flex-col'>
									<TransitionLink href='/profile' className='hover:bg-accent p-2 rounded-sm'>
										<CardTitle className='text-md'>Profile</CardTitle>
										<CardDescription>Basic information about you, your contact information and your address</CardDescription>
									</TransitionLink>
									<TransitionLink href='/' className='hover:bg-accent p-2 rounded-sm'>
										<CardTitle className='text-md'>Documents (Not Done)</CardTitle>
										<CardDescription>Upload your personal health documents file documents</CardDescription>
									</TransitionLink>
									<TransitionLink href='/' className='hover:bg-accent p-2 rounded-sm'>
										<CardTitle className='text-md'>Emergency Contacts (Not Done)</CardTitle>
										<CardDescription>Tell us who to contact and how to reach them if you have a health emergency</CardDescription>
									</TransitionLink>
									<TransitionLink href='/' className='hover:bg-accent p-2 rounded-sm'>
										<CardTitle className='text-md'>Billings (Not Done)</CardTitle>
									</TransitionLink>
							</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<UserButton />
				</SignedIn>
			</div>
		</div>
  )
}
