import { type PropsWithChildren } from 'react';

type TableHeadProps = PropsWithChildren<object>;

export const TableHead = ({ children }: TableHeadProps) => (
  <thead className='border-b border-b-default bg-[#f6f8fa] dark:bg-subtle'>
    {children}
  </thead>
);
