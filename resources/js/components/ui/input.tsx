import { mergeCn } from '@/helpers/mergeClasses';
import { type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: Props) {
    return (
        <input
            className={mergeCn(
                'my-2.5 block h-9 w-full rounded-md border border-default bg-default px-4 text-sm text-default outline-none placeholder:text-quaternary',
                className,
            )}
            {...rest}
        />
    );
}
