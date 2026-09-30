import type { ButtonHTMLAttributes } from 'react';
import type { AnchorHTMLAttributes } from 'react';

type ButtonStyle = {
  variant?: 'primary' | 'secondary' | 'glass';
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyle & { as?: 'button' };
type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyle & { as: 'a' };

function buttonClasses(variant: ButtonStyle['variant'], className?: string) {
  return ['button', `button--${variant ?? 'primary'}`, className]
    .filter(Boolean)
    .join(' ');
}

export function Button(props: ButtonProps | AnchorButtonProps) {
  if (props.as === 'a') {
    const { as: _as, className, variant, ...anchorProps } = props;
    return (
      <a
        className={buttonClasses(variant, className)}
        {...anchorProps}
      />
    );
  }

  const { as: _as, className, variant, ...buttonProps } = props;

  return (
    <button
      className={buttonClasses(variant, className)}
      {...buttonProps}
    />
  );
}
