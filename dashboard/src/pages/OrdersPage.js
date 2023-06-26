import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Container, Card, Stack, Table, TableBody, TableContainer, Typography } from '@mui/material';

import { getOrders } from '../services/OrderService';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
// components
import { OrderCard, OrderListHead } from '../sections/@dashboard/orders';

const OrdersPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [orders, setOrders] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // click handler to the column header that triggers the sorting functionality. This handler should update the sortConfig state with the new sorting key and direction. If the same column header is clicked again, you can toggle the sorting direction.
  const handleSort = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const retreiveOrders = async () => {
    const response = await getOrders(axiosPrivate);
    if (!response) {
      setOrders([]);
      return;
    }
    setOrders(response);
  };
  useEffect(() => {
    retreiveOrders();
  }, []);
  return (
    <div>
      <Helmet>
        <title> Orders </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
        </Stack>
        <Card>
          <TableContainer sx={{ minWidth: 800 }} aria-label="Orders table">
            <Table>
              <OrderListHead handleSort={handleSort} />
              <TableBody>
                {sortedOrders.map((order) => {
                  return <OrderCard key={order.id} order={order} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </div>
  );
};

export default OrdersPage;
