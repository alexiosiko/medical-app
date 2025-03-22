import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

const isProtectedRoute = createRouteMatcher([
	'/create/appointment',
	'/manage/appointments',
	'/profile'
]);

export default clerkMiddleware(async (auth, req) => {
	const deniedUrl = new URL('/denied', req.url);
	if (isProtectedRoute(req))
		await auth.protect();
	
	if (isAdminRoute(req)) {
		const userId = (await auth()).userId;
		if (!userId)
			return NextResponse.redirect(deniedUrl);

		const metadata = (await (await clerkClient()).users.getUser(userId)).publicMetadata;
		if (metadata.role == "admin")
			return NextResponse.next();
		else
			return NextResponse.redirect(deniedUrl);
	}

});

export const config = {
  matcher: [
	// Skip Next.js internals and all static files, unless found in search params
	'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
	// Always run for API routes
	'/(api|trpc)(.*)',
  ],
};
