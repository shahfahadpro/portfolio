import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type EyebrowProps = ComponentPropsWithoutRef<'p'>;

/** Small monospaced, uppercase label used above headings and for metadata. */
export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-eyebrow text-accent font-mono font-medium uppercase',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
