import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingSkeleton = () => (
	<div className="space-y-4">
		{[...Array(3)].map((_, i) => (
			<div key={i} className="border rounded-lg p-6 bg-white shadow-sm">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
					<div className="space-y-4 flex-1">
						<div className="flex flex-wrap items-center gap-4">
							<Skeleton className="h-6 w-24 rounded-full" />
							<Skeleton className="h-4 w-40" />
						</div>
						
						<div className="flex items-center gap-3 text-sm text-muted-foreground">
							<Skeleton className="h-4 w-4 rounded-full" />
							<Skeleton className="h-4 w-32" />
						</div>
						
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
						
						<div className="flex items-center gap-3 text-sm text-muted-foreground">
							<Skeleton className="h-4 w-4 rounded-full" />
							<Skeleton className="h-4 w-48" />
						</div>
					</div>
					
					<div className="flex flex-col gap-2 min-w-[150px]">
						<Skeleton className="h-9 w-full" />
						<Skeleton className="h-9 w-full" />
					</div>
				</div>
			</div>
		))}
	</div>
);


export default LoadingSkeleton;