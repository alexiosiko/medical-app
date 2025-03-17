export default async function handleTransition(router: any, href: string) {
	// Add a transition class to the main content
	const main = document.querySelector('main');
	main?.classList.add('page-transition');
  
	// Wait for the transition to complete (adjust the duration as needed)
	await new Promise(resolve => setTimeout(resolve, 300));
  
	window.scrollTo(0, 0);
	
	// Perform the navigation
	router.push(href);
  };