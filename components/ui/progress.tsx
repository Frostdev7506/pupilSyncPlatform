'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    // Ensure value is a number and has a default
    const safeValue = typeof value === 'number' ? value : 0;
    const safeMax = typeof max === 'number' && max > 0 ? max : 100;

    // Calculate percentage
    const percentage = Math.min(100, Math.max(0, (safeValue / safeMax) * 100));

    return (
      <div
        ref={ref}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
          className
        )}
        {...props}
      >
        <div
          className="h-full w-full bg-primary transition-all"
          style={{
            transform: `translateX(-${100 - percentage}%)`
          }}
          aria-valuemin={0}
          aria-valuemax={safeMax}
          aria-valuenow={safeValue}
          role="progressbar"
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
