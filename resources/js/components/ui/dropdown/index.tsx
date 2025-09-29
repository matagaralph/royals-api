import * as RawRadixDropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';

import { mergeCn } from '@/helpers/mergeClasses';
import { Item } from './item';

// note(simek): Radix Jest ESM issue workaround: https://github.com/radix-ui/primitives/issues/1848
let RadixDropdownMenuPrimitive = {
    default: undefined,
    ...RawRadixDropdownMenuPrimitive,
};
RadixDropdownMenuPrimitive =
    RadixDropdownMenuPrimitive.default ?? RadixDropdownMenuPrimitive;
const { Trigger, Root, Portal, Content, Arrow } = RadixDropdownMenuPrimitive;

type Props = RawRadixDropdownMenuPrimitive.DropdownMenuContentProps & {
    trigger: ReactNode;
};

function DropdownImpl({
    children,
    trigger,
    className,
    sideOffset = 0,
    collisionPadding = { left: 16, right: 16 },
    side = 'bottom',
    ...rest
}: Props) {
    return (
        <Root>
            <Trigger asChild>{trigger}</Trigger>
            <Portal>
                <Content
                    className={mergeCn(
                        'z-50 flex min-w-[180px] flex-col gap-0.5 rounded-md border border-default bg-default p-1 shadow-md',
                        'data-[side=bottom]:animate-slideUpAndFadeIn will-change-[opacity,transform]',
                        className,
                    )}
                    side={side}
                    sideOffset={sideOffset}
                    collisionPadding={collisionPadding}
                    {...rest}
                >
                    <Arrow asChild>
                        <div className='relative -top-1 size-2.5 rotate-45 border-r border-b border-default bg-default' />
                    </Arrow>
                    {children}
                </Content>
            </Portal>
        </Root>
    );
}

function MenuSeparator({
    className,
    ...props
}: React.ComponentProps<typeof RadixDropdownMenuPrimitive.Separator>) {
    return (
        <RadixDropdownMenuPrimitive.Separator
            data-slot='dropdown-menu-separator'
            className={mergeCn(
                '-mx-1 my-1 h-px bg-[var(--slate-6)]',
                className,
            )}
            {...props}
        />
    );
}

const Dropdown = Object.assign(DropdownImpl, {
    Item,
    Separator: MenuSeparator,
});

export default Dropdown;
