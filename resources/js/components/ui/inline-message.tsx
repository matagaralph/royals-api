import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi2';
import { GoAlertFill, GoAlert } from 'react-icons/go';
import type { ComponentPropsWithoutRef } from 'react';
import { mergeCn } from '@/helpers/mergeClasses';

type MessageVariant = 'critical' | 'success' | 'unavailable' | 'warning';

export type InlineMessageProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Specify the size of the InlineMessage
   */
  size?: 'small' | 'medium';

  /**
   * Specify the type of the InlineMessage
   */
  variant: MessageVariant;
};

const icons: Record<MessageVariant, React.ReactNode> = {
  warning: <GoAlert className='w-4 h-4 mt-0.5 flex-shrink-0' />,
  critical: <GoAlert className='w-4 h-4 mt-0.5 flex-shrink-0' />,
  success: <HiOutlineCheckCircle className='w-4 h-4 mt-0.5 flex-shrink-0' />,
  unavailable: <GoAlert className='w-4 h-4 mt-0.5 flex-shrink-0' />,
};

const smallIcons: Record<MessageVariant, React.ReactNode> = {
  warning: <GoAlertFill className='w-3 h-3 mt-0.5 flex-shrink-0' size={12} />,
  critical: <GoAlertFill className='w-3 h-3 mt-0.5 flex-shrink-0' size={12} />,
  success: <HiCheckCircle className='w-3 h-3 mt-0.5 flex-shrink-0' size={12} />,
  unavailable: (
    <GoAlertFill className='w-3 h-3 mt-0.5 flex-shrink-0' size={12} />
  ),
};

export function InlineMessage({
  children,
  className,
  size = 'medium',
  variant,
  ...rest
}: InlineMessageProps) {
  const icon = size === 'small' ? smallIcons[variant] : icons[variant];

  const sizeClasses = {
    small: 'text-xs leading-[1.6666]',
    medium: 'text-sm leading-[1.4285]',
  };

  const variantClasses = {
    warning: 'text-warning',
    critical: 'text-danger',
    success: 'text-success',
    unavailable: 'text-default',
  };

  return (
    <div
      {...rest}
      className={mergeCn(
        'grid grid-cols-[auto_1fr] gap-x-2 items-start',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {icon}
      <div>{children}</div>
    </div>
  );
}
