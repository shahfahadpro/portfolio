import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type ProseProps = ComponentPropsWithoutRef<'div'>;

/**
 * Readable text column capped near 68ch for comfortable line length. Body styling
 * comes from the base layer; this mainly constrains measure and spacing.
 */
export function Prose({ className, children, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        'text-ink-muted [&_strong]:text-ink max-w-[68ch] text-base [&_p+p]:mt-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
