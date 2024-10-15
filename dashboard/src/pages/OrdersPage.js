import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { murmur3 } from 'murmurhash-js';

import { Container, Card, Stack, Typography } from '@mui/material';

import { ordersError, updateOrders } from '../redux';
import SortableTable from '../components/sortableTable';

import { getOrders, updateOrder } from '../services/OrderService';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
// components
import { OrderCard } from '../sections/@dashboard/orders';

const TABLE_HEAD = [
  { id: 'icon', label: '', align: 'left', width: 100 },
  { id: 'dateOrdered', label: 'Date', align: 'left' },
  { id: 'orderedBy', label: 'Customer', align: 'left' },
  { id: 'total', label: 'Total', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
];

function hashArrayOfOrders(arr) {
  const concatenatedString = arr.reduce((acc, obj) => acc + JSON.stringify(obj), '');

  return murmur3(concatenatedString).toString();
}

const OrdersPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

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

  useEffect(() => {
    if (!firstRender) {
      const updateStatus = async () => {
        const response = updatedOrder?.id && (await updateOrder(axiosPrivate, toast, updatedOrder.id, updatedOrder));
      };
      updateStatus();
    }
    setFirstRender(false);
  }, [arrayHash]);

  useEffect(() => {
    // GET ORDERS
    const handleGetOrders = async () => {
      const ordersResponse = await getOrders(axiosPrivate);
      if (!ordersResponse) {
        dispatch(ordersError('Error getting orders'));
        return;
      }
      dispatch(updateOrders(ordersResponse));
    };
    handleGetOrders();
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
          <SortableTable
            headerArray={TABLE_HEAD}
            listItems={orders}
            bodyComponent={(order) => (
              <OrderCard
                key={order.id}
                order={order}
                updateFunction={checkForUpdate}
                setUpdatedOrder={setUpdatedOrder}
              />
            )}
          />
        </Card>
      </Container>
    </div>
  );
};

export default OrdersPage;
