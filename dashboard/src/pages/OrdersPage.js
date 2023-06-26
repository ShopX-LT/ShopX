import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { murmur3 } from 'murmurhash-js';

import { Container, Card, Stack, Table, TableBody, TableContainer, Typography } from '@mui/material';

import { getOrders, updateOrder } from '../services/OrderService';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
// components
import { OrderCard, OrderListHead } from '../sections/@dashboard/orders';

function hashArrayOfOrders(arr) {
  const concatenatedString = arr.reduce((acc, obj) => acc + JSON.stringify(obj), '');

  return murmur3(concatenatedString).toString();
}

const OrdersPage = () => {
  const axiosPrivate = useAxiosPrivate();

  const [orders, setOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [arrayHash, setArrayHash] = useState('');
  const [updatedOrder, setUpdatedOrder] = useState();
  const [firstRender, setFirstRender] = useState(true);

  const checkForUpdate = () => {
    const newArrayHash = hashArrayOfOrders(orders);
    if (newArrayHash === arrayHash) {
      return;
    }
    setArrayHash(newArrayHash);
  };

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

  useEffect(() => {
    if (!firstRender) {
      const updateStatus = async () => {
        const response = await updateOrder(axiosPrivate, updatedOrder.id, updatedOrder);
        console.log(updatedOrder);
      };
      updateStatus();
    }
    setFirstRender(false);
  }, [arrayHash]);

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
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      updateFunction={checkForUpdate}
                      setUpdatedOrder={setUpdatedOrder}
                    />
                  );
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
