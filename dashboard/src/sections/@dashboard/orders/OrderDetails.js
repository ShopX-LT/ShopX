import React from 'react';
import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const header = ['Item', 'Quantity', 'Price', 'Discount', 'Paid'];
const orderDetails = ({ open, items, subTotal, deliveryFee }) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6">Details</Typography>
            <Table size="small" aria-label="Items">
              <TableHead>
                <TableRow>
                  <TableCell />
                  {header.map((title) => {
                    return <TableCell key={title}>{title}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => {
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.discount}</TableCell>
                      <TableCell>{item.paid * (1 - item.discount / 100) * item.quantity}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell rowSpan={2} />
                  <TableCell colSpan={1}>Subtotal</TableCell>
                  <TableCell align="right">{subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Delivery</TableCell>
                  <TableCell align="right">{deliveryFee}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default orderDetails;
