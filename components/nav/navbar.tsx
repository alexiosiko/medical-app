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
			<div className="max-md:hidden">
				<DropDownMenu />
			</div>
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
					<Link href="/manage" className='max-md:hidden'><Button variant="secondary">Manage</Button></Link>
					<UserButton />
				</SignedIn>
			</div>
		</Animate>
  )
}
