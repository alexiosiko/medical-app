"use client"

import { useAnimate, motion } from "framer-motion"
import React, { useEffect, useState } from "react";

export default function Animate({ 
	children, 
	playOnAwake, 
	initial = { y: 100, opacity: 0 }, 
	delay = 0.1, 
	className, 
	id, 
	maxWidth = 768 
}: { 
	children: React.ReactNode,
	initial?: any,
	delay?: number,
	className?: string,
	id?: string,
	playOnAwake?: boolean,
	maxWidth?: number
}) {
	const [scope, animate] = useAnimate();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true); // Ensures this runs only on the client
		if (playOnAwake && window.innerWidth > maxWidth) {
			animate(scope.current, { y: 0, opacity: 1 }, { delay });
		}
	}, [])

	return (
		<motion.div
			id={id}
			className={className}
			ref={scope}
			initial={isClient && window.innerWidth > maxWidth ? initial : { opacity: 1, y: 0 }}
			onViewportEnter={() => {
				if (isClient && window.innerWidth > maxWidth) {
					animate(scope.current, { y: 0, x: 0, opacity: 1 }, { delay });
				}
			}}
		>
			{children}
		</motion.div>
	)
}
