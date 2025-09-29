import { mergeCn } from '@/helpers/mergeClasses';

export function DescriptionList({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'dl'>) {
    return (
        <dl
            {...props}
            className={mergeCn(
                className,
                'grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,--spacing(80))_auto] sm:text-sm/6',
            )}
        />
    );
}

export function DescriptionTerm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'dt'>) {
    return (
        <dt
            {...props}
            className={mergeCn(
                className,
                'col-start-1 border-t border-secondary pt-3 text-secondary first:border-none sm:border-t sm:border-secondary sm:py-3',
            )}
        />
    );
}

export function DescriptionDetails({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'dd'>) {
    return (
        <dd
            {...props}
            className={mergeCn(
                className,
                'pt-1 pb-3 text-default sm:border-t sm:border-secondary sm:py-3 sm:nth-2:border-none',
            )}
        />
    );
}
