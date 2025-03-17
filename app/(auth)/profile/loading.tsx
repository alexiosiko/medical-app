"use client"

import { motion, AnimatePresence } from 'framer-motion';
import { TransitionCard, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function Loading() {
  return (
        <TransitionCard className='w-full max-w-md mx-auto'>
          <CardHeader>
			<Skeleton className='w-full h-12' />
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <Skeleton className='w-full h-6' />
              <Skeleton className='w-full h-12' />
            </div>
            <div className='space-y-2 mt-4'>
              <Skeleton className='w-full h-6' />
              <Skeleton className='w-full h-12' />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className='w-24 h-12' />
          </CardFooter>
        </TransitionCard>

  );
}
