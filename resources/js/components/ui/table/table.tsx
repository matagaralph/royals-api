import type { PropsWithChildren } from 'react';

import { mergeCn } from '@/helpers/mergeClasses';
import { TableHeaders } from './headers';
import { type TextAlign } from './types';

type TableProps = PropsWithChildren<{
    headers?: string[];
    headersAlign?: TextAlign[];
    className?: string;
    containerClassName?: string;
}>;

export const Table = ({
    children,
    headers = [],
    headersAlign,
    className,
    containerClassName,
}: TableProps) => (
    <div
        className={mergeCn(
            'table-wrapper mb-4 overflow-x-auto overflow-y-hidden rounded-md border border-default shadow-xs',
            containerClassName,
        )}
    >
        <table
            className={mergeCn(
                'w-full rounded-none border-0 text-xs text-default',
                '[&_p]:text-xs',
                '[&_li]:text-xs',
                '[&_span]:text-xs',
                '[&_code_span]:text-inherit',
                '[&_strong]:text-xs',
                '[&_blockquote_div]:text-xs',
                '[&_blockquote_code]:px-1 [&_blockquote_code]:py-0',
                className,
            )}
        >
            {headers.length > 0 ? (
                <>
                    <TableHeaders
                        headers={headers}
                        headersAlign={headersAlign}
                    />
                    <tbody>{children}</tbody>
                </>
            ) : (
                children
            )}
        </table>
    </div>
);
