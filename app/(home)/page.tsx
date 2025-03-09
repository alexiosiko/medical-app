import LeftRight from '@/components/leftright'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ColorBanner from '@/components/ui/colorbanner'
import Description from '@/components/ui/description'
import Header from '@/components/ui/header'
import SubHeader from '@/components/ui/subheader'
import Image from 'next/image'
import React from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
  } from "@/components/ui/accordion"
  

export default function Page() {
  return (
	<div>
		<LeftRight>
			<div className='flex flex-col gap-4 fit'>
				<Header>Virtual care solutions for organizations</Header>
				<Description>Discover an integrated virtual care platform that offers comprehensive solutions for the diverse needs of your employees, members and providers.</Description>
				<Button className='w-min' >Learn More</Button>
			</div>
			<Image src="/images/group.png" alt='group.png' className='w-full' height={600} width={600}/>
		</LeftRight>

		<div className='grid grid-cols-3 gap-24 my-24'>
			{homelearnmoredata.map(data => 
				<Card key={data.title} className='relative'>
					<CardHeader>
						<CardTitle>
							{data.title}
						</CardTitle>
					</CardHeader>
					<CardContent className=' flex flex-col'>
						<p>{data.description}</p>
						<Button variant="link" className='-ml-3'>
							<FaArrowAltCircleRight size={48}/>
							Learn More
						</Button>
						<Image className='object-fit bottom-4  self-end' src={data.href} width={300} height={300} alt='image.png' />
						
					</CardContent>
				</Card>
			)}
		</div>

		<div className='relative py-6 flex mb-24 flex-col items-center text-background'>
			<ColorBanner />
			<SubHeader className='text-background my-8'>
				Put our 20+ years of virtual care expertise to work for you
			</SubHeader>
			<div className='grid grid-cols-3 gap-12 '>
					{yearsexperiencesidebannerdata.map((data, index) => (
				<Card key={index} className="flex bg-primary text-background border-none flex-col gap-4">
					<CardHeader>
					<CardTitle>{data.title}</CardTitle>
					</CardHeader>
					<CardContent>{data.description}</CardContent>
				</Card>
				))}
			</div>

			<Button variant="secondary" className='mt-12'>Get in Touch</Button>
		</div>

		<LeftRight>
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
					Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it styled?</AccordionTrigger>
					<AccordionContent>
					Yes. It comes with default styles that matches the other
					components&apos; aesthetic.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Is it animated?</AccordionTrigger>
					<AccordionContent>
					Yes. Its animated by default, but you can disable it if you prefer.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Image alt='organization.png' src="/images/organizations/Group 315.png" className='object-contain' width={200} height={200} />
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
		href: "/images/employers/rc-employers.png",
	},
	{
		title: "Employers2",
		description: "Give your employees the flexible care solutions they need.",
		href: "/images/employers/rc-employers.png",
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