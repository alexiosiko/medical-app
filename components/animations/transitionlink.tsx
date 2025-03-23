'use client';
import Link, { LinkProps } from 'next/link';
import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface TransitionLinkProps extends LinkProps {
  children?: React.ReactNode;
  href: string;
  className?: string;
  searchParams?: Promise<any>;
  onClick?: () => void;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  className,
  href,
  searchParams,
  onClick,
  ...props
}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Navigation has completed
    const main = document.querySelector('main');
    main?.classList.remove('page-transition');
  }, [pathname, searchParams]);

  const handleTransition = async (e: any) => {
    e.preventDefault();
	if (href == pathname)
	{
		window.scrollTo(0, 0); // Scroll to top after navigation
		return;
	}
    if (onClick) 
		onClick();
    const main = document.querySelector('main');
    main?.classList.add('page-transition');
	await sleep(100);
    router.push(href);
	window.scrollTo(0, 0); // Scroll to top after navigation

  };

  return (
    <Link className={`${className} p-3`} {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};
