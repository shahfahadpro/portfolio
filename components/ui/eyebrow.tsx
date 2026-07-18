import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/utils';

type EyebrowProps = ComponentPropsWithoutRef<'p'> & {
  /** Render as a different element (e.g. `h2`) for a correct heading outline. */
  as?: ElementType;
};

/** Small monospaced, uppercase label used above headings and for section labels. */
export function Eyebrow({ as: Tag = 'p', className, children, ...props }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'text-eyebrow text-accent font-mono font-medium uppercase',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
