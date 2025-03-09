"use client"

import { useAnimate, motion } from "framer-motion"
import React, { useEffect } from "react";

export default function Animate({ children, playOnAwake, initial = { y: 100, opacity: 0 }, delay = 0.1, className, id }: { 
	children: React.ReactNode,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	initial?: any,
	delay?: number,
	className?: string,
	id?: string,
	playOnAwake?: boolean
}) {
	const [scope, animate] = useAnimate();
	useEffect(() => {
		if (playOnAwake) {
		  animate(scope.current, { y: 0, opacity: 1 }, { delay });
		}
	}, [])
	return (
		<motion.div
			id={id}
			className={className}
			ref={scope}
			initial={initial}
			onViewportEnter={() => animate(scope.current, { y: 0, x: 0, opacity: 100}, { delay: delay})}
		>
			{children}
		</motion.div>
	)
}