import LeftRight from '@/components/leftright'
import { Button } from '@/components/ui/button'
import { TransitionCard, CardContent, CardDescription, CardHeader, CardTitle, Card, CardFooter } from '@/components/ui/card'
import ColorBanner from '@/components/ui/colorbanner'
import Image from 'next/image'
import React from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
  } from "@/components/ui/accordion"
import Title from '@/components/ui/title'
import { TransitionLink } from '@/components/animations/transitionlink'
import { FaCircleArrowRight } from "react-icons/fa6";
import TypewriterText from '@/components/animations/typewriter'
import Animate from '@/components/animations/animate'
import { SignUpButton } from '@clerk/nextjs'

  

export default function Page() {
  return (
	<div>
		<p className='text-center'>Victoria, this IS the sample.</p>
		<LeftRight>
			<div className='md:w-[60%] md:my-36 '>
				<Animate>
					<TypewriterText className='text-5xl max-md:text-center mb-10 ml-4 max-md:h-64 md:h-36' text='AI research and products that put safety at frontier' />
				</Animate>
				<Animate delay={1} className='flex max-md:flex-col max-md:items-center  md:space-x-8 space-y-8'>
					<Card className='h-84 w-72'>
						<CardHeader>
							<CardTitle>Get Started</CardTitle>
						</CardHeader>
						<CardContent>
							<Title>
								Schedule an Appointment with a Doctor
							</Title>
							<p>
								Choose from experienced doctors, through video-call, text, or in-person
							</p>
						</CardContent>
						<CardFooter>
							<TransitionLink href='/create/appointment' className='grow'>
								<Button className='w-full'>Book Now</Button>
							</TransitionLink>
						</CardFooter>
					</Card>
					<Card className='h-84 w-72'>
						<CardHeader>
							<CardTitle>Claude.ai</CardTitle>
						</CardHeader>
						<CardContent>
							<Title>
								Have a Personalized Account
							</Title>
							<p>
							Have one accont that stores your medical history, manage appointments, and more.
							</p>
						</CardContent>
						<CardFooter>
							<SignUpButton>
								<Button  className='grow' variant="outline" >Sign In / Create</Button>
							</SignUpButton>
						</CardFooter>
					</Card>
				</Animate>
			</div>
			<Animate delay={1.5} className='max-lg:hidden grow'> 
				<Image loading='eager' src="/images/art/hands-and-heart.png" alt='group.png' className='w-full' height={600} width={600}/>
			</Animate>
		</LeftRight>
		<Card className='mb-24 bg-secondary mt-12' id='about'>
			<CardHeader>
				<CardHeader>
					<CardTitle>About Us</CardTitle>
				</CardHeader>
			</CardHeader>
			<CardContent>
				<div className='md:grid grid-cols-2 md:space-x-8 '>
					<div className='space-y-8 max-md:text-center'>
						<h1>This can be a section about the doctors.</h1>
						<p>You can talk about who they are, what they do, and their goals for example. And anything of information blah blah blah
						</p>
						<Button>Read more about us</Button>
					</div>
					<div className='flex max-md:flex-col max-md:mt-4 items-center gap-8'>
					<TransitionLink href='/' className='flex items-center gap-4 ' >
						<Card className='h-72 hover:bg-accent transition'>
							<CardHeader>
								<CardTitle>
									See our doctors
								</CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col justify-center grow'>
								<Image alt='head.png' className='h-24 object-contain ' src="/images/art/head.png" height={100} width={200} />
							</CardContent>
							<CardFooter  className='flex gap-4'>
									Learn more
								<FaCircleArrowRight />
							</CardFooter>
						</Card>
					</TransitionLink>
					<TransitionLink href='/' className='flex items-center gap-4 ' >
						<Card className='h-72 hover:bg-accent transition'>
							<CardHeader>
								<CardTitle>
									See our doctors
								</CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col justify-center grow'>
								<Image alt='head.png' className="h-24 object-contain " src="/images/art/paper-and-hand.png" height={100} width={200} />
							</CardContent>
							<CardFooter className='flex gap-4'>
								Learn more <FaCircleArrowRight />
							</CardFooter>
						</Card>
					</TransitionLink>
					</div>
				</div>
			</CardContent>
		</Card>
	

		<Card className='relative py-6 flex mb-24 flex-col '>
			<h1 className='my-8 ml-4'>
				What we can do
			</h1>
			<div className='md:grid space-y-8 grid-cols-3 gap-8 justify-center w-full'>
					{yearsexperiencesidebannerdata.map((data, index) => (
				<TransitionCard key={index} className="flex bg-background flex-col gap-4">
					<CardHeader>
						<CardTitle className='max-md:text-center'>{data.title}</CardTitle>
					</CardHeader>
					<CardContent className='max-md:text-center'>
						<h1 className='text-2lg! mb-4'>Example {index}</h1>
						{data.description}
					</CardContent>
				</TransitionCard>
				))}
			</div>

		</Card>
		<LeftRight className='gap-12 mb-24 pt- '>
			<Image className='md:w-[50%]' src="/images/art/helping.png" alt='get-started.png' width={400} height={400}  />
			<Card className='md:w-[50%]'> 
				<CardHeader>
					<CardTitle>Get Started</CardTitle>
				</CardHeader>
				<CardContent>
					<h1>Come See Us!</h1>
					<p>This is just random text: Anthropic is an AI safety and research company based in San Francisco. Our interdisciplinary team has experience across ML, physics, policy, and product. Together, we generate research and create reliable, beneficial AI systems.</p>
				</CardContent>
				<CardFooter>
					<TransitionLink href='/create/appointment' className=''>
						<Button>Get Started</Button>
					</TransitionLink>
				</CardFooter>
			</Card>
		</LeftRight>
	
	</div>
  )
}


const homelearnmoredata = [
	{
		title: "Employers",
		description: "Give your employees the flexible care solutions they need.",
		href: "/images/employers/rc-employers.png",
	},
	{
		title: "Employers1",
		description: "Give your employees the flexible care solutions they need.",
		href: "/images/employers/rc-health-plans.png",
	},
	{
		title: "Employers2",
		description: "Give your employees the flexible care solutions they need.",
		href: "/images/employers/rc-hospitals.png",
	},
]

const yearsexperiencesidebannerdata = [
	{
	  title: "Unlock value",
	  description: "A broad portfolio of integrated solutions helps control costs for employers and health plans while enabling providers to improve patient care",
	},
	{
	  title: "Improve results",
	  description: "A virtual experience that bridges both physical and mental healthcare at every step of a patient's journey amplifies positive health outcomes",
	},
	{
	  title: "Create an experience people use and love",
	  description: "The simple yet sophisticated interface and seamless data sharing across solutions leads to increased satisfaction for both the patient and provider",
	},
];