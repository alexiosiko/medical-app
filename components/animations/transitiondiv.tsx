"use client"

import React, { ReactNode } from 'react';
import { AnimatePresence, motion, HTMLMotionProps } from 'framer-motion';

interface TransitionDivProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children?: ReactNode; // Make children optional
}

const TransitionDiv = React.forwardRef<HTMLDivElement, TransitionDivProps>(
  ({ children, ...props }, ref) => (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
);

TransitionDiv.displayName = 'TransitionDiv';

export default TransitionDiv;
