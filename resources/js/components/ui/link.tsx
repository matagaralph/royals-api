import { mergeCn } from '@/helpers/mergeClasses';
import { Link as InertiaLink } from '@inertiajs/react';
import type { AnchorHTMLAttributes } from 'react';
import React from 'react';

export type LinkBaseProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    testID?: string;
    openInNewTab?: boolean;
    disabled?: boolean;
    skipNextLink?: boolean;
};

export const LinkBase = ({
    children,
    testID,
    href,
    openInNewTab,
    onClick,
    target,
    disabled,
    skipNextLink,
    rel,
    ref,
    ...rest
}: LinkBaseProps & { ref?: React.Ref<HTMLAnchorElement> }) => {
    if (disabled) {
        return (
            <a
                ref={ref}
                data-testid={testID}
                aria-disabled='true'
                role='link'
                tabIndex={-1}
                style={{ pointerEvents: 'none', opacity: 0.6 }}
                {...rest}
            >
                {children}
            </a>
        );
    }

    if (!href || href.startsWith('#')) {
        return (
            <a
                href={href}
                ref={ref}
                onClick={onClick}
                data-testid={testID}
                {...rest}
            >
                {children}
            </a>
        );
    }

    if (skipNextLink) {
        return (
            <a
                href={href}
                ref={ref}
                onClick={onClick}
                target={openInNewTab ? '_blank' : target}
                rel={openInNewTab ? 'noopener noreferrer' : rel}
                data-testid={testID}
                {...rest}
            >
                {children}
            </a>
        );
    }

    return (
        <InertiaLink
            href={href}
            ref={ref}
            // @ts-expect-error
            onClick={onClick}
            target={openInNewTab ? '_blank' : target}
            rel={openInNewTab ? 'noopener noreferrer' : rel}
            data-testid={testID}
            {...rest}
        >
            {children}
        </InertiaLink>
    );
};

export const Link = ({
    className,
    disabled,
    ref,
    ...rest
}: LinkBaseProps & { ref?: React.Ref<HTMLAnchorElement> }) => {
    return (
        <LinkBase
            className={mergeCn(
                'text-link transition-opacity',
                !disabled && 'hocus:opacity-80',
                className,
            )}
            ref={ref}
            disabled={disabled}
            {...rest}
        />
    );
};
