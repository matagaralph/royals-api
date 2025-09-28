import { useId } from 'react';
import type { HTMLDataAttributes } from './internal-types';
import { mergeCn } from '../helpers/mergeClasses';

const sizeMap = {
  small: '16px',
  medium: '32px',
  large: '64px',
};

export type SpinnerProps = {
  /** Sets the width and height of the spinner. */
  size?: keyof typeof sizeMap;
  'aria-label'?: string;
  className?: string;
} & HTMLDataAttributes;

function Spinner({
  size: sizeKey = 'medium',
  'aria-label': ariaLabel,
  className,
  ...rest
}: SpinnerProps) {
  const size = sizeMap[sizeKey];
  const hasHiddenLabel = ariaLabel === undefined;
  const labelId = useId();

  return (
    <span>
      <svg
        height={size}
        width={size}
        viewBox='0 0 16 16'
        fill='none'
        aria-hidden
        aria-label={ariaLabel ?? undefined}
        aria-labelledby={hasHiddenLabel ? labelId : undefined}
        className={mergeCn('animate-spin dark:text-white', className)}
        {...rest}
      >
        <circle
          cx='8'
          cy='8'
          r='7'
          stroke='currentColor'
          strokeOpacity='0.25'
          strokeWidth='2'
          vectorEffect='non-scaling-stroke'
        />
        <path
          d='M15 8a7.002 7.002 0 00-7-7'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          vectorEffect='non-scaling-stroke'
        />
      </svg>
    </span>
  );
}

Spinner.displayName = 'Spinner';

export default Spinner;
