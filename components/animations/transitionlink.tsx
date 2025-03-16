"use client";
import Link, { LinkProps } from "next/link";
import React, { ComponentRef } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
	children: React.ReactNode;
	href: string;
	className?: string;
	onClick?: () => void
}

function sleep(ms: number): Promise<void> {
return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
children,
className,
href,
onClick,
...props
}) => {
	const router = useRouter();

	const handleTransition = async (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		e.preventDefault();

		const main = document.querySelector("main");

		main?.classList.add("page-transition");

		await sleep(100);
		if (onClick)
			onClick();
		router.push(href);
		await sleep(100);

		main?.classList.remove("page-transition");
	};
	return (
		<Link className={className} {...props} href={href} onClick={handleTransition}>
			{children}
		</Link>
	);
};