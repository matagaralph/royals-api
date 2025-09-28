import { mergeCn } from '../../helpers/mergeClasses';
import type { PropsWithChildren } from 'react';

import { type TextAlign } from './types';
import { convertAlignToClass } from './utils';

type CellProps = PropsWithChildren<{
  fitContent?: boolean;
  align?: TextAlign | 'char';
  colSpan?: number;
  className?: string;
}>;

export const Cell = ({
  children,
  colSpan,
  className,
  fitContent = false,
  align = 'left',
}: CellProps) => (
  <td
    className={mergeCn(
      'border-r border-secondary px-4 py-2',
      convertAlignToClass(align),
      fitContent && 'w-fit',
      'last:border-r-0',
      className
    )}
    colSpan={colSpan}
  >
    {children}
  </td>
);
