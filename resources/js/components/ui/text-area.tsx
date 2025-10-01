import { mergeCn } from '@/helpers/mergeClasses';
import { useState, type InputHTMLAttributes } from 'react';

type Props = {
    characterLimit?: number;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
    characterLimit,
    className,
    onChange,
    ...rest
}: Props) {
    const [characterCount, setCharacterCount] = useState(0);

    return (
        <div className='relative'>
            <textarea
                onChange={(event) => {
                    setCharacterCount(event.target.value.length ?? 0);
                    if (onChange) {
                        onChange(event);
                    }
                }}
                className={mergeCn(
                    'my-2.5 block h-12 w-full rounded-sm border border-default bg-default p-4 text-sm leading-5 text-default shadow-xs placeholder:text-icon-tertiary',
                    className,
                )}
                {...rest}
            />
            {characterLimit && (
                <span
                    style={{
                        color:
                            characterCount > characterLimit
                                ? '#dc2626'
                                : '#6b7280',
                    }}
                    className='absolute right-3 bottom-1.5 z-10 font-mono text-xs'
                >
                    {characterLimit - characterCount}
                </span>
            )}
        </div>
    );
}
