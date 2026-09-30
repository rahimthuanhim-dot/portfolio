import type { HTMLAttributes, ReactNode } from 'react';

type GlassIntensity = 'subtle' | 'medium' | 'strong';

type GlassPanelProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  as?: 'div' | 'article';
  children: ReactNode;
  intensity?: GlassIntensity;
};

export function GlassPanel({
  className,
  intensity = 'medium',
  as: Element = 'div',
  ...props
}: GlassPanelProps) {
  const classes = ['glass-panel', className].filter(Boolean).join(' ');

  return <Element className={classes} data-glass={intensity} {...props} />;
}
