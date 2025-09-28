import { mergeCn } from '@/helpers/mergeClasses';
import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  testID?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export const ButtonBase = ({
  children,
  testID,
  className,
  onClick,
  type = 'button',
  disabled = false,
  ref,
  ...rest
}: ButtonBaseProps) => {
  return (
    <button
      className={mergeCn('flex cursor-pointer', className)}
      data-testid={testID}
      disabled={disabled}
      ref={ref}
      type={type}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

ButtonBase.displayName = 'ButtonBase';
