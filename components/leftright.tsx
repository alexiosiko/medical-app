import React, { ReactNode } from 'react'
import { motion } from 'framer-motion';
import Animate from './animations/animate';

export default function LeftRight({children, className}: {
	children: ReactNode[],
	className?: string,
}) {
  return (
	<div className={`flex  justify-center gap-24 ${className}`}>

			{children[0]}
			{children[1]}
	</div>
  )
}
