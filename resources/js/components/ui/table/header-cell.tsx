import type { PropsWithChildren } from 'react';

import { mergeCn } from '@/helpers/mergeClasses';
import { type TextAlign } from './types';
import { convertAlignToClass } from './utils';

type HeaderCellProps = PropsWithChildren<{
    align?: TextAlign | 'char';
    size?: 'md' | 'sm';
    className?: string;
}>;

export const HeaderCell = ({
    children,
    className,
    align = 'left',
    size = 'md',
}: HeaderCellProps) => (
    <th
        className={mergeCn(
            'text-2xs border-r border-secondary px-4 py-2.5 font-medium text-secondary',
            convertAlignToClass(align),
            size === 'sm' && 'text-3xs py-2',
            '[&_code]:text-3xs [&_code]:text-secondary',
            'last:border-r-0',
            className,
        )}
    >
        {children}
    </th>
);
