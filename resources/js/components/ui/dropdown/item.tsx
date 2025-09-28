import { mergeCn } from '@/helpers/mergeClasses';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ComponentType, HTMLAttributes, ReactNode } from 'react';
import { Link } from '../link';

type Props = Omit<DropdownMenu.DropdownMenuItemProps, 'onClick'> & {
    label: string;
    description?: ReactNode;
    href?: string;
    Icon?: ComponentType<HTMLAttributes<SVGSVGElement>>;
    rightSlot?: ReactNode;
    disabled?: boolean;
    destructive?: boolean;
    openInNewTab?: boolean;
    preventAutoClose?: boolean;
};

export function Item({
    label,
    description,
    Icon,
    rightSlot,
    href,
    openInNewTab,
    disabled,
    destructive,
    onSelect,
    preventAutoClose,
    ...rest
}: Props) {
    const textItem = (
        <DropdownMenu.Item
            aria-disabled={disabled}
            className={mergeCn(
                'group relative z-40 flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 transition-colors select-none',
                'hover:outline-0 hocus:bg-hover',
                disabled && 'cursor-default opacity-60 hocus:bg-default',
            )}
            onSelect={(event) => {
                // prevent default behavior of closing the menu without using pointer-events-none on the
                // whole item
                if (disabled) {
                    event.preventDefault();
                    return;
                }
                if (preventAutoClose) {
                    event.preventDefault();
                } else {
                    // note(simek): workaround for Radix primitives interaction blocking styles desync,
                    // when clicking Dropdown option spawns another Radix primitive utilizing Portal, i.e. Dialog
                    document.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Escape' }),
                    );
                }
                onSelect?.(event);
            }}
            {...rest}
        >
            <div className='flex flex-1 flex-col gap-0.5'>
                <div
                    className={mergeCn(
                        'flex items-center justify-between transition-colors',
                        disabled && 'pointer-events-none',
                    )}
                >
                    <div className='flex items-center gap-2'>
                        {Icon && (
                            <Icon
                                className={mergeCn(
                                    'icon-sm text-icon-default transition-colors',
                                    destructive
                                        ? 'text-icon-danger group-data-[highlighted]:text-icon-danger group-hocus:text-icon-danger'
                                        : 'group-data-[highlighted]:text-icon-secondary group-hocus:text-icon-secondary',
                                )}
                            />
                        )}
                        <span
                            className={mergeCn(
                                'text-sm font-medium transition-colors',
                                destructive
                                    ? 'text-danger group-data-[highlighted]:text-danger group-hocus:text-danger'
                                    : 'text-default group-data-[highlighted]:text-secondary group-hocus:text-secondary',
                            )}
                        >
                            {label}
                        </span>
                    </div>
                    {typeof rightSlot === 'string' ? (
                        <span className='text-xs text-secondary'>
                            {rightSlot}
                        </span>
                    ) : (
                        rightSlot
                    )}
                </div>
                {description && typeof description === 'string' ? (
                    <span className='text-xs leading-[18px] text-tertiary'>
                        {description}
                    </span>
                ) : null}
                {description && typeof description !== 'string'
                    ? description
                    : null}
            </div>
        </DropdownMenu.Item>
    );

    if (href) {
        return (
            <Link href={href} openInNewTab={openInNewTab}>
                {textItem}
            </Link>
        );
    }
    return textItem;
}
