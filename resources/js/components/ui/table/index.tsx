export type { TextAlign } from './types';
import { Cell } from './cell';
import { TableHead } from './head';
import { HeaderCell } from './header-cell';
import { Row } from './row';
import { Table as TableImpl } from './table';

const Table = Object.assign(TableImpl, {
  Cell,
  Row,
  HeaderCell,
  Head: TableHead,
});

export default Table;
