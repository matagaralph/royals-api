import type { PropsWithChildren } from 'react';

import { type TextAlign } from './types';
import { convertAlignToClass } from './utils';
import { mergeCn } from '../../helpers/mergeClasses';

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
      'border-r border-secondary px-4 py-2.5 text-2xs font-medium text-secondary',
      convertAlignToClass(align),
      size === 'sm' && 'py-2 text-3xs',
      '[&_code]:text-3xs [&_code]:text-secondary',
      'last:border-r-0',
      className
    )}
  >
    {children}
  </th>
);
