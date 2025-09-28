'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { BsX } from 'react-icons/bs';
import { mergeCn } from '@/helpers/mergeClasses';
import { Button, type ButtonProps, type ButtonTheme } from './button';

export type DialogButtonProps = Omit<ButtonProps, 'content'> & {
  /**
   * The variant of Button to use
   */
  buttonTheme?: ButtonTheme;
  /**
   * The Button's inner text
   */
  content: React.ReactNode;
};

interface DialogContextValue {
  title: string;
  size: keyof typeof sizes;
  footerButtons?: DialogButtonProps[];
}
const DialogContext = React.createContext<DialogContextValue | undefined>(
  undefined
);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (context === undefined) {
    throw new Error(
      'Dialog components must be used within a Dialog component.'
    );
  }
  return context;
}

const sizes = {
  xs: 'sm:max-w-xs',
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
};

interface DialogProps
  extends React.ComponentProps<typeof DialogPrimitive.Root> {
  title: string;
  size?: keyof typeof sizes;
  footerButtons?: DialogButtonProps[];
}

function DialogImpl({
  title,
  size = 'lg',
  footerButtons,
  ...props
}: DialogProps) {
  return (
    <DialogContext.Provider value={{ title, size, footerButtons }}>
      <DialogPrimitive.Root data-slot='dialog' {...props} />
    </DialogContext.Provider>
  );
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='dialog-overlay'
      className={mergeCn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-overlay',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitive.Content>, 'title'> & {
  showCloseButton?: boolean;
}) {
  const { title, size, footerButtons } = useDialogContext();
  const hasFooter = footerButtons && footerButtons.length > 0;

  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <div className='flex items-center p-4 sm:p-0'>
        <DialogPrimitive.Content
          data-slot='dialog-content'
          className={mergeCn(
            'bg-default data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border border-default shadow-md duration-200 overflow-hidden',
            sizes[size],
            className
          )}
          {...props}
        >
          <div className='relative flex items-center justify-between border-b border-default h-[49px] bg-default'>
            <DialogTitle className='pl-4 text-default mb-1'>
              {title}
            </DialogTitle>
            {showCloseButton && (
              <DialogPrimitive.Close
                data-slot='dialog-close'
                className="data-[state=open]:bg-subtle data-[state=open]:text-icon-danger absolute top-1/2 right-4 -translate-y-1/2 rounded-xs opacity-70 transition-opacity hover:opacity-100 outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6"
              >
                <BsX />
                <span className='sr-only'>Close</span>
              </DialogPrimitive.Close>
            )}
          </div>
          <div className={mergeCn('px-4', hasFooter ? 'py-4' : 'pb-4')}>
            {children}
          </div>
          {hasFooter && (
            <DialogFooter>
              {footerButtons.map((buttonProps, index) => {
                const { content, buttonTheme, ...rest } = buttonProps;
                return (
                  <Button key={index} theme={buttonTheme} {...rest}>
                    {content}
                  </Button>
                );
              })}
            </DialogFooter>
          )}
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={mergeCn('text-base/6 font-semibold', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-footer'
      className={mergeCn(
        'flex items-center border-t border-t-default bg-subtle px-4 py-3 gap-3 justify-end',
        className
      )}
      {...props}
    />
  );
}

const Dialog = Object.assign(DialogImpl, {
  Close: DialogClose,
  Content: DialogContent,
  Trigger: DialogTrigger,
  Footer: DialogFooter,
});

export default Dialog;
