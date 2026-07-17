import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  /** Render as a different element (e.g. `header`, `footer`, `nav`). */
  as?: ElementType;
};

/** Centered content column with responsive gutters. */
export function Container({ as: Tag = 'div', className, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}
