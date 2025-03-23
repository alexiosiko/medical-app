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

  

export default function Page() {
  return (
	<div>
		<p className='text-center'>Victoria, this IS the sample.</p>
		<LeftRight>
			<div className='md:w-[60%] md:my-36 max-md:my-1 '>
				<h1 className='text-5xl mb-10 ml-8'>AI research and products that put safety at frontier</h1>
				<div className='md:grid md:grid-cols-2 md:space-x-8 space-y-8'>
					<Card className='h-72'>
						<CardHeader>
							<CardTitle>Claude.ai</CardTitle>
						</CardHeader>
						<CardContent>
							<Title>Meet Claude 3.7 Sonnet
							</Title>
							<p>
							Claude 3.7 Sonnet, our most intelligent AI model, is now available.
							</p>
						</CardContent>
						<CardFooter>
							<Button className='grow' >Book Now</Button>
						</CardFooter>
					</Card>
					<Card className='h-72'>
						<CardHeader>
							<CardTitle>Claude.ai</CardTitle>
						</CardHeader>
						<CardContent>
							<Title>Meet Claude 3.7 Sonnet
							</Title>
							<p>
							Meet Claude 3.7 Sonnet
							Claude 3.7 Sonnet, our most intelligent AI model, is now available.
							</p>
						</CardContent>
						<CardFooter>
							<Button className='grow' variant="outline" >Book Now</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
			<div className='max-lg:hidden grow'> 
				<Image loading='eager' src="/images/art/hands-and-heart.png" alt='group.png' className='w-full' height={600} width={600}/>
			</div>

		</LeftRight>

		<Card className='mb-24 bg-secondary'>
			<CardHeader>
				<CardHeader>
					<CardTitle>About Us</CardTitle>
				</CardHeader>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-2 space-x-8'>
					<div className=' space-y-8'>
						<h1>Claude 3.7 Sonnet and Other Stuff</h1>
						<p>Introducing Claude 3.7 Sonnet, our most intelligent model yet and the first hybrid reasoning model. We’re also launching Claude Code, an agentic tool for coding.</p>
						<Button>Read more about us</Button>
					</div>
					<div className='flex gap-8'>
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
	

		<div className='relative py-6 flex mb-24 flex-col '>
			<h1 className='my-8 ml-4'>
				What we can do
			</h1>
			<div className='grid grid-cols-3 gap-8 justify-center w-full'>
					{yearsexperiencesidebannerdata.map((data, index) => (
				<TransitionCard key={index} className="flex bg-white flex-col gap-4">
					<CardHeader>
						<CardTitle>{data.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<h1 className='text-2lg! mb-4'>Title {index}</h1>
						{data.description}
					</CardContent>
				</TransitionCard>
				))}
			</div>

		</div>

	
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