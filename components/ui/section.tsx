import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = ComponentPropsWithoutRef<'section'>;

/** A page section with consistent vertical rhythm. */
export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn('py-16 sm:py-20 lg:py-28', className)} {...props}>
      {children}
    </section>
  );
}
