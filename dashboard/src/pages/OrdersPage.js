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
              <OrderListHead />
              <TableBody>
                {orders.map((order, index) => {
                  return <OrderCard key={index} order={order} />;
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
