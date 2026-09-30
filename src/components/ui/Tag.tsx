import type { HTMLAttributes } from 'react';

type TagProps = HTMLAttributes<HTMLSpanElement>;

export function Tag({ className, ...props }: TagProps) {
  const classes = ['tag', className].filter(Boolean).join(' ');

  return <span className={classes} {...props} />;
}
