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

	useEffect(() => {
		if (playOnAwake && window.innerWidth > maxWidth) 
		{
			// animate(scope.current, { y: 0, opacity: 1 }, { delay });
		}
	}, [])

	
	return (
		<div
			// id={id}
			className={className}
			// ref={scope}
			// initial={initial}
			// onViewportEnter={() => animate(scope.current, { y: 0, x: 0, opacity: 100}, { delay: delay})}
		>
			{children}
		</div>
	)
}
