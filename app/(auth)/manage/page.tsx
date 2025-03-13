"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner';

export default function Page() {
	const fetch = async () => {
		// toast.success("Operation Success");
		toast.error("Operation failed");
		// try {
		// 	const res = await axios.get('/api/usersd');
		// 	console.log(res.data);
		// } catch (e) {
		// 	console.error(e);
		// }
	}
  return (
	<div>
		<Button onClick={fetch}>Fetch</Button>
	</div>
  )
}
