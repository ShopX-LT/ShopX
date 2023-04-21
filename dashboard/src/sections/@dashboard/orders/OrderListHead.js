import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

const columnHeader = [
  { id: 'icon', label: '', align: 'left', width: 100 },
  { id: 'date', label: 'Date', align: 'left' },
  { id: 'customer', label: 'Customer', align: 'left' },
  { id: 'total', label: 'Total', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
];
const OrderListHead = () => {
  return (
    <TableHead>
      <TableRow>
        {columnHeader.map((column) => {
          return (
            <TableCell key={column.id} align={column.align} sx={{ width: column.width }}>
              {column.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default OrderListHead;
