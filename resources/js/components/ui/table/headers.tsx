import { HeaderCell } from './header-cell';
import { Row } from './row';
import { TableHead } from './head';
import { type TextAlign } from './types';

type TableHeadersProps = {
  headers: string[];
  headersAlign?: TextAlign[];
};

export const TableHeaders = ({
  headers,
  headersAlign = [],
}: TableHeadersProps) => (
  <TableHead>
    <Row>
      {headers.map((header, i) => (
        <HeaderCell key={`table-header-${i}`} align={headersAlign[i]}>
          {header}
        </HeaderCell>
      ))}
    </Row>
  </TableHead>
);
